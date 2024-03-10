import React, { useEffect } from 'react';

import galleryBackground from '../assets/draw-background.jpg';
/* Gallery images */
import P1 from '../assets/pic-1.jpg';
import P2 from '../assets/pic-2.jpg';
import P3 from '../assets/pic-3.jpg';
import P4 from '../assets/pic-4.jpg';
import P5 from '../assets/pic-5.jpg';
import P6 from '../assets/pic-6.jpg';
import P7 from '../assets/pic-7.jpg';
import P8 from '../assets/pic-8.jpg';

/* Real-life comparison images */
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
        { title: 'iwobi.', imageUrl: P8, compareUrl: CP8 },
        { title: 'jozif.', imageUrl: P1, compareUrl: CP1 },
        { title: 'memphis.', imageUrl: P5, compareUrl: CP5 },
        { title: 'adut.', imageUrl: P2, compareUrl: CP2 },
        { title: 'dre.', imageUrl: P3, compareUrl: CP3 },
        { title: 'samuel.', imageUrl: P7, compareUrl: CP7 },
        { title: 'jabulani.', imageUrl: P4, compareUrl: CP4 },
        { title: 'grace.', imageUrl: P6, compareUrl: CP6 },
    ];

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
    }


    return (
        <div className='sticky-parent h-[500vh]'>
            <div className='sticky overflow-hidden h-screen top-0 bg-black'
                style={{
                    backgroundImage: `url(${galleryBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className='scroll-section absolute h-full w-[500vw] will-change-transform px-[5vw] py-0 top-0 bg-gray-300/30 backdrop-blur-[5px] '>
                    <div className='divs-container py-12 flex justify-items-stretch gap-x-[20px] md:gap-x-[40px]'>
                        {images.map((nextImage, index) => (
                            <div key={index}>
                                <div className='flex hover:scale-110 transition 200'>
                                    <img className='w-[300px] h-4/5 rounded-lg object-cover object-center'
                                        src={nextImage.imageUrl} alt={nextImage.title} />
                                    <img className='w-[200px] h-[260px] rounded-lg relative right-[3em] top-[19em]'
                                        src={nextImage.compareUrl} alt=''/>
                                </div>
                                <h2 className='py-6 text-xl md:text-3xl'>
                                    {nextImage.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Gallery;
