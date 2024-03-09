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
                    <div className='scroll-section absolute h-full py-0 top-0 '>
                        <div className='divs-container text-white block gap-x-0 gap-y-10 md:gap-x-10 md:gap-y-0'>
                            <div id='section-a' className='bg-gray-900 backdrop-blur-md h-screen bg-opacity-40 block md:flex justify-center items-center' >
                                <p className='p-5 text-white w-[70%] text-center mx-auto'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat laborum impedit soluta, incidunt ducimus officiis laudantium hic? Doloremque expedita beatae, maxime ab unde assumenda alias et quidem, quisquam deserunt rerum?
                                </p>
                                <img src={aboutPics} className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] mx-auto hover:scale-110 transition 100' alt='about' />
                                <p className='p-5 text-white w-[70%] text-center mx-auto'>
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
