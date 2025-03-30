
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Database, 
  BarChart3, 
  Bot
} from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-renegade-green neon-text">RENEGADE</span>
              <br />AI Social Media Manager on ICP
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Generate powerful content and manage your social presence with blockchain security and AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-renegade-green hover:bg-renegade-green/80 text-black font-medium">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated glow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-renegade-green/20 rounded-full animate-glow"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 futuristic-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by <span className="text-renegade-green">Web3</span> & <span className="text-accent">AI</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              RENEGADE combines cutting-edge technologies to revolutionize how you create and manage social media content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="cyber-card p-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Generation</h3>
              <p className="text-gray-300">
                Leverage OpenAI's powerful models to create engaging social media content with just a few clicks.
              </p>
            </div>
            
            <div className="cyber-card p-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ICP Blockchain Storage</h3>
              <p className="text-gray-300">
                Store all your content securely on the Internet Computer Protocol blockchain for ultimate security and transparency.
              </p>
            </div>
            
            <div className="cyber-card p-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Posting</h3>
              <p className="text-gray-300">
                Schedule and automate content delivery across multiple social platforms from a single dashboard.
              </p>
            </div>
            
            <div className="cyber-card p-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Web3 Security</h3>
              <p className="text-gray-300">
                Enhanced security and privacy through decentralized technology, keeping your data safe from breaches.
              </p>
            </div>
            
            <div className="cyber-card p-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-300">
                Track engagement and performance with comprehensive analytics and actionable insights.
              </p>
            </div>
            
            <div className="cyber-card p-6">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <ArrowRight className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
              <p className="text-gray-300">
                Connect all your favorite social platforms - X (Twitter), Instagram, LinkedIn, and more in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-renegade-dark border-y border-renegade-green/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to revolutionize your social media strategy?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the Web3 social media revolution and experience the power of AI-driven content generation.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-renegade-green hover:bg-renegade-green/80 text-black font-medium px-8">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
