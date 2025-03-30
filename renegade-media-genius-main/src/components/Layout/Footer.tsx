
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-renegade-dark border-t border-renegade-green/30 mt-auto light:bg-gray-50 light:border-renegade-green/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="font-bold text-2xl text-renegade-green neon-text">RENEGADE</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 light:text-gray-600">
              AI-powered social media manager built on the Internet Computer Protocol.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-renegade-green transition-colors light:text-gray-500" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-renegade-green transition-colors light:text-gray-500" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-renegade-green transition-colors light:text-gray-500" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-gray-400 hover:text-renegade-green transition-colors light:text-gray-500" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-renegade-green mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Pricing</Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Roadmap</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-renegade-green mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://internetcomputer.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">ICP</a>
              </li>
              <li>
                <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">OpenAI</a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Blog</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Documentation</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-renegade-green mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">About</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Careers</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-renegade-green transition-colors light:text-gray-600">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-renegade-green/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 light:text-gray-600 light:border-renegade-green/20">
          <p>© {new Date().getFullYear()} RENEGADE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-renegade-green transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-renegade-green transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-renegade-green transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
