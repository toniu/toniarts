import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaInstagram, FaTiktok, FaPinterest } from "react-icons/fa";
import moi from '../assets/yute-artist.png'
import backgroundImage from '../assets/prodigy-background-ta.jpg'

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.footer-section');
            const footerPosition = footer.getBoundingClientRect();

            if (footerPosition.top < window.innerHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            controls.start({ opacity: 1, y: 0 });
        } else {
            controls.start({ opacity: 0, y: 50 });
        }
    }, [isVisible, controls]);

    return (
        <section id='footer'
        className='h-screen flex justify-center items-center relative bg-black bg-opacity-50 border-black footer-section'>
            <div className='container bg-opacity-40 flex flex-col justify-center items-center space-y-7'>
                <motion.img 
                    className='w-[190px] h-[190px] grayscale object-cover rounded-lg hover:scale-110 select-none transition duration-100'
                    src={moi} 
                    alt='me'
                    animate={controls}
                />
                <h3 className='py-2 text-white text-sm md:text-lg'>"a budding young artist in the nursery"</h3>
                <h1 className='py-2 text-3xl md:text-5xl text-green-300'>fin.</h1>
                <ul className='flex justify-center text-3xl md:text-5xl text-white'>
                    <li className='nav-item p-2'>
                        <a href="https://www.instagram.com/toniartsg" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16
                            hover:text-green-300 transition 100">
                            <FaInstagram />
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.tiktok.com/@toniartsg" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16
                            hover:text-green-300 transition 100">
                            <FaTiktok />
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.pinterest.co.uk/toniboards/drawingideas/" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16
                            hover:text-green-300 transition 100">
                            <FaPinterest/>
                        </a>
                    </li>
                </ul>
                <div className='bottom text-white text-center py-2 text-sm md:text-lg'>
                    <span className='line mb-4'></span>
                    <p>2024 toni., inc. all rights reserved</p>
                </div>
            </div>
            {/* Background Image */}
            <div className='absolute inset-0 z-[-1] bg-no-repeat bg-center bg-cover'
                 style={{ backgroundImage: `url(${backgroundImage})` }} />
        </section>
    );
};

export default Footer;