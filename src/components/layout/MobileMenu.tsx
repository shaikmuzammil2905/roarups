import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, MessageSquare } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Home Tuitions', path: '/services/home-tuitions', isSub: true },
    { name: 'Tuition Center', path: '/services/tuition-center', isSub: true },
    { name: 'Online Classes', path: '/services/online-classes', isSub: true },
    { name: 'Enquiry', path: '/register' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-roar-navy/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header with Horizontal Brand Logo */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <img
                src="/assets/roarups-horizontal-logo.png"
                alt="ROARUPS"
                className="h-10 w-auto max-w-[180px] object-contain"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold transition-colors ${
                      link.isSub ? 'pl-8 text-sm text-slate-600' : ''
                    } ${
                      isActive
                        ? 'bg-roar-blue/10 text-roar-blue'
                        : 'text-roar-navy hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {!link.isSub && <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </Link>
                );
              })}
            </div>

            {/* Quick Action Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
              <Link
                to="/register"
                onClick={onClose}
                className="block text-center w-full py-3 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-bold rounded-xl shadow-md transition-colors"
              >
                Get Started / Enquiry
              </Link>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:6309763394"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white rounded-lg border border-slate-200 text-roar-navy font-semibold hover:border-roar-blue"
                >
                  <Phone className="w-3.5 h-3.5 text-roar-blue" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/916309763394"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-100"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
