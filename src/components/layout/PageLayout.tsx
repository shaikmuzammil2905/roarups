import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { SupabaseBanner } from '../common/SupabaseBanner';
import { WhatsAppWidget } from '../common/WhatsAppWidget';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-roar-gray-50 text-roar-navy overflow-x-hidden relative">
      <SupabaseBanner />
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex-1 pb-20 lg:pb-0"
      >
        {children}
      </motion.main>

      <WhatsAppWidget />
      <Footer />
      <BottomNav />
    </div>
  );
};
