import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Users, ShieldCheck, Monitor, GraduationCap, BookOpen } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: UserCheck,
      title: 'Personalized Attention',
      description: "Learning support based on each student's academic requirements.",
    },
    {
      icon: Users,
      title: 'Focused Batch Environment',
      description: 'Smaller learning groups to encourage interaction and participation.',
    },
    {
      icon: ShieldCheck,
      title: 'Dedicated Tutors',
      description: 'Professional tutors focused on helping students understand concepts.',
    },
    {
      icon: Monitor,
      title: 'Online + Offline',
      description: 'Students can learn according to their convenience.',
    },
    {
      icon: GraduationCap,
      title: 'LKG to Graduation',
      description: 'One platform for different stages of education.',
    },
    {
      icon: BookOpen,
      title: 'Curriculum Support',
      description: 'Support across CBSE, ICSE, State, IB and Cambridge curricula.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight mb-3">
            Why Choose RoarUps
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Empowering students with structured guidance, individual clarity, and proven teaching methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-400 hover:bg-amber-50/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100/90 text-amber-600 border border-amber-200 flex items-center justify-center mb-5 group-hover:bg-roar-yellow group-hover:text-roar-navy transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-roar-navy mb-2 group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
