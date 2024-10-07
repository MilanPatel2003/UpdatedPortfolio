import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import StarsCanvas from "./components/ui/StarBackground";
import bgPattern from "./assets/img/bg_pattern.png"; // Import the image
import Navbar from "./sections/navbar/Navbar";
import Hero from "./sections/hero/Hero";
import Experience from '@/sections/experience/Experience'; // Add this import
import Projects from "./sections/projects/Projects";
import { motion } from "framer-motion"; // Add this import
import Footer from './sections/footer/footer';
import SpaceLoadingScreen from './components/ui/SpaceLoadingScreen';
import ScrollProgressBar from './components/ui/ScrollProgressBar'; // Add this import
import ScrollbarCustomizer from "./components/ui/ScrollbarCustomizer"; // Add this import
import CursorChanger from './components/ui/CursorChanger'; // Add this import
import GitHubContributions from './components/ui/GitHubContributions';
import { certificateData } from './portfolioData.ts/data';
import { CertificateScroll } from './sections/certificates/CertificateScroll';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentBlurred, setIsContentBlurred] = useState(true);
  const pixieText = "Hey there! I'm Pixie, your friendly robot companion. 🤖 My master and I are stranded in space 🚀, but while we're stuck, why not explore this portfolio? Dive into the creativity that powers our journey through the stars!";
  const typingDuration = 20; // Changed from 40 to 20ms per character

  useEffect(() => {
    const totalDuration = pixieText.length * typingDuration;

    const timer = setTimeout(() => {
      setIsContentBlurred(false);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [pixieText]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <ScrollbarCustomizer 
        width="6px"  // Increased from 1px for better visibility
        trackColor="#1a202c"
        thumbGradient={[
          "rgba(38, 38, 38, 0.8)",  // Dark gray
          "rgba(58, 58, 58, 0.8)",  // Slightly lighter gray
        ]}
      />
      <Router>
        {isLoading ? (
          <SpaceLoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div 
            className="min-h-screen w-full bg-slate-950 bg-no-repeat bg-cover relative overflow-hidden"
            style={{
              backgroundImage: `url(${bgPattern})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <StarsCanvas />
            <ScrollProgressBar /> {/* Add this line */}
            <div className="relative z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <motion.main
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <div className={`transition-all duration-1000 ${isContentBlurred ? 'blur-sm' : 'blur-none'}`}>
                    <Experience />
                    <Projects />
                    <div className="py-12">
                      <GitHubContributions 
                        username="MilanPatel2003"
                      />
                    </div>
                  
                      <CertificateScroll content={certificateData} />
                 
                  </div>
                </motion.main>
              </div>
              <div className={`transition-all duration-1000 ${isContentBlurred ? 'blur-sm' : 'blur-none'}`}>
                <Footer />
              </div>
            </div>
            <CursorChanger /> {/* Add this line */}
          </div>
        )}
      </Router>
    </>
  );
  
}
