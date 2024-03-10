import React from 'react';
/* Import for picture */
import moi from '../assets/yute-artist.png'
import backgroundImage from '../assets/wood-background.jpg'

const Footer = () => {
    return (
        <section className='h-screen flex justify-center items-center relative bg-black bg-opacity-60 '>
            <div className='container  bg-opacity-40 flex flex-col justify-center items-center space-y-7'>
                <img className='w-[300px] h-[300px] object-cover rounded-lg hover:scale-110 cursor-pointer transition duration-100'
                     src={moi} alt='me' />
                <h3 className='py-2 text-white text-lg md:text-xl'>"a budding young artist in the nursery"</h3>
                <h1 className='py-2 text-6xl md:text-6xl text-white'>fin.</h1>
            </div>
            {/* Background Image */}
            <div className='absolute inset-0 z-[-1] bg-no-repeat bg-center bg-cover'
                 style={{ backgroundImage: `url(${backgroundImage})` }} />
        </section>
    );
};

export default Footer;
