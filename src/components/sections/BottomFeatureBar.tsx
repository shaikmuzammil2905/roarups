import React from 'react';
import { GraduationCap, BookOpenCheck, Globe, ShieldCheck } from 'lucide-react';

export const BottomFeatureBar: React.FC = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'LKG to Graduation',
      subtitle: 'All Academic Levels',
    },
    {
      icon: BookOpenCheck,
      title: 'All Major Curriculums',
      subtitle: 'CBSE, ICSE, State, IB, Cambridge',
    },
    {
      icon: Globe,
      title: 'Online & Offline',
      subtitle: 'Flexible Learning Options',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted by Parents',
      subtitle: 'Student Success Our Goal',
    },
  ];

  return (
    <section className="bg-roar-blue text-white py-8 border-t border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="flex items-center gap-3.5 p-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Icon className="w-6 h-6 text-roar-yellow" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">{feat.title}</h4>
                  <p className="text-xs text-blue-100 font-medium">{feat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
