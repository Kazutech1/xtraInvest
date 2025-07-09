import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Map, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ toggleMenu, isMenuOpen }) => {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <header className="bg-white px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} className="w-50 h-20 object-contain" alt="Company Logo" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-slate-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Phone Number</p>
                <p className="font-semibold text-slate-800">+1 (432) 284‑8148</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">VIC 3000, USA</p>
                <p className="font-semibold text-slate-800">121 King St, California</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-700 p-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/about') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/services') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              to="/faq" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/faq') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Link 
              to="/" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/contact') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
             <Link 
              to="/auth" 
              className={`px-4 py-2 text-white transition-colors ${isActive('/faq') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              onClick={toggleMenu}
            >
              Log In
            </Link>
          </div>
        </div>
      )}

      {/* Navigation - Desktop */}
      <nav className="hidden md:block bg-slate-700">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link 
                to="/" 
                className={`px-4 md:px-6 py-4 text-white transition-colors ${isActive('/') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-4 md:px-6 py-4 text-white transition-colors ${isActive('/about') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`px-4 md:px-6 py-4 text-white transition-colors ${isActive('/services') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              >
                Services
              </Link>
              <Link 
                to="/faq" 
                className={`px-4 md:px-6 py-4 text-white transition-colors ${isActive('/faq') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 md:px-6 py-4 text-white transition-colors ${isActive('/contact') ? 'bg-slate-600' : 'hover:bg-slate-600'}`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;