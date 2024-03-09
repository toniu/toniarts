import React from 'react';
/* Import for picture */
import moi from '../assets/yute-artist.png'
import backgroundImage from '../assets/ta-background.png'

const Footer = () => {
    return (
        <section className='h-screen flex justify-center items-center'
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='container flex flex-col justify-center items-center space-y-3'>
                <img className='py-3 w-[300px] h-[300px] text-center rounded-lg
                hover:scale-110 cursor-pointer transition 100'
                src={moi} alt='me'/>
                <h3 className='py-2 text-white text-xl'> "a budding young artist in the nursery" </h3>
                <h1 className='py-2 text-6xl md:text-6xl text-white'> fin. </h1>
            </div>
        </section>
    );
};

export default Footer;
