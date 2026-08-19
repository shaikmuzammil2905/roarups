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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          {curricula.map((curr, idx) => {
            const isLastOnMobile = idx === 4;
            return (
              <motion.div
                key={curr.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`flex flex-col justify-between items-center text-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 hover:border-roar-yellow/50 transition-all duration-300 group shadow-md min-h-[170px] ${
                  isLastOnMobile ? 'col-span-2 md:col-span-1 max-w-sm justify-self-center w-full' : 'w-full'
                }`}
              >
                {/* Badge Tag */}
                <div className="mb-2">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-roar-yellow text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {curr.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-roar-yellow transition-colors mb-2 tracking-wide leading-tight break-words">
                  {curr.name}
                </h3>

                {/* Full Description */}
                <p className="text-slate-300 text-[11px] sm:text-xs leading-snug font-medium max-w-[200px]">
                  {curr.fullName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
