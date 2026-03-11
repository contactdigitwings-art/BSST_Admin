import { useState } from 'react';
import { Link, useLocation } from 'wouter';;
import { Menu, X, Heart, UserPlus } from 'lucide-react'; // Added UserPlus
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onDonateClick: () => void;
}

export default function Header({ onDonateClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [, navigate] = useLocation();

  const handleDonateNavigation = () => {
    setMobileMenuOpen(false);
    navigate('/donate');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Audit Report', path: '/audit' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* LOGO & BRAND SECTION */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0056b3] to-[#28a745] rounded-full blur-sm opacity-30 group-hover:opacity-40 transition-opacity" />
              <img 
                src="/bhartilogo.jpg" 
                alt="Bharti Sewa Sadan Trust Logo" 
                className="relative w-full h-full object-contain rounded-full border border-gray-100 bg-white shadow-sm p-1"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Bharti Sewa Sadan Trust
              </h1>
              <p className="text-[10px] md:text-xs text-gray-600 font-medium">
                Established 2014 | NGO ID: BR/2017/0161719
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive(link.path)
                    ? 'text-[#0056b3]'
                    : 'text-gray-700 hover:text-[#0056b3]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0056b3]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA SECTION - ADDED MEMBER APPLY HERE */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/apply"
              className="flex items-center space-x-2 border-2 border-[#0056b3] text-[#0056b3] px-5 py-2 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
            >
              <UserPlus size={16} />
              <span>Member Apply</span>
            </Link>

            <button
              onClick={handleDonateNavigation}
              className="flex items-center space-x-2 btn-primary-gradient text-white px-6 py-2.5 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
            >
              <Heart size={18} fill="white" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-[#0056b3] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {/* Mobile Member Apply */}
                <Link href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-3 border-2 border-[#0056b3] text-[#0056b3] px-6 py-4 rounded-2xl font-bold"
                >
                  <UserPlus size={20} />
                  <span>Member Apply</span>
                </Link>

                {/* Mobile Donate Now */}
                <button
                  onClick={handleDonateNavigation}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#0056b3] to-[#28a745] text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200"
                >
                  <Heart size={20} fill="white" />
                  <span>Donate Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}