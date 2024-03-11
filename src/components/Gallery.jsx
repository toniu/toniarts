import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

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

const Gallery = () => {
    const images = [
        { title: 'iwobi.', pronounce: 'ih-woh-bee', imageUrl: P8, compareUrl: CP8 },
        { title: 'jozif.', pronounce: 'jo-zeef', imageUrl: P1, compareUrl: CP1 },
        { title: 'memphis.', pronounce: 'mɛm-fɪs', imageUrl: P5, compareUrl: CP5 },
        { title: 'adut.', pronounce: 'ə-duut', imageUrl: P2, compareUrl: CP2 },
        { title: 'dre.', pronounce: 'dray', imageUrl: P3, compareUrl: CP3 },
        { title: 'samuel.', pronounce: 'sah-mu-ell', imageUrl: P7, compareUrl: CP7 },
        { title: 'jabu.', pronounce: 'jah-bu', imageUrl: P4, compareUrl: CP4 },
        { title: 'grace.', pronounce: 'ɡreɪs',imageUrl: P6, compareUrl: CP6 },
    ];

    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const stickySections = document.querySelectorAll('.sticky');
            for (let i = 0; i < stickySections.length; i++) {
                transform(stickySections[i]);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function transform(section) {
        const offsetTop = section.parentElement.offsetTop;
        const scrollSection = section.querySelector('.scroll-section');

        const stickyHeight = section.clientHeight;
        const divsContainer = section.querySelector('.divs-container');
        const divs = divsContainer.children;

        // Calculate the total width of all divs including spacing
        let totalWidth = 0;
        for (let i = 0; i < divs.length; i++) {
            totalWidth += divs[i].offsetWidth;
        }
        const totalSpacing = (divs.length - 1) * 20; // Assuming a spacing of 20px between divs
        const scrollableWidth = totalWidth + totalSpacing - window.innerWidth;

        // Adjust the sensitivity factor based on viewport width
        const sensitivity = window.innerWidth > 768 ? 0.3 : 0.6;

        let percentage = ((window.scrollY - offsetTop) / stickyHeight) * 100 * sensitivity;
        percentage = percentage < 0 ? 0 : percentage > 100 ? 100 : percentage;

        scrollSection.style.transform = `translateX(${-(percentage * scrollableWidth / 100)}px)`;
        setScrollPosition(percentage);

        for (let i = 0; i < divs.length; i++) {
            const divOffset = divs[i].offsetTop - offsetTop;
            if (divOffset <= window.innerHeight / 2 && divOffset + divs[i].offsetHeight >= window.innerHeight / 2) {
                setActiveIndex(i);
                break;
            }
        }
    }

    return (
        <div className='sticky-parent h-[500vh]'>
            <div className='sticky overflow-hidden h-screen top-0 bg-white'>
                <div className="background" style={{
                    backgroundImage: `url(${galleryBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

                    position: 'absolute',
                    opacity: 0.33,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                }} />
                <div className='scroll-section absolute h-full will-change-transform px-[5vw] py-0 top-0 '>
                    <div className='divs-container py-20 flex gap-x-[20px] md:gap-x-[40px]'
                        style={{ width: `${(images.length) * 100}%` }}>
                        {images.map((nextImage, index) => (
                            <div key={index} className='w-full '>
                                <div className='p-5 flex justify-center hover:scale-110 transition 200'>
                                    <img className='w-[280px] h-4/5 rounded-lg object-cover object-center'
                                        src={nextImage.imageUrl} alt={nextImage.title} />
                                    <div className='p-1 block'>
                                        <h2 className='px-3 py-6 text-3xl md:text-4xl'>
                                            {nextImage.title}
                                        </h2>
                                        <h3 className='px-3 text-2xl md:text-3xl'>  "{nextImage.pronounce}" </h3>
                                        <span className='px-3 text-6xl md:text-7xl opacity-10'> {nextImage.title} </span>
                                    </div>
                                    <img className='w-[180px] h-[240px] rounded-lg relative right-[10em] top-[19em]'
                                        src={nextImage.compareUrl} alt='' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Framer Motion Progress Bar */}
                <motion.div className="progress-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: scrollPosition / 100 }}
                    style={{
                        height: 10,
                        backgroundColor: '#174135',
                        transformOrigin: 'left',
                    }}
                />
                {/* Display active index and total count */}
                <div className="absolute top-0 right-0 p-6 text-black font-bold text-xl">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

        </div>
    );
};

export default Gallery;
