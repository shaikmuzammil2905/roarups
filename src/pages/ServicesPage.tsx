import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { CurriculumBadges } from '../components/sections/CurriculumBadges';
import { BottomFeatureBar } from '../components/sections/BottomFeatureBar';

export const ServicesPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 text-center border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1 rounded-full bg-roar-blue/10 text-roar-blue font-bold text-xs uppercase tracking-wider mb-3">
            Academic Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight mb-4">
            Educational Services at ROARUPS
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            From one-on-one home tuitions to structured classroom batches and interactive online learning, we offer tailored education support for LKG to Graduation across Hyderabad.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <CurriculumBadges />
      <BottomFeatureBar />
    </PageLayout>
  );
};
