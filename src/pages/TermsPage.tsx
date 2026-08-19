import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700">
          <div className="flex items-center gap-3 border-b pb-4">
            <FileText className="w-8 h-8 text-roar-yellow" />
            <div>
              <h1 className="text-3xl font-extrabold text-roar-navy">Terms & Conditions</h1>
              <p className="text-xs text-slate-500">Effective Date: 2026 • ROARUPS Education</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-roar-navy pt-2">1. Educational Services Scope</h2>
          <p className="text-sm leading-relaxed">
            ROARUPS provides educational platform services including Home Tuitions, Tuition Center learning, and Online Classes for students from LKG to Graduation across CBSE, ICSE, State, IB, and Cambridge curricula in Hyderabad.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">2. Registration & Code of Conduct</h2>
          <p className="text-sm leading-relaxed">
            Users registering as tutors, students, or parents agree to provide accurate and truthful academic information. Tutors are expected to maintain professional standards during home tuition visits and center classes.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">3. Review Moderation Policy</h2>
          <p className="text-sm leading-relaxed">
            All user-submitted reviews undergo administrative moderation prior to public publishing to maintain quality, authenticity, and prevent inappropriate content.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">4. Governing Law</h2>
          <p className="text-sm leading-relaxed">
            These terms are governed by the laws of India and applicable jurisdiction in Hyderabad, Telangana.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};
