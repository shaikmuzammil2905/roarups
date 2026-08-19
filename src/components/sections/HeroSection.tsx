import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-gradient-to-b from-blue-50/40 via-white to-roar-gray-50 pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-roar-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-72 h-72 bg-roar-yellow/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Trust Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-roar-blue text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Award className="w-4 h-4 text-roar-yellow" />
              <span>Hyderabad’s Trusted Education Partner</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-roar-navy tracking-tight leading-[1.15]">
              <span className="text-roar-blue">Roar Home Tuitions</span> |{' '}
              <br className="hidden sm:inline" />
              Roar Tuition Center
            </h1>

            {/* Supporting Headline */}
            <p className="text-base sm:text-lg md:text-xl font-bold text-roar-blue tracking-normal">
              Personalized Learning | Stronger Foundations | Brighter Futures
            </p>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Providing quality tuition from <strong className="text-roar-navy font-bold">LKG to Graduation</strong>, supporting all CBSE, ICSE, State, IB Curriculum, Cambridge.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-3.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl shadow-lg shadow-roar-blue/25 hover:shadow-roar-blue/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-roar-blue border-2 border-roar-blue font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Register Now</span>
              </Link>
            </div>

            {/* Key Quick Highlights */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <GraduationCap className="w-7 h-7 text-roar-blue shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-roar-navy">Expert Tutors</h4>
                  <p className="text-[11px] text-slate-500">Qualified & experienced</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <BookOpen className="w-7 h-7 text-roar-yellow shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-roar-navy">Personalized</h4>
                  <p className="text-[11px] text-slate-500">1-on-1 focus</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-roar-navy">All Curricula</h4>
                  <p className="text-[11px] text-slate-500">CBSE, ICSE, State, IB</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic Visual with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.015, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
              }
              className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl flex justify-center"
            >
              {/* Outer Glow & Background Blob */}
              <div className="absolute inset-0 bg-roar-blue/15 rounded-full blur-3xl transform scale-105" />
              
              {/* Hero Image Card Frame matching Reference Design */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                }
                className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-5 border-4 border-white overflow-hidden w-full"
              >
                <img
                  src="/assets/student-hero.png"
                  alt="ROARUPS Students Studying"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Badge Accent */}
                <div className="absolute top-6 right-6 bg-roar-yellow text-roar-navy px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-white/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-roar-navy animate-ping"></span>
                  <span>5+ Yrs Excellence</span>
                </div>

                <div className="absolute bottom-6 left-6 bg-roar-navy/90 backdrop-blur-md text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl border border-white/20">
                  <span>📍 Hyderabad (JNTU Area)</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
