import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { Eye, Target, HeartHandshake, Home, Users, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      {/* About Header */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-roar-blue/10 text-roar-blue font-bold text-xs uppercase tracking-wider mb-4">
            Our Story & Values
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-500 tracking-tight mb-6">
            About RoarUps
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
            RoarUps is an education platform dedicated to providing personalized and structured academic support for students from LKG to Graduation. We bring together quality teaching, individual attention and a focused learning environment to help students understand concepts, improve their academic performance and grow with confidence.
          </p>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
            We support students across CBSE, ICSE, State, Cambridge and IB curriculum, offering tuition for a wide range of subjects through both online and offline learning.
          </p>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            At RoarUps, we believe that every student learns differently. Our approach focuses not only on completing the syllabus, but on making sure students understand, practice and apply what they learn.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50/60 p-8 rounded-3xl border border-blue-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-roar-blue text-white flex items-center justify-center mb-6 shadow-md">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-amber-500 mb-4">Our Vision</h2>
                <p className="text-slate-700 text-base leading-relaxed">
                  "To create a learning environment where every student gets the right guidance, the right support and the confidence to achieve their potential."
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50/60 p-8 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-roar-yellow text-roar-navy flex items-center justify-center mb-6 shadow-md">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-amber-500 mb-4">Our Mission</h2>
                <p className="text-slate-700 text-base leading-relaxed">
                  "Our goal is to understand the student, strengthen the concepts and help them move forward with confidence."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Started RoarUps */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-card">
            <div className="max-w-3xl">
              <div className="w-12 h-12 rounded-xl bg-roar-blue/10 text-roar-blue flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-amber-500 mb-6">
                Why We Started RoarUps
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                We started RoarUps with the belief that students deserve more than simply attending classes and completing their syllabus. They need an environment where they can ask questions, receive individual attention, understand difficult concepts and learn at a pace that works for them.
              </p>
              <div className="p-6 rounded-2xl bg-blue-50 border-l-4 border-roar-blue text-roar-navy font-bold text-base sm:text-lg leading-relaxed">
                "RoarUps was created with a simple purpose: To help students learn with understanding, grow with confidence and achieve their goals."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Learning Experiences */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-amber-500 mb-3">
              Two Tailored Learning Experiences
            </h2>
            <p className="text-slate-600 text-base">
              Whether you prefer one-on-one attention at home or interactive batch learning at our center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-roar-blue text-white flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-roar-navy mb-3">Roar Home Tuitions</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  For students and parents looking for a more personalized learning experience, Roar Home Tuitions focuses on convenient and student-oriented tuition support.
                </p>
              </div>
              <Link
                to="/services/home-tuitions"
                className="inline-flex items-center gap-2 font-bold text-roar-blue hover:text-roar-blue-hover"
              >
                <span>Explore Home Tuitions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-roar-yellow text-roar-navy flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-roar-navy mb-3">Roar Tuition Center</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Roar Tuition Center provides a structured classroom learning environment where students can learn with dedicated tutors, focused batches and consistent academic support.
                </p>
              </div>
              <Link
                to="/services/tuition-center"
                className="inline-flex items-center gap-2 font-bold text-roar-blue hover:text-roar-blue-hover"
              >
                <span>Explore Tuition Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
