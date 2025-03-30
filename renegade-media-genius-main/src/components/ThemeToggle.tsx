
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  // Check if user has a preference stored in localStorage
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check for saved theme or use system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("renegade-theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Effect to update theme on component mount and when isDarkTheme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkTheme) {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("renegade-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("renegade-theme", "light");
    }
  }, [isDarkTheme]);

  return (
    <div className="flex items-center gap-2">
      <Sun 
        size={18} 
        className={`${!isDarkTheme ? "text-renegade-green" : "text-muted-foreground"} transition-colors`}
      />
      <Switch
        checked={isDarkTheme}
        onCheckedChange={setIsDarkTheme}
        aria-label="Toggle dark mode"
        className="transition-all duration-300"
      />
      <Moon 
        size={18} 
        className={`${isDarkTheme ? "text-renegade-green" : "text-muted-foreground"} transition-colors`}
      />
    </div>
  );
};

export default ThemeToggle;
