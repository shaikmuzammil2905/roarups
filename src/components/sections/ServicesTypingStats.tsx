import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, GraduationCap, Sparkles, Award } from 'lucide-react';

interface TypingStatItemProps {
  icon: React.ElementType;
  numberTarget: number;
  suffix: string;
  label: string;
  typingPhrases: string[];
  gradientClass: string;
  badgeText: string;
}

const TypingStatCard: React.FC<TypingStatItemProps> = ({
  icon: Icon,
  numberTarget,
  suffix,
  label,
  typingPhrases,
  gradientClass,
  badgeText,
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Counter Animation
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / numberTarget));
    
    const timer = setInterval(() => {
      start += Math.ceil(numberTarget / 40);
      if (start >= numberTarget) {
        setCurrentCount(numberTarget);
        clearInterval(timer);
      } else {
        setCurrentCount(start);
      }
    }, Math.max(stepTime, 30));

    return () => clearInterval(timer);
  }, [numberTarget]);

  // Typewriter Text Effect
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, typingPhrases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl ${gradientClass} text-white flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Background Subtle Glow & Pattern */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div>
        {/* Top Header Badge & Icon */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-roar-yellow" />
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-roar-yellow uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-roar-yellow animate-spin" style={{ animationDuration: '4s' }} />
            {badgeText}
          </span>
        </div>

        {/* Big Number Display */}
        <div className="mb-2 flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-md">
            {currentCount}
          </span>
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-roar-yellow">
            {suffix}
          </span>
        </div>

        {/* Primary Stat Label */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide mb-3">
          {label}
        </h3>
      </div>

      {/* Dynamic Typewriter Box */}
      <div className="mt-4 pt-4 border-t border-white/15">
        <div className="bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-2 min-h-[52px]">
          <p className="text-xs sm:text-sm font-medium text-slate-100 font-mono leading-tight">
            {displayedText}
            <span className="inline-block w-2 h-4 ml-1 bg-roar-yellow animate-pulse" />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesTypingStats: React.FC = () => {
  return (
    <div className="mt-14 sm:mt-16">
      {/* Mobile-friendly Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 px-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-roar-navy font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          Proven Excellence
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-roar-navy tracking-tight">
          Empowering Education Across Hyderabad
        </h3>
      </div>

      {/* 2 Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {/* Stat 1: 1000+ Tutors */}
        <TypingStatCard
          icon={UserCheck}
          numberTarget={1000}
          suffix="+"
          label="Qualified Tutors"
          badgeText="Verified Faculty"
          gradientClass="bg-gradient-to-br from-slate-900 via-roar-navy to-slate-800"
          typingPhrases={[
            '1000+ Experienced & Background-Checked Tutors',
            'Covering CBSE, ICSE, IB, Cambridge & State Board',
            'Dedicated Home & Online Tutors in Hyderabad'
          ]}
        />

        {/* Stat 2: 500+ Successful Tuitions */}
        <TypingStatCard
          icon={GraduationCap}
          numberTarget={500}
          suffix="+"
          label="Successful Tuitions"
          badgeText="Proven Results"
          gradientClass="bg-gradient-to-br from-amber-600 via-roar-navy to-slate-900"
          typingPhrases={[
            '500+ Successful Tuitions Delivered across Hyderabad',
            '100% Individual Focus & Custom Study Plans',
            'High Marks in Board & Intermediate Exams'
          ]}
        />
      </div>
    </div>
  );
};
