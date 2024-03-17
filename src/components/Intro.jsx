import React, { useEffect, useState, useRef } from 'react';
import TS1 from '../assets/tsr-1.png'
import TS2 from '../assets/tsr-2.png'
import TS3 from '../assets/tsr-3.png'
import TS4 from '../assets/tsr-4.png'
import TS5 from '../assets/tsr-5.png'
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
          <div className='flex'>
            {imageStrips.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`px-2 w-[30%] md:w-[20%] h-[140vh] md:h-auto ${index % 2 === 0 ? 'opacity-20' : 'opacity-15'}`}
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
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='relative container z-10 text-center'>
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
          className='text-6xl md:text-8xl text-[#362218] font-bold'>
          toniarts.
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
          className='text-lg md:text-2xl text-[#174135] font-bold'>
          a visual gallery of my drawings
        </motion.h3>
      </div>
    </section>
  );
};

export default Intro;
