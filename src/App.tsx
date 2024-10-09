import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import StarsCanvas from "./components/ui/StarBackground";
import Navbar from "./sections/navbar/Navbar";
import { motion } from "framer-motion"; // Add this import
import Footer from './sections/footer/footer';
import ScrollProgressBar from './components/ui/ScrollProgressBar'; // Add this import
import ScrollbarCustomizer from "./components/ui/ScrollbarCustomizer"; // Add this import
import CursorChanger from './components/ui/CursorChanger'; // Add this import
import { certificateData } from './portfolioData.ts/data';
import LoadingSpinner from './components/ui/LoadingSpinner'; // Add this import
import { LoadingProvider, useLoading } from './hooks/LoadingContext'; // Add this import
import bgpattern from './assets/img/bg_pattern.webp';
import SpaceLoadingScreen from './components/ui/SpaceLoadingScreen';

const Hero = lazy(() => import('./sections/hero/Hero'));
const Experience = lazy(() => import('./sections/experience/Experience'));
const Projects = lazy(() => import('./sections/projects/Projects'));
const GitHubContributions = lazy(() => import('./components/ui/GitHubContributions'));
const CertificateScroll = lazy(() => import('./sections/certificates/CertificateScroll'));
const CharacterSpotlight = lazy(() => import('./sections/avatar/CharacterSpotlight'));

function AppContent() {
  const { isLoading: contextLoading, setIsLoading: setContextLoading } = useLoading();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setContextLoading(false);
    }, 3000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, [setContextLoading]);

  if (initialLoading) {
    return <SpaceLoadingScreen onLoadingComplete={() => setInitialLoading(false)} />;
  }

  return (
    <>
      <ScrollbarCustomizer 
        width="6px"
        trackColor="#1a202c"
        thumbGradient={[
          "rgba(38, 38, 38, 0.8)",
          "rgba(58, 58, 58, 0.8)",
        ]}
      />
      <div 
        className="h-full w-full bg-zinc-950 bg-no-repeat relative overflow-hidden
                   bg-[length:750%_auto] sm:bg-[length:200%_auto] md:bg-[length:250%_auto]
                   bg-top sm:bg-center"
        style={{
          backgroundImage: `url(${bgpattern})`,
          backgroundRepeat: 'inherit',
        }}
      >
        <StarsCanvas />
        <ScrollProgressBar />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            <motion.main
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Hero />
                <div>
                  <Experience />
                  <Projects />
                  <div className="py-12">
                    <GitHubContributions 
                      username="MilanPatel2003"
                    />
                  </div>
                  <CertificateScroll content={certificateData} />
                </div>
                <CharacterSpotlight />
              </Suspense>
            </motion.main>
          </div>
          <div>
            <Footer />
          </div>
        </div>
        <CursorChanger />
      </div>
      {contextLoading && <LoadingSpinner />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}