import React from 'react';
import backgroundImage from '../assets/ta-background.png';
import homeImgs from '../assets/ta-homepics.png';

import { Link } from 'react-scroll';

const Hero = () => {
    return (
        <div className='hero relative h-screen'>
            <div className="md:flex"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Block A */}
                <div className="md:w-1/2 h-[50vh] md:h-screen bg-gray-900 bg-opacity-50 backdrop-blur-md md:order-1 md:overflow-auto">
                    {/* Content for Block A */}
                    Block A
                </div>

                {/* Block B */}
                <div className="md:w-1/2 h-[50vh] md:h-screen bg-red-200 bg-opacity-0 md:order-2 md:overflow-auto flex justify-center items-center">
                    {/* Content for Block B */}
                    <img className='w-[300px] h-[300px] md:w-[380px] md:h-[380px]' src={homeImgs} alt='' />
                </div>



            </div>



        </div>
    );
};

export default Hero;

