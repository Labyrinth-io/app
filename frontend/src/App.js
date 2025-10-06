import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Hero from "./components/Hero";
import Story from "./components/Story";
import EbookShowcase from "./components/EbookShowcase";
import Testimonials from "./components/Testimonials";
import LeadMagnet from "./components/LeadMagnet";
import Footer from "./components/Footer";

const Home = () => {
  useEffect(() => {
    // Add fade-in animation on scroll
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToEbook = () => {
    const ebookSection = document.getElementById('ebook-section');
    if (ebookSection) {
      ebookSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onCtaClick={scrollToEbook} />
      
      {/* Story Section */}
      <Story />
      
      {/* eBook Showcase */}
      <div id="ebook-section">
        <EbookShowcase />
      </div>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Lead Magnet */}
      <LeadMagnet />
      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;