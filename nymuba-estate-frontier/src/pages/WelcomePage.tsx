
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthModal from '@/components/AuthModal';
import WalletConnect from '@/components/WalletConnect';
import { useToast } from '@/hooks/use-toast';

const WelcomePage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is already authenticated
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const userEmail = localStorage.getItem('userEmail');
    
    if (savedAddress || userEmail) {
      setIsAuthenticated(true);
      if (savedAddress) {
        setWalletAddress(savedAddress);
      }
      // Redirect to dashboard if already authenticated
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsAuthenticated(true);
    // Save wallet connection to localStorage
    localStorage.setItem('walletAddress', address);
    
    toast({
      title: "Wallet Connected",
      description: `Connected with address ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleEmailSignIn = () => {
    setIsAuthenticated(true);
    toast({
      title: "Signed In",
      description: "Welcome to Nymuba Track!",
    });
    
    // Redirect will be handled in the AuthModal component
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background bg-nymuba-grid">
      <div className="w-full max-w-4xl">
        <Card className="glass-card border-nymuba-primary/20 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="bg-nymuba-primary rounded-md h-16 w-16 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">NT</span>
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
              Welcome to Nymuba Track
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center text-muted-foreground px-4 max-w-2xl mx-auto">
              <p className="text-lg">
                The premier blockchain-powered real estate marketplace for property management, sales, and rentals.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="w-full md:w-auto bg-nymuba-primary hover:bg-nymuba-primary/90 px-8"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In with Email
              </Button>
              <span className="text-muted-foreground">or</span>
              <Button 
                size="lg"
                variant="outline" 
                className="w-full md:w-auto border-nymuba-primary text-nymuba-primary hover:bg-nymuba-primary/10 px-8"
                onClick={() => setShowWalletModal(true)}
              >
                Connect Wallet
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground pt-6 border-t border-border">
              <p>© {new Date().getFullYear()} Nymuba Track. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSignIn={handleEmailSignIn}
      />
      
      <WalletConnect 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal} 
        onConnect={handleWalletConnect}
      />
    </div>
  );
};

export default WelcomePage;
