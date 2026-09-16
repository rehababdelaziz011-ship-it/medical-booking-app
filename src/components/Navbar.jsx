import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Calendar, User, Moon, Sun, Menu, X, Heart } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export default function Navbar() {
  const { darkMode, toggleDarkMode, favorites } = useAppStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Doctors', path: '/' },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#0d2224]/80 border-[#1c4749] text-white' 
        : 'bg-white/80 border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 border border-teal-500/20 group-hover:scale-105 transition">
            <Stethoscope size={22} />
          </div>
          <div>
            <span className="font-serif font-bold text-lg tracking-tight block leading-none">Medicare</span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 tracking-widest uppercase font-semibold">Clinic Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                isActive(link.path)
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-[#16383a]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions (Dark mode toggle & Mobile Hamburger Button) */}
        <div className="flex items-center gap-3">
          {/* Favorite Counter Badge (Bonus feature) */}
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
            darkMode ? 'bg-[#16383a] border-[#23585a] text-teal-300' : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>{favorites.length} Saved</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-xl border transition ${
              darkMode 
                ? 'bg-[#16383a] border-[#23585a] text-teal-300 hover:text-white' 
                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border transition ${
              darkMode ? 'bg-[#16383a] border-[#23585a] text-teal-300' : 'bg-gray-100 border-gray-200 text-gray-700'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-6 space-y-3 transition-all animate-fade-in ${
          darkMode ? 'bg-[#102b2d] border-[#1c4749]' : 'bg-white border-gray-200 shadow-lg'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)} 
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive(link.path)
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold'
                  : darkMode ? 'text-gray-300 hover:bg-[#16383a]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-gray-100 dark:border-[#1c4749] flex items-center justify-between px-2 text-xs text-gray-400">
            <span>Saved Favorites: {favorites.length}</span>
            <span>Medicare Clinic © 2026</span>
          </div>
        </div>
      )}
    </header>
  );
}