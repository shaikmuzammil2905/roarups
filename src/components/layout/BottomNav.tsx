import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCheck, BookOpen, UserPlus, PhoneCall } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: UserCheck },
    { name: 'Services', path: '/services', icon: BookOpen },
    { name: 'Register', path: '/register', icon: UserPlus },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-roar-blue text-white shadow-2xl border-t border-blue-600 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-roar-yellow font-bold scale-105' : 'text-blue-100 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] leading-none tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
