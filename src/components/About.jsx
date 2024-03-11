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
                className='p-3 text-white text-sm md:text-lg w-[70%] text-center mx-auto'
                initial='hidden'
                animate={{
                  opacity: 1,
                  y: calculatePosition(elementRef.current) * 100,
                }}
              >
                The <span className='text-green-300'> toniarts </span>
                gallery presents a visual gallery of portraits drawn by Neka Toni-Uebari.
                The portraits mainly explore the depth and intricate beauty of the black Diaspora.
                The artist wanted to capture every detail from the shading of melanin to the coils of hair.
                The people in these drawings are a mixture of people coming from different walks of family, fashion, sports,
                music and other forms of creativity and intelligence.
                These drawings are a mirror of the people I am proud of.
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
                className='p-3 text-white text-sm md:text-lg w-[70%] text-center mx-auto'
                initial='hidden'
                animate={{
                  opacity: 1,
                  y: calculatePosition(elementRef.current) * 100,
                }}
              >
                I am a Nigerian-born British artist with a creative and artistic eye
                from the childhood. I am self-taught and have grown in my passionate
                God-given gift for art and drawing for many years.The product of drawing
                is where I see visions come to life, it is also where I feel most at peace.
                Who knew a pencil, a paper, a hand and bumping some good Neo soul in the
                background could go somewhere. 
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;