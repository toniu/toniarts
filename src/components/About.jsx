import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/toni-backgroundlgs.png';
import toni from '../assets/artist-moi.png'
import phones from '../assets/ta-about-phones.png'
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const [isASAVisible, setIsASAVisible] = useState(false);
  const [isASBVisible, setIsASBVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const aboutsectionA = document.querySelector('.about-section-a');
      const ASAPosition = aboutsectionA.getBoundingClientRect();

      const aboutsectionB = document.querySelector('.about-section-b');
      const ASBPosition = aboutsectionB.getBoundingClientRect();

      if (ASAPosition.top < window.innerHeight * 0.5) {
        setIsASAVisible(true);
      } else {
        setIsASAVisible(false);
      }

      if (ASBPosition.top < window.innerHeight * 0.25) {
        setIsASBVisible(true);
      } else {
        setIsASBVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isASAVisible) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [isASAVisible, controls]);

  useEffect(() => {
    if (isASBVisible) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [isASBVisible, controls]);

  return (

    <div id='about'
      className='sticky overflow-hidden h-[200vh]'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='scroll-section absolute h-full py-0 top-0'>
        <div className='divs-container text-white'>
          <div
            id='section-a what'
            className='about-section-a h-screen'
          >
            <div className='m-5 p-2 space-y-1'>
              <span className='text-lg md:text-2xl'> what? </span>
              <div className='flex space-x-1'>
                <div className='bg-[#81E5A5] h-1 w-6 md:w-10' />
                <div className='bg-white h-1 w-6 md:w-10' />
              </div>
            </div>
            <div className='block md:flex'>
              <div className='block m-5 text-base md:text-xl p-3'>
                <h3 className='p-2 m-2 text-white w-[500px] md:w-[600px]'> the <span className='text-[#81E5A5]'> toniarts. </span> visual gallery is a page that displays portrait drawings from the self-taught Nigerian artist, <span className='text-[#81E5A5]'> toni. </span> These drawings will be portraits which explore the beauty of people in the African and Caribbean mainland and diaspora. This artwork is inspired by a mixture of people, with some people coming from different walks of <span className='text-[#81E5A5]'> music, film, sports, fashion, family </span> and other forms of creativity and intelligence</h3>
                <h4 className='p-2 m-2 text-white w-[500px] md:w-[600px]'> I gotta <span className='text-[#81E5A5]'> re-ignite </span> my gifts it's been too long. <span className='text-[#81E5A5]'> <br />love to my peopledem. </span> </h4>
              </div>
              <motion.img id='phones' className='py-3 px-12 mx-auto w-auto h-[400px] md:h-[650px]' src={phones} alt='phones' animate={controls} />
            </div>
          </div>

          <div
            id="section-b who"
            className="about-section-b h-screen flex flex-col justify-between"
          >
            <div>
              <div className="m-5 p-2 space-y-1">
                <span className="text-lg md:text-2xl"> who? </span>
                <div className="flex space-x-1">
                  <div className="bg-[#81E5A5] h-1 w-6 md:w-10" />
                  <div className="bg-white h-1 w-6 md:w-10" />
                </div>
              </div>
              <div className="block m-5 text-base md:text-xl p-3">
                <h3 className="text-white">meet the artist.</h3>
                <h3 className="text-[#81E5A5]">nekabari ("nek-abari")</h3>
                <h3 className="text-white">"give honour to God"</h3>
                <br/>
                <h3> stop hiding your gifts and <br/> unwrap what God gave you.</h3>
              </div>
            </div>

            {/* Image placed at the bottom */}
            <motion.img
              id="me"
              className="w-[400px] h-[400px] md:h-[600px] md:w-[600px] self-center" // optional: to center the image horizontally
              src={toni}
              alt="me"
              animate={controls}
            />
          </div>


        </div>
      </div>
    </div>

  );
};

export default About;