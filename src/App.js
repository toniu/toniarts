import React from "react";
import "./App.css";
/* Components */
import Intro from "./components/Intro.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <main>
        <Intro/>
        <About/>
        <Gallery/>
        <Footer/>
      </main>
    </div>
  );
}

export default App;
