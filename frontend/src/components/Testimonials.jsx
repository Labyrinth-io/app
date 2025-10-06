import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { mockData } from './mock';

export const Testimonials = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Real Results from Real People ✨
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how the 150K Playbook is transforming creators' lives and follower counts
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50"
              >
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 text-center mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                      {testimonial.author.charAt(0)}
                    </div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Social proof numbers */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 inline-block">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                500+ Success Stories
              </p>
              <p className="text-gray-600">And counting! Join the Sparkle community today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;