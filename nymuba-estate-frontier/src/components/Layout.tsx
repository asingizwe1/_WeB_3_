
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (either by wallet or email)
    const checkAuth = () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const userEmail = localStorage.getItem('userEmail');
      const isAuth = !!walletAddress || !!userEmail;
      setIsAuthenticated(isAuth);
      
      // If not authenticated, redirect to welcome page
      if (!isAuth) {
        navigate('/');
      }
    };

    checkAuth();
    // Listen for storage changes in case user logs in/out in another tab
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate]);

  // While checking authentication status
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Redirect to welcome page if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/" />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background bg-nymuba-grid">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-4 md:p-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
          <footer className="p-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Nymuba Track. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
