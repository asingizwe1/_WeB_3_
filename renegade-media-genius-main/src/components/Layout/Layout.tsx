
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  // Initialize theme based on stored preference or system preference
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("renegade-theme");
    
    if (savedTheme) {
      root.classList.add(savedTheme);
      if (savedTheme === "dark") {
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
      localStorage.setItem("renegade-theme", "dark");
    } else {
      root.classList.add("light");
      localStorage.setItem("renegade-theme", "light");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
