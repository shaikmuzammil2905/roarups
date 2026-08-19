import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Home Tuitions', path: '/services/home-tuitions' },
        { name: 'Tuition Center', path: '/services/tuition-center' },
        { name: 'Online Classes', path: '/services/online-classes' },
      ],
    },
    { name: 'Enquiry', path: '/register' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white py-3 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Large Prominent Logo for Mobile & Desktop */}
          <Link to="/" className="flex items-center gap-3 group py-1">
            <img
              src="/assets/roarups-logo.png"
              alt="ROARUPS Logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.hasDropdown && location.pathname.startsWith('/services'));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors ${
                        isActive
                          ? 'text-roar-blue bg-blue-50'
                          : 'text-roar-navy hover:text-roar-blue hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 w-56 pt-2 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                          {link.dropdownItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                location.pathname === sub.path
                                  ? 'text-roar-blue bg-blue-50/80'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-roar-blue'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-roar-blue bg-blue-50'
                      : 'text-roar-navy hover:text-roar-blue hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/register"
              className="bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-bold px-6 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-xl text-roar-navy hover:bg-slate-100 transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
