
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, onSignIn }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual authentication logic
    if (email && password) {
      // Store user email in localStorage
      localStorage.setItem('userEmail', email);
      
      toast({
        title: isSignIn ? "Signed In" : "Account Created",
        description: isSignIn ? "Welcome back to Nymuba Track!" : "Your account has been created successfully.",
      });
      
      onOpenChange(false);
      
      if (onSignIn) {
        onSignIn();
      }
      
      // Redirect to dashboard after successful sign in
      navigate('/dashboard');
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };
  
  const handleWalletConnect = () => {
    // Close this modal and let the parent know we want to show the wallet modal instead
    onOpenChange(false);
    // Slight delay to avoid modal transition issues
    setTimeout(() => {
      document.querySelector('[aria-label="Connect Wallet"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    }, 100);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-card bg-card/70 text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-blue">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription>
            {isSignIn ? 'Sign in to your Nymuba Track account' : 'Create a new Nymuba Track account'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-[50%] transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="yourname@example.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-nymuba-primary hover:bg-nymuba-primary/90"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleWalletConnect}
          aria-label="Connect Wallet"
        >
          <Wallet size={16} />
          Connect Wallet
        </Button>
        
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="link" 
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-nymuba-primary"
          >
            {isSignIn ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
