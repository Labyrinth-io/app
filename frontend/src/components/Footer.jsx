import React from 'react';
import { Heart } from 'lucide-react';
import { mockData } from './mock';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                S
              </div>
              <div>
                <h3 className="display-font text-xl font-bold">Sammy Sparkle</h3>
                <p className="text-sm text-gray-400">TikTok Growth Coach</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-xs">
              Helping creators grow their TikTok with authenticity, heart, and a whole lot of sparkle.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#ebook" className="hover:text-purple-400 transition-colors">150K Playbook</a></li>
              <li><a href="#testimonials" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
              <li><a href="#freebie" className="hover:text-purple-400 transition-colors">Free Resources</a></li>
            </ul>
          </div>
          
          {/* Social links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Follow the Journey ✨</h4>
            <div className="space-y-2 text-sm text-gray-300">
              {mockData.footer.socialLinks.map((social, index) => (
                <div key={index}>
                  <a 
                    href={`#${social.platform.toLowerCase()}`}
                    className="hover:text-purple-400 transition-colors flex items-center justify-center md:justify-end"
                  >
                    <span className="mr-2">
                      {social.platform === 'TikTok' && '🎵'}
                      {social.platform === 'Instagram' && '📸'}
                      {social.platform === 'YouTube' && '📺'}
                    </span>
                    {social.platform}: {social.handle}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Signature quote */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <blockquote className="text-center">
            <p className="display-font text-lg md:text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              "{mockData.footer.signature}"
            </p>
          </blockquote>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="w-4 h-4 text-red-400 mr-2" />
            <span>Made with love by Sammy Sparkle</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          © 2025 Sammy Sparkle. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;