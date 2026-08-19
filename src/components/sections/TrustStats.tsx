import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, BookOpen, Monitor } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '5+',
      label: 'Years of Experience',
      desc: 'Trusted tuition guidance in Hyderabad',
    },
    {
      icon: GraduationCap,
      value: 'LKG – Grad',
      label: 'Academic Support',
      desc: 'All grades & major subjects covered',
    },
    {
      icon: BookOpen,
      value: '5',
      label: 'Curriculum Options',
      desc: 'CBSE, ICSE, State, IB, Cambridge',
    },
    {
      icon: Monitor,
      value: 'Online + Offline',
      label: 'Flexible Learning',
      desc: 'Home tuition, center & online sessions',
    },
  ];

  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 text-center hover:border-roar-blue/30 hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-100/90 text-amber-600 border border-amber-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-roar-yellow group-hover:text-roar-navy transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-500 tracking-tight mb-1">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-roar-navy mb-1">{stat.label}</h4>
                <p className="text-xs text-slate-500">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
