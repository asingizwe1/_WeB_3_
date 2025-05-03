
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Wallet } from 'lucide-react';
import AuthModal from './AuthModal';
import WalletConnect from './WalletConnect';

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if wallet is already connected in localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
    setShowWalletModal(false);
    // Save wallet connection to localStorage
    localStorage.setItem('walletAddress', address);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    // Remove wallet connection from localStorage
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userEmail');
    // Redirect to welcome page
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2 md:hidden" />
        </div>

        <div className="flex items-center gap-4">
          {isConnected && walletAddress ? (
            <Button variant="outline" className="gap-2" onClick={handleDisconnect}>
              <Wallet size={16} />
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Button>
          ) : (
            <>
              <Button variant="default" className="bg-nymuba-primary hover:bg-nymuba-primary/90" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
              <Button
                variant="outline" 
                className="border-nymuba-primary text-nymuba-primary hover:bg-nymuba-primary/10"
                onClick={() => setShowWalletModal(true)}
              >
                <Wallet size={16} className="mr-2" />
                Connect Wallet
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <WalletConnect 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal} 
        onConnect={handleWalletConnect}
      />
    </header>
  );
};

export default Navbar;
