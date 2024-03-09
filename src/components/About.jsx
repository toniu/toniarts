import React from 'react';
import backgroundImage from '../assets/ta-background.png';
import aboutPics from '../assets/ta-homepics.png';

const About = () => {
   
    return (
        <div>
            {/* About Section */}
            <div className='sticky-parent h-auto'>
                <div className='sticky overflow-hidden h-screen top-0 about-section'
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <div className='scroll-section absolute h-full py-0 top-0 w-[100vw]'>
                        <div className='divs-container text-white flex gap-x-10 gap-y-0 md:gap-x-0 md:gap-y-10'>
                            <div id='section-a' className='bg-gray-900 backdrop-blur-md h-screen bg-opacity-40 flex justify-center items-center' style={{ width: '100vw' }}>
                                <p className='p-5 text-white w-[70%] text-center'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat laborum impedit soluta, incidunt ducimus officiis laudantium hic? Doloremque expedita beatae, maxime ab unde assumenda alias et quidem, quisquam deserunt rerum?
                                </p>
                            </div>
                            <div id='section-b' className='flex justify-center items-center' style={{ width: '100vw' }}>
                                <img src={aboutPics} className='h-[300px] w-[300px] hover:scale-110 transition 100' src={aboutPics} alt='about' />
                            </div>
                            <div id='section-c' className='bg-gray-900 backdrop-blur-md h-screen bg-opacity-40 flex justify-center items-center' style={{ width: '100vw' }}>
                                <p className='p-5 text-white w-[70%] text-center'>
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam, fugit ipsa perspiciatis quaerat blanditiis molestiae quis, atque voluptas repellendus voluptatum esse. Aliquid, quos. Deserunt aperiam excepturi in iure praesentium!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
