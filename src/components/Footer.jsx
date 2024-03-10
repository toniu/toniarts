import React from 'react';

import { FaInstagram, FaPinterest } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

/* Import for picture */
import moi from '../assets/yute-artist.png'
import backgroundImage from '../assets/wood-background.jpg'

const Footer = () => {
    return (
        <section className='h-screen flex justify-center items-center relative bg-black bg-opacity-60 '>
            <div className='container  bg-opacity-40 flex flex-col justify-center items-center space-y-7'>
                <img className='w-[250px] h-[250px] object-cover rounded-lg hover:scale-110 cursor-pointer transition duration-100'
                     src={moi} alt='me' />
                <h3 className='py-2 text-white text-lg md:text-xl'>"a budding young artist in the nursery"</h3>
                <h1 className='py-2 text-6xl md:text-6xl text-white'>fin.</h1>
                <ul className='flex justify-center text-3xl text-white'>
                    <li className='nav-item p-2'>
                        <a href="https://www.instagram.com/toninekatu" target="_blank" rel="noopener noreferrer"
                            className="mx-8
                            hover:text-green-200 transition 100">
                            <FaInstagram />
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.threads.net/toninekatu" target="_blank" rel="noopener noreferrer"
                            className="mx-8
                            hover:text-green-200 transition 100">
                            <FaThreads/>
                        </a>
                    </li>
                    <li className='nav-item p-2'>
                        <a href="https://www.pinterest.co.uk/toniboards/drawingideas/" target="_blank" rel="noopener noreferrer"
                            className="mx-8
                            hover:text-green-200 transition 100">
                            <FaPinterest/>
                        </a>
                    </li>
                </ul>
                <div className='bottom text-white text-center py-2'>
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
