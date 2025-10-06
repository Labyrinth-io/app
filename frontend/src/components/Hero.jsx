import React from 'react';
import { Button } from './ui/button';
import { mockData } from './mock';

export const Hero = ({ onCtaClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center sparkle-bg gradient-bg-soft relative">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-3/4 right-1/4 text-xl animate-bounce" style={{ animationDelay: '1s' }}>💫</div>
        <div className="absolute top-1/2 left-1/6 text-lg animate-bounce" style={{ animationDelay: '2s' }}>⭐</div>
        <div className="absolute top-1/3 right-1/6 text-xl animate-bounce" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="display-font text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight fade-in">
            {mockData.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="body-font text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {mockData.hero.subheadline}
          </p>
          
          {/* CTA Button */}
          <div className="fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={onCtaClick}
              className="btn-sparkle text-lg px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300"
            >
              {mockData.hero.ctaText}
            </Button>
          </div>
          
          {/* Trust indicator */}
          <p className="text-sm text-gray-500 mt-6 fade-in" style={{ animationDelay: '0.6s' }}>
            Join 180,000+ followers who trust Sammy's authentic approach ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;