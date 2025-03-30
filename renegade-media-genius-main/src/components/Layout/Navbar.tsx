
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-renegade-dark/95 backdrop-blur-md border-b border-renegade-green/30 z-50 light:bg-white/95 light:border-renegade-green/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-renegade-green neon-text">RENEGADE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-renegade-green transition-colors font-medium">
            Home
          </Link>
          <Link to="/features" className="text-foreground hover:text-renegade-green transition-colors font-medium">
            Features
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-foreground hover:text-renegade-green transition-colors font-medium">
              Dashboard
            </Link>
          )}
          <Link to="/about" className="text-foreground hover:text-renegade-green transition-colors font-medium">
            About
          </Link>
          
          {/* Add Theme Toggle */}
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border border-renegade-green/50">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-renegade-green/20 text-renegade-green">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="outline" className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-renegade-green text-black hover:bg-renegade-green/80 font-medium">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground hover:bg-background"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link to="/" className="p-2 hover:bg-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/features" className="p-2 hover:bg-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="p-2 hover:bg-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link to="/about" className="p-2 hover:bg-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="border-renegade-green/50 text-renegade-green"
              >
                Log out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-renegade-green/50 text-renegade-green">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-renegade-green text-black font-medium">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
