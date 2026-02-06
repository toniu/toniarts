import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../assets/toni-backgroundlgs.png';
import toni from '../assets/artist-moi.png'
import phones from '../assets/ta-about-phones.png'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const [isASAVisible, setIsASAVisible] = useState(false);
  const [isASBVisible, setIsASBVisible] = useState(false);
  const controls = useAnimation();
  const aboutRef = useRef(null);
  const archiveRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: archiveRef,
    offset: ['start end', 'end start']
  });
  const archiveY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const archiveOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0.9]);

  const phonesRef = useRef(null);
  const { scrollYProgress: phonesScroll } = useScroll({
    target: phonesRef,
    offset: ['start end', 'end start']
  });
  const phonesY = useTransform(phonesScroll, [0, 1], [28, -28]);
  const phonesRotate = useTransform(phonesScroll, [0, 1], [-2.5, 2.5]);
  const phonesScale = useTransform(phonesScroll, [0, 1], [0.9, 1]);

  const meRef = useRef(null);
  const { scrollYProgress: meScroll } = useScroll({
    target: meRef,
    offset: ['start end', 'end start']
  });
  const meY = useTransform(meScroll, [0, 1], [20, -20]);
  const meRotate = useTransform(meScroll, [0, 1], [2.5, -2.5]);
  const meScale = useTransform(meScroll, [0, 1], [0.9, 1]);

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start']
  });
  const bgY = useTransform(aboutScroll, [0, 1], ['-15%', '15%']);

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

      if (ASBPosition.top < window.innerHeight * 0.5) {
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
      ref={aboutRef}
      className='about-section relative overflow-hidden h-auto'
    >
      {/* Parallax background layer */}
      <motion.div
        className='absolute -inset-x-0 -top-[8%] h-[116%]'
        style={{
          y: bgY,
          scale: 1.02,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className='scroll-section relative py-0 top-0'>
        <div className='divs-container text-white'>
          {/* WHAT */}
          <div
            id='section-a what'
            className='about-section-a h-auto'
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isASAVisible ? 1 : 0, y: isASAVisible ? 0 : 12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='bg-black/60 text-center md:text-left w-screen px-5 py-6 md:py-8 backdrop-blur-sm'
            >
              <p className='text-xs md:text-sm uppercase tracking-[0.35em] text-[#81E5A5]'>What</p>
              <h2 className='mt-2 text-2xl md:text-3xl text-white'>A visual gallery of portraits</h2>
              <div className='mt-4 h-[2px] w-16 mx-auto md:mx-0 bg-[#81E5A5]' />
            </motion.div>
            {/* Content + phones visual */}
            <div className='grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center px-8 md:px-12 py-7 md:pt-16'>
              <div className='text-sm md:text-base text-center md:text-left leading-relaxed md:leading-relaxed max-w-2xl'>
                <p>
                  The <span className='text-[#81E5A5]'>toniarts.</span> Visual Gallery is a curated collection of portrait drawings by self-taught Nigerian artist, <span className='text-[#81E5A5]'>toni. </span>
                  <br /><br />
                  The work explores the beauty, creativity, and complexity of people across the African and Caribbean mainland and diaspora. Each portrait is inspired by individuals from different walks of life — <span className='text-[#81E5A5]'>music, film, sports, fashion, family, and everyday brilliance.</span>
                  <br /><br />
                  This body of work is a reflection, a remembering, and a return.
                  <br /><br />
                  I gotta <span className='text-[#81E5A5]'>re-ignite</span> my gifts — it’s been too long.
                  <br />
                  <span className='text-[#81E5A5]'>Love to my peopledem.</span>
                </p>
              </div>
              {/* Phones visual (parallax) */}
              <motion.div
                ref={phonesRef}
                style={{ y: phonesY, rotate: phonesRotate, scale: phonesScale }}
                className='mx-auto'
              >
                <div className='mx-auto rounded-full bg-black/10 p-2 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
                  <img
                    id='phones'
                    className='block max-w-[320px] sm:max-w-[380px] md:max-w-[520px] w-full h-auto object-contain'
                    src={phones}
                    alt='phones'
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* WHO */}
          <div
            id="section-b who"
            className="about-section-b md:h-auto flex flex-col gap-6 "
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isASBVisible ? 1 : 0, y: isASBVisible ? 0 : 12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='bg-black/60 text-center md:text-left w-screen px-5 py-6 md:py-8 backdrop-blur-sm '
            >
              <p className='text-xs md:text-sm uppercase tracking-[0.35em] text-[#81E5A5]'>Who</p>
              <h2 className='mt-2 text-2xl md:text-3xl text-white'>Meet the artist</h2>
              <div className='mt-4 h-[2px] w-16 mx-auto md:mx-0 bg-[#81E5A5]' />
            </motion.div>

            {/* Content + artist visual */}
            <div className="px-5 md:px-10 py-7 ">
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 items-center">
                <div className="text-sm md:text-base leading-relaxed md:leading-relaxed max-w-2xl">
                  <h3 className="text-[#81E5A5] text-2xl md:text-3xl font-bold">nekabari <span className="font-light">("nek-abari")</span></h3>
                  <h3 className="text-white text-lg md:text-xl font-semibold">"give honour to God"</h3>
                  <br />
                  <h3> A self-taught Nigerian artist working primarily in portraiture.
                    <br />
                    This space is both a reminder and a challenge:
                    <br /><br />
                    Stop hiding your <span className="text-[#81E5A5]">gifts.</span>
                    <br /> <span className="text-[#81E5A5]">Unwrap</span> what God gave you.
                  </h3>
                </div>

                {/* Artist image (parallax) */}
                <motion.div
                  ref={meRef}
                  style={{ y: meY, rotate: meRotate, scale: meScale }}
                  className="mx-auto md:ml-auto"
                >
                  <div className='rounded-full bg-black/20 p-2 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
                    <img
                      id="me"
                      className="block max-w-[260px] sm:max-w-[320px] md:max-w-[380px] w-full h-auto object-contain rounded-full"
                      src={toni}
                      alt="me"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ARCHIVE transition */}
          <div
            ref={archiveRef}
            className="relative min-h-[40vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              style={{ opacity: archiveOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"
            />
            <motion.div
              style={{ y: archiveY, opacity: archiveOpacity }}
              className="relative z-10 text-center px-6 py-10 md:py-12 w-screen"
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#81E5A5]">Archive</p>
              <h2 className="mt-4 text-xl md:text-2xl text-white">
                A growing archive of <br/> faces, moments, and stories.
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-300">
                Scroll to enter the gallery.
              </p>
              <div className="mt-6 mx-auto h-[2px] w-20 bg-[#81E5A5]" />
            </motion.div>
          </div>


        </div>
      </div>
    </div>

  );
};

export default About;