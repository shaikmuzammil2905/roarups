import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCheck, BookOpen, MessageSquare, PhoneCall } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home, isExternal: false },
    { name: 'About Us', path: '/about', icon: UserCheck, isExternal: false },
    { name: 'Services', path: '/services', icon: BookOpen, isExternal: false },
    {
      name: 'Enquiry',
      path: 'https://wa.me/916309763394',
      icon: MessageSquare,
      isExternal: true,
      isWhatsApp: true,
    },
    { name: 'Contact', path: '/contact', icon: PhoneCall, isExternal: false },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-roar-blue text-white shadow-2xl border-t border-blue-600 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            !item.isExternal &&
            (location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path)));

          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full h-full space-y-1 text-emerald-300 hover:text-white transition-colors"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-emerald-300" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="text-[11px] leading-none tracking-tight font-bold text-emerald-300">
                  {item.name}
                </span>
              </a>
            );
          }

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
