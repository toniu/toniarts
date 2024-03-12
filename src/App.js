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
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-5 bg-black bg-opacity-75 text-white rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-x-3">
        <BsMouseFill className="text-2xl" />
        {message}
      </div>
    </motion.div>
  );
};

function App() {
  const [showScrollMsg, setShowScrollMsg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollMsg(scrollPosition < 150);
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
        {showScrollMsg && <ScrollMsg message="scroll down" />}
      </main>
    </div>
  );
}

export default App;
