import React, { useEffect, useState, useRef } from 'react';
import backgroundImage from '../assets/wood-background.jpg';
import aboutPics from '../assets/ta-homepics.png';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const elementRef = useRef();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculatePosition = (element) => {
    if (!element) return 0; // Return 0 if element is undefined
    const yPos = element.offsetTop - scrollY;
    const windowHeight = window.innerHeight;
    const position = yPos / windowHeight;
    return position;
  };

  return (
    <div className='sticky-parent h-auto'>
      <div
        className='sticky overflow-hidden h-screen top-0 about-section'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='scroll-section absolute h-full py-0 top-0'>
          <div className='divs-container text-white block gap-x-0 gap-y-12 md:gap-x-12 md:gap-y-0'>
            <div
              id='section-a'
              className='bg-black  h-screen pt-20 bg-opacity-60 block md:flex justify-center items-center'
            >
              <motion.p
                ref={(element) => {
                  ref(element);
                  elementRef.current = element;
                }}
                className='p-5 text-white text-base md:text-lg w-[70%] text-center mx-auto'
                initial='hidden'
                animate={{
                  opacity: 1,
                  y: calculatePosition(elementRef.current) * 100,
                }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat laborum impedit soluta, incidunt ducimus officiis
                laudantium hic? Doloremque expedita beatae, maxime ab unde
                assumenda alias et quidem, quisquam deserunt rerum?
              </motion.p>
              <motion.img
                ref={(element) => {
                  ref(element);
                  elementRef.current = element;
                }}
                src={aboutPics}
                className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] mx-auto'
                alt='about'
                initial='hidden'
                animate={{
                  opacity: 1,
                  y: calculatePosition(elementRef.current) * 100,
                }}
              />
              <motion.p
                ref={(element) => {
                  ref(element);
                  elementRef.current = element;
                }}
                className='p-5 text-white text-base md:text-lg w-[70%] text-center mx-auto'
                initial='hidden'
                animate={{
                  opacity: 1,
                  y: calculatePosition(elementRef.current) * 100,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur aliquam, fugit ipsa perspiciatis quaerat blanditiis
                molestiae quis, atque voluptas repellendus voluptatum esse.
                Aliquid, quos. Deserunt aperiam excepturi in iure praesentium!
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;