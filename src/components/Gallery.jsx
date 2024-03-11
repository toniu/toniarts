import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useSpring, animated as a, to } from 'react-spring'
import useWindowScroll from '@react-hook/window-scroll'
import useScrollWidth from './utils/useScrollWidth'


import galleryBackground from '../assets/draw-background.jpg';
import P1 from '../assets/pic-1.jpg';
import P2 from '../assets/pic-2.jpg';
import P3 from '../assets/pic-3.jpg';
import P4 from '../assets/pic-4.jpg';
import P5 from '../assets/pic-5.jpg';
import P6 from '../assets/pic-6.jpg';
import P7 from '../assets/pic-7.jpg';
import P8 from '../assets/pic-8.jpg';

import CP1 from '../assets/cp-1.jpg';
import CP2 from '../assets/cp-2.jpg';
import CP3 from '../assets/cp-3.jpg';
import CP4 from '../assets/cp-4.jpg';
import CP5 from '../assets/cp-5.jpg';
import CP6 from '../assets/cp-6.jpg';
import CP7 from '../assets/cp-7.jpg';
import CP8 from '../assets/cp-8.jpg';

function ScrollCarousel({ children }) {
    const refHeight = useRef(null)
    const refTransform = useRef(null)

    const { scrollWidth } = useScrollWidth(refTransform)

    // the argument is the fps that the hook uses,
    // since react spring interpolates values we can safely reduce this below 60
    const scrollY = useWindowScroll(45)
    const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }))

    useEffect(() => {
        set({ st: scrollY })
    }, [scrollY, set])

    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [])

    const top = refHeight.current ? refHeight.current.offsetTop : 0
    const width = refHeight.current ? refHeight.current.offsetWidth : 0

    // we want to set the scrolling element *height* to the value of the *width* of the horizontal content
    // plus some other calculations to convert it from a width to a height value
    const elHeight = scrollWidth - (window.innerWidth - window.innerHeight) + width * 0.5 // scroll away when final viewport width is 0.5 done

    const interpTransform = to([st, xy], (o, xy) => {
        const mouseMoveDepth = 40 // not necessary, but nice to have
        const x = width - (top - o) - width

        // (width * 0.5) so that it starts moving just slightly before it comes into view
        if (x < -window.innerHeight - width * 0.5) {
            // element is not yet in view, we're currently above it. so don't animate the translate value
            return `translate3d(${window.innerHeight}px, 0, 0)`
        }

        if (Math.abs(x) > elHeight) {
            // element is not in view, currently below it.
            return `translate3d(${elHeight}px, 0, 0)`
        }

        // else animate as usual
        return `translate3d(${-x + -xy[0] / mouseMoveDepth}px, ${-xy[1] / mouseMoveDepth}px, 0)`
    })

    return (
        <div onMouseMove={onMouseMove}
        className="scroll-carousel"
        ref={refHeight}
        style={{
            height: elHeight,
            }}>
            <div className="sticky-box bg-white"
            style={{
                backgroundImage: `url(${galleryBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '--tw-bg-opacity': 0.5
                }}>
                <div>
                    {/* Framer Motion Progress Bar */}
                    <motion.div className="progress-bar"
                    />
                    {/* Display active index and total count */}
                    <div id=''>
                        1/4
                    </div>
                </div>
                <a.div style={{ transform: interpTransform }} className="transform-box" ref={refTransform}>
                    {children}
                </a.div>
            </div>
        </div>
    )
}

const Gallery = () => {
    const images = [
        { title: 'iwobi.', pronounce: 'ih-woh-bee', description: 'a courageous heart', imageUrl: P8, compareUrl: CP8 },
        { title: 'jo-vaughn.', pronounce: 'jo-anh', description: 'God is gracious', imageUrl: P1, compareUrl: CP1 },
        { title: 'memphis.', pronounce: 'mɛm-fɪs', description: 'enduring beauty', imageUrl: P5, compareUrl: CP5 },
        { title: 'adut.', pronounce: 'ə-duut', description: 'complete and powerful', imageUrl: P2, compareUrl: CP2 },
        { title: 'dré.', pronounce: 'dreh', description: 'warrior', imageUrl: P3, compareUrl: CP3 },
        { title: 'samuel.', pronounce: 'sah-mu-ell', description: 'God has heard', imageUrl: P7, compareUrl: CP7 },
        { title: 'jabu.', pronounce: 'jah-bu', description: 'rejoice', imageUrl: P4, compareUrl: CP4 },
        { title: 'grace.', pronounce: 'ɡreɪs', description: 'favour and blessing', imageUrl: P6, compareUrl: CP6 },
    ];

    const [overlayImage, setOverlayImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        if (overlayImage === imageUrl) {
            setOverlayImage(null); // Close overlay if clicked image is already open
        } else {
            setOverlayImage(imageUrl); // Open overlay with clicked image
        }
    };

    return (
        <div className='sticky-parent'>
            
                <ScrollCarousel className='p-1 '>
                    {images.map((nextImage, index) => (
                        <div key={index} className='box bg-red-400/0.1'>
                            <div className='pt-20 flex bg-yellow-200/0.1 justify-center
                            hover:scale-110 transition 200 hover:cursor-zoom-in' onClick={() => handleImageClick(nextImage.imageUrl)}>
                                <img className='w-[280px] h-4/5 rounded-lg object-cover object-center'
                                    src={nextImage.imageUrl} alt={nextImage.title} />
                                <div className='p-1 block'>
                                    <h2 className='px-3 py-6 text-3xl md:text-4xl'>
                                        {nextImage.title} ("{nextImage.pronounce}")
                                    </h2>
                                    <h3 className='px-3 text-gray-800 text-xl md:text-2xl'>  {nextImage.description} </h3>
                                    <span className='px-3 text-6xl md:text-7xl opacity-10'> {nextImage.title} </span>
                                </div>
                                <img className='w-[180px] h-[240px] rounded-lg relative right-[12em] top-[19em]'
                                    src={nextImage.compareUrl} alt='' />
                            </div>
                        </div>
                    ))}

                </ScrollCarousel>
                
            {/* Overlay */}
            {overlayImage && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center
                    hover:cursor-zoom-out"
                    onClick={() => setOverlayImage(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.img
                        className="max-h-[90vh] max-w-[90vw] "
                        src={overlayImage}
                        alt="Overlay Image"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default Gallery;
