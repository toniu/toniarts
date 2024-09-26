import React, { useEffect, useState, useRef } from 'react';
import TS1 from '../assets/strips/tsr-1.png'
import TS2 from '../assets/strips/tsr-2.png'
import TS3 from '../assets/strips/tsr-3.png'
import TS4 from '../assets/strips/tsr-4.png'
import TS5 from '../assets/strips/tsr-5.png'
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const Intro = () => {
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

  const imageStrips = [
    { src: TS1, alt: 'strip' },
    { src: TS2, alt: 'strip' },
    { src: TS3, alt: 'strip' },
    { src: TS4, alt: 'strip' },
    { src: TS5, alt: 'strip' }
  ];

  const variants = {
    up: { y: '-100%' },
    down: { y: '100%' }
  };

  return (
    <section id='intro'
      className='h-screen flex justify-center items-center relative overflow-hidden'>
      {/* Background Scroll */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full object-cover`}>
          <motion.div className='flex'
          initial={{ opacity: 0.75, y: 0, scale: 3, rotate: -40, x: -150, backgroundColor: "#4D8962" }}
          animate={{ opacity: 1, y: -10, scale: 1, rotate: 0, x: 0, backgroundColor: "#141414" }}
          transition={{ duration: 3, delay: 0.5 }}>
            {imageStrips.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`px-2 w-[50%] md:w-[20%] h-[135vh] md:h-auto opacity-5`}
                initial={false}
                animate={
                  index % 2 === 0
                    ? { y: scrollY * -0.3 }
                    : { y: scrollY * 0.3 - (50)} // Adjust the offset based on window height
                }
                variants={variants}
                transition={{ ease: 'linear' }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div className='relative container z-10 text-center'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -10 }}
      transition={{ duration: 0.75, delay: 1.5 }}>
        <motion.h1
          ref={(element) => {
            ref(element);
            elementRef.current = element;
          }}
          initial='hidden'
          animate={{
            opacity: 1,
            y: calculatePosition(elementRef.current) * 110,
          }}
          className='text-6xl md:text-8xl text-[#81E5A5] font-normal'>
          toni<span className='text-white'>arts.</span>
        </motion.h1>
        <motion.h3
          ref={(element) => {
            ref(element);
            elementRef.current = element;
          }}
          initial='hidden'
          animate={{
            opacity: 1,
            y: calculatePosition(elementRef.current) * 110,
          }}
          className='text-lg md:text-2xl text-white font-light'>
          a visual gallery of my drawings
        </motion.h3>
      </motion.div>
    </section>
  );
};

export default Intro;
