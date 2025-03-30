
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-5">
        <h1 className="text-7xl font-bold text-renegade-green neon-text mb-4">404</h1>
        <p className="text-xl mb-8">The page you're looking for doesn't exist in this blockchain.</p>
        <div className="cyber-card p-8 max-w-md mx-auto border-renegade-green/50">
          <p className="text-lg mb-6">Return to the main network and try again.</p>
          <Link to="/">
            <Button className="bg-renegade-green hover:bg-renegade-green/80 text-black">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
