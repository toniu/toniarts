import React, { useState, useEffect } from 'react';
//import ScrollDown from './ScrollDown.jsx';
import bgVideo from '../assets/intro-video.mp4';

const Intro = () => {
    const [blurOpacity, setBlurOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxOpacity = 0.9; // Maximum opacity for the backdrop blur
            const minOpacity = 0.2; // Minimum opacity for the backdrop blur

            // Calculate opacity based on scroll position
            const opacity = 1 - (scrollY / 100); // Adjust the division factor as needed
            const clampedOpacity = Math.max(minOpacity, Math.min(opacity, maxOpacity));

            // Update state with the new opacity
            setBlurOpacity(clampedOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className='h-screen flex justify-center items-center relative overflow-hidden'>
            {/* Background Video with backdrop blur */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <video className= {`absolute top-0 left-0 w-full h-full object-cover filter backdrop-blur-md bg-gray-900/[${blurOpacity}]`}
                    autoPlay loop muted>
                    <source src={bgVideo} type="video/mp4" />
                </video>
            </div>
            
            {/* Content */}
            <div className='relative container z-10 text-center'>
                <h1 className='text-6xl md:text-8xl text-[#362218] font-bold'> toniarts. </h1>
                <h3 className='text-xl md:text-2xl text-[#174135] font-bold'> a visual gallery of my drawings </h3>
            </div>
        </section>
    );
};

export default Intro;
