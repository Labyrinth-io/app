import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Star } from 'lucide-react';
import { mockData, mockAPI } from './mock';
import { useToast } from '../hooks/use-toast';

export const EbookShowcase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const result = await mockAPI.purchaseEbook({
        product: 'TikTok 150K Playbook',
        price: 29
      });
      
      toast({
        title: "Purchase Successful! 🎉",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0">
              ✨ LIMITED TIME LAUNCH PRICE ✨
            </Badge>
            <h2 className="display-font text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              {mockData.ebook.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {mockData.ebook.tagline}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* eBook Preview */}
            <div className="relative">
              <Card className="transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl border-0 bg-gradient-to-br from-pink-400 to-purple-500">
                <CardContent className="p-8 text-white text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="display-font text-2xl font-bold mb-2">The TikTok 150K Playbook</h3>
                    <p className="opacity-90">Your Complete Growth Guide</p>
                  </div>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-sm opacity-80">Based on real results from 180K+ followers</p>
                </CardContent>
              </Card>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 text-4xl animate-spin" style={{ animationDuration: '3s' }}>✨</div>
              <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce">💎</div>
            </div>

            {/* Content & Purchase */}
            <div>
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="display-font text-2xl text-center text-gray-800">
                    What's Inside:
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.ebook.contents.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                  
                  {/* Bonus items */}
                  <div className="border-t pt-4 mt-6">
                    <p className="font-semibold text-purple-700 mb-3">🎁 BONUS INCLUDED:</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>30 viral hook templates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Content planning worksheet</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 text-center">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 line-through">Regular Price: $79</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                        {mockData.ebook.price}
                      </p>
                      <p className="text-sm text-purple-600 font-medium">Launch Price - Limited Time!</p>
                    </div>
                    
                    <Button 
                      onClick={handlePurchase}
                      disabled={isLoading}
                      className="w-full mt-6 btn-sparkle text-lg py-3"
                    >
                      {isLoading ? 'Processing...' : mockData.ebook.ctaText}
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      Instant download • 30-day money-back guarantee
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookShowcase;