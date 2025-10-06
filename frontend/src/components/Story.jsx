import React from 'react';
import { mockData } from './mock';

export const Story = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="display-font text-3xl md:text-5xl font-bold text-gray-800 mb-12">
            My Story
          </h2>
          
          {/* Story Content */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              "{mockData.story.text}"
            </blockquote>
            
            {/* Author signature */}
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Sammy Sparkle</p>
                <p className="text-sm text-gray-600">TikTok Creator & Growth Coach</p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                180K+
              </div>
              <p className="text-gray-600 font-medium">TikTok Followers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                50M+
              </div>
              <p className="text-gray-600 font-medium">Total Views</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                2 Years
              </div>
              <p className="text-gray-600 font-medium">From 200 to 180K</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;