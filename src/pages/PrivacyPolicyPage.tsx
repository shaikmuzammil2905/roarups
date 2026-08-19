import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700">
          <div className="flex items-center gap-3 border-b pb-4">
            <ShieldCheck className="w-8 h-8 text-roar-blue" />
            <div>
              <h1 className="text-3xl font-extrabold text-roar-navy">Privacy Policy</h1>
              <p className="text-xs text-slate-500">Effective Date: 2026 • ROARUPS Education</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-roar-navy pt-2">1. Information Collection</h2>
          <p className="text-sm leading-relaxed">
            ROARUPS collects personal information provided voluntarily by tutors, students, and parents during registration, contact inquiries, and review submissions. This includes names, mobile numbers, class/grade requirements, and location preferences in Hyderabad.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">2. Confidentiality & Aadhaar Protection</h2>
          <p className="text-sm leading-relaxed">
            Tutor identification documents (such as Aadhaar uploads) are treated with strict confidentiality. Aadhaar information is stored securely in private cloud storage with Row-Level Security (RLS) policies and is accessible only to authorized administrators for background verification. Aadhaar data is never displayed publicly or shared with third parties.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">3. Data Usage</h2>
          <p className="text-sm leading-relaxed">
            Collected data is strictly used to match students with qualified home tutors, manage tuition center enrollments, provide online session links, and communicate regarding educational services.
          </p>

          <h2 className="text-xl font-bold text-roar-navy pt-2">4. Contact Information</h2>
          <p className="text-sm leading-relaxed">
            For privacy requests or questions, please email <a href="mailto:roarupstuitions@gmail.com" className="text-roar-blue font-bold">roarupstuitions@gmail.com</a> or call 6309763394 / 9490988856.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};
