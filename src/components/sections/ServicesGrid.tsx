import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Laptop, ArrowRight } from 'lucide-react';
import { ServicesTypingStats } from './ServicesTypingStats';

export const ServicesGrid: React.FC = () => {
  const services = [
    {
      id: 'home-tuitions',
      title: 'Roar Home Tuitions',
      icon: Home,
      description:
        "Personalized one-to-one tutoring at your home, designed around the student's learning needs and academic goals.",
      path: '/services/home-tuitions',
      accentColor: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      id: 'tuition-center',
      title: 'Roar Tuition Center',
      icon: Users,
      description:
        'Structured classroom learning with focused batches, dedicated tutors and consistent academic support.',
      path: '/services/tuition-center',
      accentColor: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      id: 'online-classes',
      title: 'Online Classes',
      icon: Laptop,
      description:
        'Flexible online learning with experienced tutors, allowing students to learn from the comfort of home.',
      path: '/services/online-classes',
      accentColor: 'text-amber-500 bg-amber-50 border-amber-200',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight mb-3 relative inline-block">
            Our Services
            <span className="block h-1.5 w-24 bg-roar-yellow mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Choose the ideal learning format tailored to your child’s academic journey and schedule.
          </p>
        </div>

        {/* 3 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${service.accentColor} transition-transform group-hover:scale-110 group-hover:bg-roar-yellow group-hover:text-roar-navy`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-3 group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Button CTA */}
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-2 text-sm font-bold text-roar-blue hover:text-roar-blue-hover group-hover:translate-x-1 transition-all pt-4 border-t border-slate-100"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Typing Stats Bar below Our Services */}
        <ServicesTypingStats />
      </div>
    </section>
  );
};
