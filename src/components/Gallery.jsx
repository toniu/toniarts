import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import useWindowScroll from '@react-hook/window-scroll';
import useScrollWidth from './utils/useScrollWidth';

/* Images */
import galleryBackground from '../assets/draw-background.png';
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
    const refHeight = useRef(null);
    const refTransform = useRef(null);

    const { scrollWidth } = useScrollWidth(refTransform);
    const scrollY = useWindowScroll(45);

    const top = refHeight.current ? refHeight.current.offsetTop : 0;
    const width = refHeight.current ? refHeight.current.offsetWidth : 0;
    const elHeight = scrollWidth - (window.innerWidth - window.innerHeight) + width * 0.5;

    const interpTransform = (o, xy) => {
        const mouseMoveDepth = 40;
        const x = width - (top - o) - width;

        if (x < -window.innerHeight - width * 0.5) {
            return `translate3d(${window.innerHeight}px, 0, 0)`;
        }

        if (Math.abs(x) > elHeight) {
            return `translate3d(${elHeight}px, 0, 0)`;
        }

        return `translate3d(${-x + -xy[0] / mouseMoveDepth}px, ${-xy[1] / mouseMoveDepth}px, 0)`;
    };

    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        if (elHeight !== 0) {
            const progress = Math.abs(scrollY) / elHeight;
            const newIndex = Math.min(children.length, Math.max(1, Math.floor(progress * children.length)));
            setActiveIndex(newIndex - 1);
        }
    }, [scrollY, elHeight, children.length]);

    const { scrollYProgress } = useScroll();

    return (
        <div
            className="scroll-carousel"
            ref={refHeight}
            style={{ height: elHeight }}
        >
            <div
                className="sticky-box bg-white"
                style={{
                    backgroundImage: `url(${galleryBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div id='progress-tracker' className='block'>
                    <motion.div className='p-1 rounded-full bg-[#174135]' style={{ scaleX: scrollYProgress }} />
                    <span className='py-1 px-4 text-xl md:text-2xl'>
                        {activeIndex + 1}/{children.length}
                    </span>
                </div>
                <div
                    style={{ transform: interpTransform(scrollY, [0, 0]) }}
                    className="transform-box"
                    ref={refTransform}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}


const Gallery = () => {
    const images = [
        { title: 'iwobi.', pronounce: 'ih-woh-bee', description: 'a courageous heart', imageUrl: P8, compareUrl: CP8 },
        { title: 'jo-vaughn.', pronounce: 'jo-ahn', description: 'God is gracious', imageUrl: P1, compareUrl: CP1 },
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
        <div id='gallery'
        className='sticky-parent'>
            <ScrollCarousel>
                {images.map((nextImage, index) => (
                    <div key={index} className='box w-[50rem] md:w-[65rem]'>
                        <div className='pt-20 flex justify-center
                            hover:scale-110 transition 200 hover:cursor-zoom-in' onClick={() => handleImageClick(nextImage.imageUrl)}>
                            <img className='w-[190px] md:w-[220px] h-4/5 rounded-lg object-cover object-center'
                                src={nextImage.imageUrl} alt={'IMG'} />
                            <div className='p-1 block'>
                                {/* Title and pronunciation */}
                                <h2 className='px-3 py-3 text-lg md:text-4xl font-bold'>
                                    {nextImage.title} ("{nextImage.pronounce}")
                                </h2>
                                {/* Description */}
                                <h3 className='px-3 text-gray-800 text-lg md:text-2xl'>  {nextImage.description} </h3>
                                {/* Shadow title */}
                                <span className='px-3 text-3xl md:text-7xl opacity-10'> {nextImage.title} </span>
                            </div>
                            <img className='w-[130px] h-[160px] md:w-[140px] md:h-[180px] rounded-lg relative right-[16em] md:right-[12em] top-[17em] md:top-[19em]'
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
