import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import useWindowScroll from '@react-hook/window-scroll';
import useScrollWidth from './utils/useScrollWidth';

/* Images */
import galleryData from './constants/galleryData';

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
                className="sticky-box"
                style={{
                    backgroundImage: `url(${galleryData[activeIndex].compareUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="overlay backdrop-blur-sm" // Add overlay class
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Adjust opacity here
                    }}
                ></div>
                <div id='progress-tracker' className='block text-white backdrop-blur-none'>
                    <motion.div className='p-1 rounded-full bg-[#81E5A5]' style={{ scaleX: scrollYProgress }} />
                    <span className='py-1 px-4 text-lg md:text-xl'>
                        <span className='text-[#81E5A5]'> {activeIndex + 1} </span> | {children.length}
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
                {galleryData.map((nextImage, index) => (
                    <div key={index} className='box w-[50rem] md:w-[65rem]'>
                        <div className='pt-20 flex justify-center
                            hover:scale-110 transition 200 hover:cursor-zoom-in' onClick={() => handleImageClick(nextImage.imageUrl)}>
                            <div>
                                <img className='w-[150px] h-1/2 object-cover object-center'
                                    src={nextImage.imageUrl} alt={'IMG'} />
                                <img className='w-[150px]  h-1/2 relative'
                                    src={nextImage.compareUrl} alt={'COMPAREIMG'} />
                            </div>
                            <div className='p-1 block text-white'>
                                {/* Title and pronunciation */}
                                <h2 className='px-3 py-1 text-base md:text-xl font-normal'>
                                    {nextImage.title}
                                </h2>
                                <h2 className='px-3 py-1 text-base md:text-xl font-normal'>
                                    ("{nextImage.pronounce}")
                                </h2>
                                {/* Description */}
                                <h3 className='px-3 text-[#81E5A5] text-base md:text-2xl'>  {nextImage.description} </h3>
                                {/* Shadow title */}
                                <span className='px-3 text-xl md:text-3xl opacity-10'> {nextImage.title} </span>
                            </div>

                        </div>
                    </div>
                ))}
            </ScrollCarousel>

            {/* Overlay */}
            {overlayImage && (
                <motion.div
                    className="z-20 fixed overflow-y-hidden top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center
                    hover:cursor-zoom-out"
                    onClick={() => setOverlayImage(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.img
                        className="z-10 max-h-[90vh] max-w-[90vw] "
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
