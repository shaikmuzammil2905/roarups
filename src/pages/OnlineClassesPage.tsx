import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Laptop, Video, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const OnlineClassesPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <Laptop className="w-4 h-4 text-sky-600" />
                <span>Interactive Live Learning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight leading-tight">
                Online Live Classes
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Flexible online learning with experienced tutors, allowing students to learn interactively from the comfort of home.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Register for Online Classes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-roar-navy border-b pb-3">Online Class Highlights</h3>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Video className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Live 1-on-1 and small group interactive video sessions</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Flexible scheduling to fit school & extra-curricular hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Digital notes, recorded sessions, and practice worksheets</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
