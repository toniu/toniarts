import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTiktok, FaPinterest } from "react-icons/fa";
import moi from '../assets/yute-artist.png'
import backgroundImage from '../assets/prodigy-background-ta.jpg'

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.12 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

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

    return (
        <section id='footer'
        className='footer-section h-screen flex justify-center items-center relative bg-black bg-opacity-70 border-black'>

            {/* Footer content */}
            <motion.div
                className='container bg-opacity-40 flex flex-col justify-center items-center space-y-7 relative z-10 text-center px-6 py-16 w-screen'
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                <motion.img 
                    variants={itemVariants}
                    className='w-[190px] h-[190px] grayscale object-cover rounded-2xl hover:scale-105 select-none transition duration-150'
                    src={moi} 
                    alt='me'
                />
                <motion.p variants={itemVariants} className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#81E5A5]">Fin</motion.p>
                <motion.h2 variants={itemVariants} className="mt-4 text-xl md:text-2xl text-white">
                    A budding young artist in the nursery
                </motion.h2>
                <motion.p variants={itemVariants} className="mt-3 text-sm md:text-base text-gray-300">
                    Still learning, still becoming.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-6 mx-auto h-[2px] w-20 bg-[#81E5A5]" />
                {/* Social links */}
                <motion.ul variants={itemVariants} className='flex justify-center text-3xl md:text-5xl text-white'>
                    <li className='nav-item p-2'>
                        <a href="https://www.instagram.com/toniartsg" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16 hover:text-green-300 transition 150">
                            <FaInstagram />
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.tiktok.com/@toniartsg" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16 hover:text-green-300 transition 150">
                            <FaTiktok />
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.pinterest.co.uk/toniboards/drawingideas/" target="_blank" rel="noopener noreferrer"
                            className="mx-10 md:mx-16 hover:text-green-300 transition 150">
                            <FaPinterest/>
                        </a>
                    </li>
                </motion.ul>
                <motion.div variants={itemVariants} className='bottom text-white text-center py-2 text-sm md:text-lg'>
                    <span className='line mb-4'></span>
                    <p>2024 toni., inc. all rights reserved</p>
                </motion.div>
            </motion.div>
              {/* Background Image */}
            <div className='absolute inset-0 z-[-1] bg-no-repeat bg-center bg-cover'
                 style={{ backgroundImage: `url(${backgroundImage})` }} />
        </section>
    );
};

export default Footer;