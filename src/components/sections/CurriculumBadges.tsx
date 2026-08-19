import React from 'react';
import { motion } from 'framer-motion';

export const CurriculumBadges: React.FC = () => {
  const curricula = [
    { name: 'CBSE', fullName: 'Central Board of Secondary Education', badge: 'National' },
    { name: 'ICSE', fullName: 'Indian Certificate of Secondary Education', badge: 'National' },
    { name: 'STATE', fullName: 'Telangana State Board Curriculum', badge: 'State' },
    { name: 'IB', fullName: 'International Baccalaureate', badge: 'International' },
    { name: 'CAMBRIDGE', fullName: 'Cambridge Assessment International Education', badge: 'Global' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-roar-navy via-slate-900 to-roar-navy text-white relative overflow-hidden">
      {/* Decorative Blur Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-roar-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-roar-yellow text-roar-navy font-extrabold text-xs tracking-wider uppercase mb-3">
            LKG to Graduation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Curricula We Support
          </h2>
          <p className="text-slate-300 text-base">
            Expert academic coaching designed for all major education boards and academic levels across Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {curricula.map((curr, idx) => (
            <motion.div
              key={curr.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center hover:bg-white/20 hover:border-roar-yellow/50 transition-all duration-300 group"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-roar-yellow text-[10px] font-bold uppercase tracking-wider mb-2">
                {curr.badge}
              </span>
              <h3 className="text-2xl font-black text-white group-hover:text-roar-yellow transition-colors mb-1">
                {curr.name}
              </h3>
              <p className="text-slate-300 text-[11px] leading-tight">
                {curr.fullName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
