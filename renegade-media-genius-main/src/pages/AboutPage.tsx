
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Users, Rocket, Award, Star, Shield } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-renegade-green neon-text">RENEGADE</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Leading the revolution in Web3 social media management through the power of AI and blockchain technology
        </p>
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
            <p className="text-2xl font-bold">Redefining Social Media Management</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-renegade-green mb-6"></div>
            <p className="mb-4">
              RENEGADE was born from a simple yet powerful vision: to democratize access to advanced AI tools for social media content creation while leveraging the security and transparency of blockchain technology.
            </p>
            <p className="mb-4">
              Founded by a team of developers, designers, and social media experts, our platform bridges the gap between cutting-edge AI capabilities and the growing demand for efficient, authentic social media management.
            </p>
            <p>
              We believe that by combining OpenAI's powerful language models with the decentralized infrastructure of the Internet Computer Protocol, we can create a more open, secure, and innovative ecosystem for content creators and businesses alike.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="cyber-card p-10 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <div className="h-1 w-20 bg-renegade-green mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="cyber-card hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                To push the boundaries of what's possible at the intersection of AI, blockchain, 
                and social media, creating tools that are both cutting-edge and accessible.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-muted-foreground">
                To provide a platform where users have complete ownership and control over 
                their content, protected by the immutable security of blockchain technology.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-renegade-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
              <p className="text-muted-foreground">
                To empower creators, businesses, and individuals to express themselves authentically 
                and effectively across social media platforms through AI assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <div className="h-1 w-20 bg-renegade-green mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team brings together expertise in AI development, blockchain technology, 
            and social media marketing to deliver a revolutionary product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-renegade-green/30">
              <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">JOHNSON</h3>
            <p className="text-renegade-green mb-2">FRONTEND</p>
          </div>

          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-renegade-green/30">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">LOUIS</h3>
            <p className="text-renegade-green mb-2">FRONTEND</p>
          </div>

          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-renegade-green/30">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" />
              <AvatarFallback>BY</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">BYRON</h3>
            <p className="text-renegade-green mb-2">BACKEND</p>
          </div>

          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-renegade-green/30">
              <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" />
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">DOROTHEA</h3>
            <p className="text-renegade-green mb-2">BACKEND</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 border-t border-renegade-green/30">
        <h2 className="text-3xl font-bold mb-6">Join the RENEGADE Revolution</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Be part of the future of social media management with AI and blockchain technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-renegade-green hover:bg-renegade-green/80 text-black font-medium">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10">
              <MessageSquare className="mr-2 h-5 w-5" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

