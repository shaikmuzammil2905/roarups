import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Users, BookOpen, Target, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

export const TuitionCenterPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50/70 via-white to-slate-50 py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-roar-navy text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4 text-roar-yellow" />
                <span>Structured Batch Learning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight leading-tight">
                Roar Tuition Center
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Structured classroom learning with focused batches, dedicated tutors and consistent academic support in Vasanth Nagar, JNTU, Hyderabad.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-extrabold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Enroll in Tuition Center</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-roar-navy border-b pb-3">Center Details</h3>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-roar-yellow shrink-0 mt-0.5" />
                <span>Road No. 5, IDPL Colony, Vasanth Nagar, Near JNTU, Hyderabad</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Users className="w-5 h-5 text-roar-yellow shrink-0" />
                <span>Small batch size for high teacher interaction</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <BookOpen className="w-5 h-5 text-roar-yellow shrink-0" />
                <span>Regular tests, performance tracking & parent feedback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold text-amber-500 text-center">
            Center Classroom Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <Users className="w-8 h-8 text-roar-blue" />
              <h3 className="text-lg font-bold text-roar-navy">Focused Small Batches</h3>
              <p className="text-sm text-slate-600">
                Limited students per class ensuring every child gets noticed, called upon, and supported.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <Target className="w-8 h-8 text-roar-yellow" />
              <h3 className="text-lg font-bold text-roar-navy">Structured Curriculum</h3>
              <p className="text-sm text-slate-600">
                Timely syllabus coverage, regular revision sessions, and chapter-wise mock examinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <h3 className="text-lg font-bold text-roar-navy">Dedicated Subject Specialists</h3>
              <p className="text-sm text-slate-600">
                Experienced faculties dedicated to Mathematics, Science, English, and specialized subjects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
