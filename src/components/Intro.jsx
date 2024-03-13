import React, { useEffect, useState, useRef } from 'react';
import bgVideo from '../assets/intro-video.mp4';
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

    return (
        <section id='intro'
        className='h-screen flex justify-center items-center relative overflow-hidden'>
            {/* Background Video */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <video className= {`absolute top-0 left-0 w-full h-full object-cover`}
                    autoPlay loop muted>
                    <source src={bgVideo} type="video/mp4" />
                </video>
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
                    className='text-xl md:text-2xl text-[#174135] font-bold'>
                    a visual gallery of my drawings
                </motion.h3>
            </div>
        </section>
    );
};

export default Intro;
