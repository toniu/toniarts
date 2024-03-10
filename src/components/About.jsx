import React, { useEffect, useRef } from 'react';
import backgroundImage from '../assets/wood-background.jpg';
import aboutPics from '../assets/ta-homepics.png';

const About = () => {
    const aboutPicsRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollProgress = window.scrollY / (document.body.offsetHeight - window.innerHeight);
            const isMobile = window.innerWidth <= 768;

            let translateX = 0;
            let translateY = 0;

            if (isMobile) {
                const maxTranslateX = window.innerWidth - aboutPicsRef.current.offsetWidth;
                translateX = scrollProgress * maxTranslateX;
            } else {
                const maxTranslateY = window.innerHeight - aboutPicsRef.current.offsetHeight;
                translateY = scrollProgress * maxTranslateY;
            }

            aboutPicsRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (

            <div className='sticky-parent h-auto'>
                <div className='sticky overflow-hidden h-screen top-0 about-section'
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <div className='scroll-section absolute h-full py-0 top-0'>
                        <div className='divs-container text-white block gap-x-0 gap-y-12 md:gap-x-12 md:gap-y-0'>
                            <div id='section-a' className='bg-black  h-screen pt-20 bg-opacity-60 block md:flex justify-center items-center'>
                                <p className='p-5 text-white text-base md:text-lg w-[70%] text-center mx-auto'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat laborum impedit soluta, incidunt ducimus officiis laudantium hic? Doloremque expedita beatae, maxime ab unde assumenda alias et quidem, quisquam deserunt rerum?
                                </p>
                                <img ref={aboutPicsRef} src={aboutPics} className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] mx-auto hover:scale-110 transition 100' alt='about' />
                                <p className='p-5 text-white text-base md:text-lg w-[70%] text-center mx-auto'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam, fugit ipsa perspiciatis quaerat blanditiis molestiae quis, atque voluptas repellendus voluptatum esse. Aliquid, quos. Deserunt aperiam excepturi in iure praesentium!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default About;
