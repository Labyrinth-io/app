import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Mail, Sparkles } from 'lucide-react';
import { mockData, mockAPI } from './mock';
import { useToast } from '../hooks/use-toast';

export const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const result = await mockAPI.subscribeEmail(email);
      
      toast({
        title: "Success! 🎉",
        description: result.message + " Check your email for the free checklist!",
      });
      setEmail('');
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
    <section className="section gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl rotate-12">✨</div>
        <div className="absolute bottom-10 right-10 text-8xl -rotate-12">💫</div>
        <div className="absolute top-1/2 left-1/4 text-4xl rotate-45">⭐</div>
        <div className="absolute top-1/4 right-1/3 text-5xl -rotate-45">✨</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="mx-auto mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
                <Download className="w-4 h-4 mr-2" />
                FREE DOWNLOAD
              </Badge>
              
              <CardTitle className="display-font text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                {mockData.leadMagnet.title}
              </CardTitle>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {mockData.leadMagnet.subtitle}
              </p>
            </CardHeader>
            
            <CardContent className="pt-4">
              {/* Value proposition */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Proven Hooks</h3>
                  <p className="text-sm text-gray-600">10 viral hook templates that work</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600">See improvement in your next post</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Exclusive Access</h3>
                  <p className="text-sm text-gray-600">Plus weekly tips in your inbox</p>
                </div>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 py-3 border-2 border-purple-200 focus:border-purple-400 rounded-full"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading || !email}
                    className="btn-sparkle px-8 py-3 rounded-full"
                  >
                    {isLoading ? 'Sending...' : mockData.leadMagnet.ctaText}
                  </Button>
                </div>
              </form>
              
              {/* Trust indicators */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No spam, ever
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Unsubscribe anytime
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Instant delivery
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-4">
                Join 12,000+ creators already growing with Sammy's strategies ✨
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;