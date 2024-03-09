import React, { useEffect } from 'react';

import galleryBackground from '../assets/draw-background.jpg';
/* Gallery images */
import P1 from '../assets/pic-1.jpg';
import P2 from '../assets/pic-2.jpg';
import P3 from '../assets/pic-3.jpg';
import P4 from '../assets/pic-4.jpg';

const Gallery = () => {
    const images = [
        { title: '1', imageUrl: P1, compareUrl: '' },
        { title: '2', imageUrl: P2, compareUrl: '' },
        { title: '3', imageUrl: P3, compareUrl: '' },
        { title: '4', imageUrl: P4, compareUrl: '' },
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
                <div className='scroll-section absolute h-full w-[500vw] will-change-transform px-[5vw] py-0 top-0 bg-gray-300/30 backdrop-blur-md'>
                    <div className='divs-container py-12 flex justify-items-stretch gap-x-[20px] md:gap-x-[40px]'>
                        {images.map((nextImage, index) => (
                            <div key={index}>
                                <img className='w-[400px] h-4/5 object-cover object-center hover:scale-110 transition 200'
                                    src={nextImage.imageUrl} alt={nextImage.title} />
                                <h2>
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
