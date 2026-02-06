import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
/* Components */
import Intro from "./components/Intro.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";

import { BsMouseFill } from "react-icons/bs";

const ScrollMsg = ({ message }) => {
  return (
    <motion.div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 py-2 px-6 bg-black bg-opacity-75 text-green-300 rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      <div className="flex w-auto gap-x-2 select-none ">
        <BsMouseFill className="text-xl md:text-2xl" />
        <span className="text-base md:text-lg">{message}</span>
      </div>
    </motion.div>
  );
};

function App() {
  const [showScrollMsg, setShowScrollMsg] = useState(true);
  const [scrollString, setScrollString] = useState("use scroll");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const acComponent = document.getElementById("about");

      /* The message should only show if the scroll position falls in any of these regions */
      const msgIntroSection = scrollPosition < acComponent.offsetTop * 0.2;
      /* const msgAboutSection =
        scrollPosition > acComponent.offsetTop * 1.75 &&
        scrollPosition < acComponent.offsetTop * 2.25; */

      setScrollString("Use Scroll");
      setShowScrollMsg(msgIntroSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <main>
        <Intro />
        <About />
        <Gallery />
        <Footer />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}>
          {showScrollMsg && <ScrollMsg message={scrollString} />}
        </motion.div>
      </main>
    </div>
  );
}

export default App;
