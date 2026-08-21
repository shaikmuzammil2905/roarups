import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Clock, Target, Quote, Sparkles } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-hidden border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Title for Mobile & Desktop */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-roar-navy font-bold text-xs uppercase tracking-wider mb-3 shadow-sm border border-amber-200/70">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Leadership & Vision
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-500 tracking-tight">
              Meet Our Founder & Director
            </h2>
            <div className="h-1.5 w-24 bg-roar-yellow mx-auto mt-3 rounded-full" />
          </motion.div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Column - High Prominence with Full Box Fit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 w-full flex flex-col"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 ring-1 ring-slate-200/80">
              {/* Image Frame with Full Box Fit */}
              <div className="w-full aspect-[4/3] xs:aspect-[5/4] sm:aspect-[4/3] lg:aspect-[4/5] min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] relative overflow-hidden bg-slate-900">
                <img
                  src="/assets/founder.jpg"
                  alt="A. Jagadeesh Kumar - Founder & Director, RoarUps"
                  className="w-full h-full object-cover object-top sm:object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-roar-navy/90 via-roar-navy/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating Overlay Badge on Founder Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg sm:text-xl text-white tracking-wide">
                      A. Jagadeesh Kumar
                    </h3>
                    <p className="text-xs sm:text-sm text-roar-yellow font-bold mt-0.5">
                      Founder & Director – RoarUps
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 text-xs font-bold text-amber-300 border border-white/20">
                    <Award className="w-4 h-4 text-roar-yellow" />
                    <span>Founder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Credential Chips below Image */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-roar-blue flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Qualification</p>
                  <p className="text-xs font-extrabold text-slate-800">M.Sc. Chemistry</p>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Experience</p>
                  <p className="text-xs font-extrabold text-slate-800">5+ Years in Tuitions</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Founder Profile Title */}
            <div>
              <div className="inline-block px-3 py-1 rounded-lg bg-roar-blue/10 text-roar-blue font-bold text-xs uppercase tracking-wider mb-2">
                Educational Leader & Mentor
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-roar-navy tracking-tight">
                A. Jagadeesh Kumar
              </h3>
              <p className="text-base sm:text-lg font-bold text-amber-600 mt-1">
                Founder & Director – RoarUps
              </p>
            </div>

            {/* Biography Paragraphs */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                With an <strong className="text-slate-900 font-bold">M.Sc. in Organic Chemistry</strong> and{' '}
                <strong className="text-slate-900 font-bold">over 5 years of experience</strong> in the education and home tuition sector, Jagadeesh Kumar founded RoarUps with a vision to provide students with personalized, structured, and quality academic support.
              </p>
              <p>
                Over the years, his experience working closely with students has provided valuable insight into the different learning styles, academic challenges, and individual needs of students. This understanding became the foundation for creating RoarUps — an education platform focused on personalized learning and stronger academic foundations.
              </p>
              <p>
                At RoarUps, the goal is to create a learning environment where every student receives the right guidance, individual attention, and continuous support to achieve their academic goals.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-white p-5 sm:p-6 rounded-2xl border-l-4 border-amber-500 border-t border-r border-b border-amber-200/60 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                    Our Vision
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                    To empower every student with the right guidance, knowledge, confidence, and learning environment to reach their full potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder's Message Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
              <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-white/5 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-roar-yellow" />
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-roar-yellow">
                    Founder’s Message
                  </h4>
                </div>

                <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed mb-4">
                  “Every student has the potential to succeed. With the right guidance, personalized attention, and consistent support, we can help every learner move forward with confidence.”
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base font-black text-white">
                      — A. Jagadeesh Kumar
                    </p>
                    <p className="text-xs text-slate-400 font-semibold">
                      Founder & Director, RoarUps
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-roar-yellow/20 text-roar-yellow flex items-center justify-center font-bold text-xs">
                    JK
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
