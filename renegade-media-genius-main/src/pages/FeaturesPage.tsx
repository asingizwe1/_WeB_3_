
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Database, Bot, ArrowRight, BarChart3, MessageSquare } from "lucide-react";

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-renegade-green neon-text">RENEGADE</span> Features
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover how our AI-powered tools transform your social media presence through Web3 technology
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-renegade-green" />
            </div>
            <CardTitle>AI Content Generation</CardTitle>
            <CardDescription>Create engaging content with OpenAI's models</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Generate tweets, blog posts, and captions using state-of-the-art AI. Our
              platform leverages the power of OpenAI's GPT models to craft engaging
              content that resonates with your audience.
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-renegade-green" />
            </div>
            <CardTitle>ICP Blockchain Storage</CardTitle>
            <CardDescription>Secure and transparent content management</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Store all your content securely on the Internet Computer Protocol blockchain. 
              Benefit from decentralized storage with unmatched security, transparency, 
              and reliability for your social media assets.
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-renegade-green" />
            </div>
            <CardTitle>Automated Posting</CardTitle>
            <CardDescription>Schedule and publish across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Set it and forget it! Schedule and automate content delivery across 
              multiple social media platforms from our intuitive dashboard. Optimize 
              posting times for maximum engagement.
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-renegade-green" />
            </div>
            <CardTitle>Web3 Security</CardTitle>
            <CardDescription>Advanced protection for your data</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Enhanced security through decentralized Web3 technology. Keep your 
              content, strategy, and audience data safe from breaches with blockchain 
              security protocols built into the RENEGADE platform.
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-renegade-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-renegade-green" />
            </div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Track and optimize performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Comprehensive analytics to track engagement metrics across all platforms. 
              Gain actionable insights to refine your content strategy and grow your 
              audience through data-driven decision making.
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card hover:shadow-lg hover:shadow-renegade-green/10 transition-all duration-300">
          <CardHeader>
            <div className="bg-accent/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <CardTitle>Multi-Platform Integration</CardTitle>
            <CardDescription>Connect all your social accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Seamlessly connect X (Twitter), Instagram, LinkedIn, and more in one 
              place. Manage all your social media presence from a single, powerful 
              dashboard without switching between apps.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Features Section */}
      <div className="bg-gradient-to-r from-background to-secondary/20 p-8 rounded-lg mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            RENEGADE goes beyond basic social media management with cutting-edge features
            powered by blockchain and artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-renegade-green/20 rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-renegade-green">AI Trend Analysis</h3>
            <p>
              Our AI algorithms analyze trending topics relevant to your industry and 
              automatically suggest content ideas that align with current trends, helping
              you stay relevant and increase engagement.
            </p>
          </div>

          <div className="p-6 border border-renegade-green/20 rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-renegade-green">Content Authenticity Verification</h3>
            <p>
              Leverage blockchain technology to create a verifiable record of content 
              ownership and creation timestamps, protecting your intellectual property 
              in the digital space.
            </p>
          </div>

          <div className="p-6 border border-renegade-green/20 rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-renegade-green">Audience Sentiment Analysis</h3>
            <p>
              Our AI analyzes comments and interactions to gauge audience sentiment,
              providing valuable feedback on how your content is being received and 
              helping you adjust your messaging for better engagement.
            </p>
          </div>

          <div className="p-6 border border-renegade-green/20 rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-renegade-green">Decentralized Content Storage</h3>
            <p>
              Store your content library on the ICP blockchain, ensuring it remains 
              accessible and secure regardless of traditional server outages or 
              centralized platform policy changes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 border-t border-renegade-green/30">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your social media strategy?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Join the Web3 social media revolution today and experience the power of AI-driven content generation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-renegade-green hover:bg-renegade-green/80 text-black font-medium">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
