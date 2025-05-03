
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { connectToMetaMask } from '@/utils/web3';

interface WalletConnectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ open, onOpenChange, onConnect }) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  
  const connectMetamask = async () => {
    setIsConnecting(true);
    
    try {
      // Use the web3 utility to connect
      const connection = await connectToMetaMask();
      if (connection.address && connection.isConnected) {
        toast({
          title: "Wallet Connected",
          description: "Your MetaMask wallet has been connected successfully.",
        });
        
        onConnect(connection.address);
        navigate('/dashboard'); // Redirect to dashboard after successful connection
      } else {
        throw new Error("Failed to connect wallet");
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      });
      console.error("Wallet connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-card bg-card/70 text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-blue">
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Connect your wallet to access Nymuba Track marketplace features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 flex items-center justify-center gap-2 text-white"
            disabled={isConnecting}
            onClick={connectMetamask}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-5 h-5" />
            {isConnecting ? 'Connecting...' : 'MetaMask'}
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-nymuba-primary text-nymuba-primary hover:bg-nymuba-primary/10"
            disabled
          >
            More wallets coming soon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect;
