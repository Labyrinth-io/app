import React from 'react';
import { Button } from './ui/button';
import { mockData } from './mock';

export const Hero = ({ onCtaClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      {/* Subtle floating sparkles - reduced and positioned carefully */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-xl animate-pulse" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute bottom-20 right-10 text-lg animate-pulse" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute top-40 right-20 text-sm animate-pulse" style={{ animationDelay: '4s' }}>⭐</div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="display-font text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {mockData.hero.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="body-font text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            {mockData.hero.subheadline}
          </p>
          
          {/* CTA Button */}
          <div className="mb-8">
            <Button 
              onClick={onCtaClick}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-10 py-4 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {mockData.hero.ctaText}
            </Button>
          </div>
          
          {/* Trust indicator */}
          <p className="text-sm text-gray-600 font-medium">
            Join 180,000+ followers who trust Sammy's authentic approach ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;