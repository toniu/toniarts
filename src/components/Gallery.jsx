import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
    const elHeight = Math.max(0, scrollWidth - (window.innerWidth - window.innerHeight) + width * 0.5);

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
        if (elHeight > 0) {
            const scrollDistance = Math.min(
                elHeight,
                Math.max(0, scrollY - top)
            );
            const segment = elHeight / Math.max(1, children.length);
            const lead = segment * 0.35;
            const indexFloat = (scrollDistance + lead) / segment;
            const maxIndex = Math.max(0, children.length - 1);
            const newIndex = Math.min(maxIndex, Math.max(0, Math.floor(indexFloat)));
            setActiveIndex(newIndex);
        }
    }, [scrollY, elHeight, children.length, top]);

    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

    return (
        <div
            className="scroll-carousel"
            ref={refHeight}
            style={{ height: elHeight }}
        >
            {/* Sticky background + gallery track */}
            <div className="sticky-box">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="absolute inset-0"
                        style={{
                            y: bgY,
                            scale: 1.03,
                            backgroundImage: `url(${galleryData[activeIndex].compareUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.33, ease: 'easeOut' }}
                    />
                </AnimatePresence>
                {/* Dark overlay for readability */}
                {/* Dark overlay + vignette */}
                <div
                    className="overlay backdrop-blur-sm" // Add overlay class
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}
                />
                <div className="gallery-vignette" />

                {/* Progress indicator */}
                <div className='gallery-progress'>
                    <div className='gallery-progress__track'>
                        <motion.div className='gallery-progress__fill' style={{ scaleX: scrollYProgress }} />
                    </div>
                    <span className='gallery-progress__label'>
                        <span className='text-[#81E5A5]'> {activeIndex + 1} </span> / {children.length}
                    </span>
                </div>
                {/* Horizontal track */}
                <motion.div
                    style={{ transform: interpTransform(scrollY, [0, 0]) }}
                    className="transform-box"
                    ref={refTransform}
                >
                    {children}
                </motion.div>
            </div>
        </div>

    );
}


const Gallery = () => {

    const { scrollYProgress: galleryScroll } = useScroll();
    const contentY = useTransform(galleryScroll, [0, 1], [6, -6]);

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
            className='gallery-section sticky-parent'>
            {/* Gallery items */}
            <ScrollCarousel>
                {galleryData.map((nextImage, index) => (
                    <div key={index} className='box w-[54rem] md:w-[70rem] flex items-center justify-center'>
                        <motion.div
                            style={{ y: contentY }}
                            className='flex items-center justify-center hover:cursor-zoom-in'
                            onClick={() => handleImageClick(nextImage.imageUrl)}
                        >
                            <div className="drawing-with-comparison gallery-card__media">
                                <img className='w-[170px] md:w-[200px] h-1/2 object-cover object-center rounded-t-xl'
                                    src={nextImage.imageUrl} alt={'IMG'} />
                                <img className='w-[170px] md:w-[200px] h-1/2 relative rounded-b-xl'
                                    src={nextImage.compareUrl} alt={'COMPAREIMG'} />
                            </div>
                            <div className='gallery-card__meta p-5 md:p-6 block text-white'>
                                {/* Title and pronunciation */}
                                <h2 className='px-3 py-1 text-base md:text-xl font-bold'>
                                    {nextImage.title}
                                </h2>
                                <h2 className='px-3 py-1 text-sm md:text-base font-light'>
                                    ("{nextImage.pronounce}")
                                </h2>
                                {/* Description */}
                                <h3 className='px-3 text-[#81E5A5] text-base md:text-2xl'>  {nextImage.description} </h3>
                                {/* Shadow title */}
                                <span className='px-3 text-xl md:text-3xl opacity-10 font-bold'> {nextImage.title} </span>
                            </div>

                        </motion.div>
                    </div>
                ))}
            </ScrollCarousel>

            {/* Lightbox overlay */}
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
