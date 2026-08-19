import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Home, CheckCircle2, UserCheck, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const HomeTuitionsPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Service Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-roar-blue text-xs font-bold uppercase tracking-wider">
                <Home className="w-4 h-4" />
                <span>1-on-1 Personalized Learning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight leading-tight">
                Roar Home Tuitions
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Personalized one-to-one tutoring at your home, designed around the student's learning needs, pace, and academic goals in Hyderabad.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl shadow-lg shadow-roar-blue/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Home Tuition Tutors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-roar-navy border-b pb-3">Quick Overview</h3>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Mode:</strong> Verified tutor visits student home in Hyderabad</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Grades Covered:</strong> LKG, UKG, Class 1–10, Intermediate (11 & 12), Graduation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Curricula:</strong> CBSE, ICSE, Telangana State Board, IB, Cambridge</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Timings:</strong> Flexible evening slots (6:00 PM – 8:30 PM)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Key Benefits */}
          <div>
            <h2 className="text-3xl font-extrabold text-amber-500 mb-8 text-center">
              Key Benefits of Roar Home Tuitions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <UserCheck className="w-8 h-8 text-roar-blue" />
                <h3 className="text-lg font-bold text-roar-navy">100% Individual Attention</h3>
                <p className="text-sm text-slate-600">
                  Tutor focuses exclusively on your child, clarifying doubts instantly without classroom distractions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <Clock className="w-8 h-8 text-roar-yellow" />
                <h3 className="text-lg font-bold text-roar-navy">Convenient Home Comfort</h3>
                <p className="text-sm text-slate-600">
                  Save travel time and energy. Students learn in the safe, comfortable environment of home.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <h3 className="text-lg font-bold text-roar-navy">Custom Study Speed</h3>
                <p className="text-sm text-slate-600">
                  Lessons move at the student’s pace, focusing deeply on weak subjects or challenging topics.
                </p>
              </div>
            </div>
          </div>

          {/* Suitable For */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold text-roar-navy mb-4">Who Is It Suitable For?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-roar-blue" />
                <span>Students needing specialized 1-on-1 concept reinforcement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-roar-blue" />
                <span>Parents seeking convenient home study supervision</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-roar-blue" />
                <span>Board exam candidates (10th / 12th) aiming for top ranks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-roar-blue" />
                <span>Degree & Engineering college students needing subject help</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
