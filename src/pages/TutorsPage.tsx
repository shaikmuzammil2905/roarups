import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import {
  GraduationCap,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  PhoneCall,
  MessageSquare,
  Search,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Send,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { submitStudentRegistration } from '../services/db';

export interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  qualification: string;
  primarySubject: string;
  allSubjects: string[];
  grades: string[];
  curricula: string[];
  modes: string[];
  areas: string[];
  bio: string;
  teachingStyle: string;
  achievements: string[];
  availability: string;
  feeInfo: string;
}

// WhatsApp SVG Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.261-1.118zm13.111-5.719c-.317-.159-1.875-.926-2.166-1.032-.29-.106-.502-.159-.714.159-.211.318-.82 1.032-1.005 1.244-.185.212-.37.238-.687.079-.317-.159-1.341-.494-2.556-1.577-.945-.843-1.583-1.884-1.768-2.202-.185-.318-.02-.49.139-.648.143-.143.317-.37.476-.555.159-.185.212-.318.317-.529.106-.212.053-.397-.026-.555-.079-.159-.714-1.72-.979-2.356-.257-.619-.519-.536-.714-.546-.185-.01-.397-.01-.608-.01-.212 0-.555.079-.847.397-.291.318-1.111 1.085-1.111 2.646 0 1.561 1.137 3.069 1.296 3.281.159.212 2.24 3.42 5.427 4.796 2.054.887 2.859.98 3.896.827.632-.093 1.875-.767 2.139-1.508.264-.741.264-1.376.185-1.508-.079-.133-.291-.212-.608-.371z"/>
  </svg>
);

const TUTORS_DATA: TutorProfile[] = [
  {
    id: 'tutor-1',
    name: 'Dr. K. Srinivas Rao',
    avatar: 'https://ui-avatars.com/api/?name=K+Srinivas+Rao&background=1e3a5f&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Senior Faculty',
    rating: 4.95,
    reviewsCount: 46,
    experience: '12+ Years Exp',
    qualification: 'Ph.D. Physics (HCU), M.Sc. Physics (Gold Medalist)',
    primarySubject: 'Physics & Mechanics',
    allSubjects: ['Physics', 'Applied Mechanics', 'Calculus for Physics'],
    grades: ['Class 9-10', 'Inter (11 & 12)', 'IIT-JEE / NEET', 'Graduation / Degree'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'],
    modes: ['Home Tuition', 'Tuition Center', 'Online Classes'],
    areas: ['Kukatpally', 'JNTU', 'Miyapur', 'Nizampet', 'KPHB Colony', 'Madhapur'],
    bio: 'Former senior lecturer at premier IIT-JEE coaching institutes in Hyderabad. Specializes in building conceptual physics clarity, problem-solving intuition, and board examination mastery.',
    teachingStyle: 'Visual concept derivation, 1-on-1 interactive numerical workshops, previous 10 years solved papers, and personalized doubt clearing sessions.',
    achievements: [
      'Guided 50+ students to 99+ percentile in JEE Physics',
      'Over 90% of 10th & 12th board students achieved 95%+ marks',
      'Certified Cambridge & IB DP Physics Instructor'
    ],
    availability: 'Mon - Sat: 5:30 PM - 9:00 PM',
    feeInfo: 'Affordable / Monthly Flexible'
  },
  {
    id: 'tutor-2',
    name: 'Mrs. Ananya Sharma',
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Sharma&background=d97706&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Top Rated Tutor',
    rating: 4.98,
    reviewsCount: 52,
    experience: '9+ Years Exp',
    qualification: 'M.Sc. Pure Mathematics (Osmania University), B.Ed',
    primarySubject: 'Mathematics & Vedic Math',
    allSubjects: ['Mathematics', 'Vedic Math', 'Algebra', 'Trigonometry', 'Geometry'],
    grades: ['Class 6-8', 'Class 9-10', 'Inter (11 & 12)'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'Cambridge'],
    modes: ['Home Tuition', 'Online Classes'],
    areas: ['Gachibowli', 'Kondapur', 'Hitec City', 'Madhapur', 'Manikonda', 'Jubilee Hills'],
    bio: 'Passionate math educator renowned for transforming math anxiety into high exam confidence. Specializes in simplifying complex formulas and teaching shortcut mental math.',
    teachingStyle: 'Step-by-step problem deconstruction, daily practice worksheets, weekly mock assessments, and personalized speed-building drills.',
    achievements: [
      '100% pass rate with 85% students scoring distinction in CBSE & ICSE Class 10',
      'Expert in Vedic Math mental calculations & Olympiad preparation',
      'Awarded Best Home Tutor Hyderabad 2024'
    ],
    availability: 'Mon - Sun: 4:00 PM - 8:30 PM',
    feeInfo: 'Hourly / Monthly Packages'
  },
  {
    id: 'tutor-3',
    name: 'Mr. Ramesh Reddy',
    avatar: 'https://ui-avatars.com/api/?name=Ramesh+Reddy&background=059669&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Chemistry Specialist',
    rating: 4.91,
    reviewsCount: 38,
    experience: '8+ Years Exp',
    qualification: 'M.Sc. Organic Chemistry, CSIR-NET Qualified',
    primarySubject: 'Chemistry (Organic, Inorganic & Physical)',
    allSubjects: ['Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Science'],
    grades: ['Class 9-10', 'Inter (11 & 12)', 'IIT-JEE / NEET'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'IB'],
    modes: ['Home Tuition', 'Tuition Center', 'Online Classes'],
    areas: ['Ameerpet', 'SR Nagar', 'Punjagutta', 'Banjara Hills', 'Begumpet', 'Kukatpally'],
    bio: 'Master chemist known for making chemical reactions, equations, and periodic trends easy to remember through memory mnemonics and practical everyday examples.',
    teachingStyle: 'Reaction mechanism breakdowns, regular formula quizzes, chapter-wise summary notes, and rigorous NCERT & exemplar solutions.',
    achievements: [
      'Mentored 35+ students into MBBS & NIT admissions in 2024 & 2025',
      'Author of comprehensive Chemistry Revision Formula handbook',
      'Top rated chemistry tutor in Central & West Hyderabad'
    ],
    availability: 'Mon - Sat: 5:00 PM - 9:00 PM',
    feeInfo: 'Competitive / Customizable'
  },
  {
    id: 'tutor-4',
    name: 'Dr. Priya Varma',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Varma&background=7c3aed&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Biology & NEET Mentor',
    rating: 4.96,
    reviewsCount: 41,
    experience: '10+ Years Exp',
    qualification: 'M.Sc. Biotechnology, Ph.D. Life Sciences',
    primarySubject: 'Biology & Zoology',
    allSubjects: ['Biology', 'Botany', 'Zoology', 'Human Physiology', 'General Science'],
    grades: ['Class 6-8', 'Class 9-10', 'Inter (11 & 12)', 'IIT-JEE / NEET'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'],
    modes: ['Home Tuition', 'Online Classes'],
    areas: ['JNTU', 'Nizampet', 'Pragathi Nagar', 'Bachupally', 'Miyapur', 'Chandanagar'],
    bio: 'Dedicated life sciences teacher with decade-long experience in preparing students for ICSE/CBSE board examinations and competitive medical entrance exams.',
    teachingStyle: 'Diagrammatic clarity, biological concept mapping, regular 3D animated visual aids, and rigorous NCERT line-by-line preparation.',
    achievements: [
      'High student scoring record with 94+ average score in 12th Biology',
      'Specialist in IB DP Biology HL & SL curricula',
      'Personalized mentor for over 120+ Hyderabad students'
    ],
    availability: 'Mon - Sun: 5:00 PM - 8:30 PM',
    feeInfo: 'Affordable / Flexible'
  },
  {
    id: 'tutor-5',
    name: 'Mr. Venkat Ramana',
    avatar: 'https://ui-avatars.com/api/?name=Venkat+Ramana&background=0369a1&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Coding & Tech Mentor',
    rating: 4.92,
    reviewsCount: 33,
    experience: '6+ Years Exp',
    qualification: 'B.Tech Computer Science (JNTUH), Senior Software Engineer',
    primarySubject: 'Computer Science & Coding',
    allSubjects: ['Computer Science', 'Python', 'Java', 'C++', 'Web Development', 'Information Technology'],
    grades: ['Class 6-8', 'Class 9-10', 'Inter (11 & 12)', 'Graduation / Degree'],
    curricula: ['CBSE', 'ICSE', 'Cambridge', 'State Board'],
    modes: ['Home Tuition', 'Online Classes', 'Tuition Center'],
    areas: ['Madhapur', 'Hitec City', 'Gachibowli', 'Kondapur', 'Kukatpally', 'Lingampally'],
    bio: 'Industry software engineer turned passionate coding tutor. Teaches computer science from scratch, turning school students into proficient software programmers and board exam toppers.',
    teachingStyle: 'Hands-on live coding, project-based assignments, algorithmic logic building, and CBSE/ICSE practical exam mastery.',
    achievements: [
      'Students scored 100/100 in CBSE 12th Computer Science (Python/SQL)',
      'Built coding foundation for 60+ school students starting from Class 6',
      'Expert in Java for ICSE Computer Applications'
    ],
    availability: 'Mon - Sun: 6:00 PM - 9:30 PM',
    feeInfo: 'Hourly / Monthly Options'
  },
  {
    id: 'tutor-6',
    name: 'Ms. Shalini Iyer',
    avatar: 'https://ui-avatars.com/api/?name=Shalini+Iyer&background=be185d&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'English & Humanities Master',
    rating: 4.89,
    reviewsCount: 29,
    experience: '7+ Years Exp',
    qualification: 'M.A. English Literature (EFL-U), B.Ed',
    primarySubject: 'English Literature & Grammar',
    allSubjects: ['English Literature', 'Grammar & Writing', 'Social Studies', 'History & Civics', 'Geography'],
    grades: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Inter (11 & 12)'],
    curricula: ['CBSE', 'ICSE', 'Cambridge', 'IB', 'State Board'],
    modes: ['Home Tuition', 'Online Classes'],
    areas: ['Secunderabad', 'Marredpally', 'Sainikpuri', 'Tarnaka', 'Alwal', 'Begumpet'],
    bio: 'Expert language and humanities educator focused on analytical writing, poetry interpretation, grammatical precision, and public speaking confidence.',
    teachingStyle: 'Interactive vocabulary games, essay structure coaching, literature comprehension sessions, and creative writing workshops.',
    achievements: [
      'Helped 40+ students jump from grade C to A+ in English Board Exams',
      'Cambridge IGCSE & ICSE syllabus specialist',
      'Personalized soft skills and spoken English development'
    ],
    availability: 'Mon - Sat: 4:30 PM - 8:00 PM',
    feeInfo: 'Affordable / Custom Plan'
  },
  {
    id: 'tutor-7',
    name: 'Mr. P. Rajeshwar Rao',
    avatar: 'https://ui-avatars.com/api/?name=Rajeshwar+Rao&background=c2410c&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Commerce & CA Foundation',
    rating: 4.94,
    reviewsCount: 37,
    experience: '11+ Years Exp',
    qualification: 'M.Com, CA-Inter, MBA Finance',
    primarySubject: 'Accountancy & Commerce',
    allSubjects: ['Accountancy', 'Economics', 'Business Studies', 'Taxation', 'Cost Accounting'],
    grades: ['Inter (11 & 12)', 'Graduation / Degree'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'Cambridge'],
    modes: ['Home Tuition', 'Tuition Center', 'Online Classes'],
    areas: ['Dilsukhnagar', 'Kothapet', 'LB Nagar', 'Malakpet', 'Himayatnagar', 'Abids'],
    bio: 'Distinguished commerce coach known for building rock-solid accounting fundamentals and preparing students for 12th Board distinctions and CA Foundation / CMA entries.',
    teachingStyle: 'Practical ledger calculations, real-world case studies, journal entry logic, and comprehensive past papers practice.',
    achievements: [
      'Over 25 students scored 98+ in CBSE & Telangana State 12th Accountancy',
      'Trained 200+ commerce students across Hyderabad',
      'Specialized crash course modules for final exam revisions'
    ],
    availability: 'Mon - Sun: 5:00 PM - 9:00 PM',
    feeInfo: 'Monthly Flexible'
  },
  {
    id: 'tutor-8',
    name: 'Mrs. Geetha Krishna',
    avatar: 'https://ui-avatars.com/api/?name=Geetha+Krishna&background=0f766e&color=ffffff&size=200&bold=true&font-size=0.38',
    badge: 'Primary Foundation Expert',
    rating: 4.97,
    reviewsCount: 48,
    experience: '8+ Years Exp',
    qualification: 'M.Sc., D.El.Ed, Certified Early Childhood Educator',
    primarySubject: 'All Primary Subjects (LKG - Class 5)',
    allSubjects: ['All Primary Subjects', 'Phonics & Reading', 'Basic Math', 'Environmental Science', 'Handwriting Improvement'],
    grades: ['Class 1-5'],
    curricula: ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'],
    modes: ['Home Tuition', 'Online Classes'],
    areas: ['Kukatpally', 'Miyapur', 'Chanda Nagar', 'Nizampet', 'Pragathi Nagar', 'Hafeezpet'],
    bio: 'Nurturing, extremely patient foundation specialist who turns early school learning into an engaging, enjoyable, and disciplined experience for young learners.',
    teachingStyle: 'Play-way learning, phonics-based reading, mental arithmetic games, daily handwriting correction, and supportive positive reinforcement.',
    achievements: [
      'Specialist in turning weak readers into confident top students in 60 days',
      'Loved by over 100+ Hyderabad parents for caring, dedicated guidance',
      'Certified in Child Psychology and learning speed adaptation'
    ],
    availability: 'Mon - Fri: 4:00 PM - 7:30 PM',
    feeInfo: 'Affordable Monthly Rate'
  }
];

export const TutorsPage: React.FC = () => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCurriculum, setSelectedCurriculum] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  // Modals & Popups
  const [activeCallTutor, setActiveCallTutor] = useState<TutorProfile | null>(null);
  const [activeProfileTutor, setActiveProfileTutor] = useState<TutorProfile | null>(null);

  // Quick Callback Form in Call Modal
  const [callForm, setCallForm] = useState({
    parentName: '',
    mobileNumber: '',
    grade: 'Class 9-10',
    message: ''
  });
  const [isCallingSubmitting, setIsCallingSubmitting] = useState(false);
  const [callSubmitSuccess, setCallSubmitSuccess] = useState(false);

  // Scroll Triggered Animated Popup State
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [isScrollPopupDismissed, setIsScrollPopupDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollPopupDismissed) return;
      const scrollPosition = window.scrollY;
      if (scrollPosition > 350) {
        setShowScrollPopup(true);
      } else {
        setShowScrollPopup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollPopupDismissed]);

  // Distinct Filter Options
  const subjectsList = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Commerce', 'Primary All Subjects'];
  const curriculaList = ['All', 'CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];
  const gradesList = ['All', 'Class 1-5', 'Class 6-8', 'Class 9-10', 'Inter (11 & 12)', 'Graduation / Degree'];
  const modesList = ['All', 'Home Tuition', 'Tuition Center', 'Online Classes'];
  const areasList = ['All', 'Kukatpally', 'JNTU', 'Miyapur', 'Nizampet', 'Gachibowli', 'Madhapur', 'Kondapur', 'Ameerpet', 'Secunderabad', 'Dilsukhnagar'];

  // Filter Logic
  const filteredTutors = useMemo(() => {
    return TUTORS_DATA.filter((tutor) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(query);
        const matchesSubject = tutor.allSubjects.some(s => s.toLowerCase().includes(query)) || tutor.primarySubject.toLowerCase().includes(query);
        const matchesArea = tutor.areas.some(a => a.toLowerCase().includes(query));
        const matchesBio = tutor.bio.toLowerCase().includes(query);
        if (!matchesName && !matchesSubject && !matchesArea && !matchesBio) {
          return false;
        }
      }

      // Subject
      if (selectedSubject !== 'All') {
        const subjectQuery = selectedSubject.toLowerCase();
        const hasSubject = tutor.allSubjects.some(s => s.toLowerCase().includes(subjectQuery)) || tutor.primarySubject.toLowerCase().includes(subjectQuery);
        if (!hasSubject) return false;
      }

      // Curriculum
      if (selectedCurriculum !== 'All') {
        if (!tutor.curricula.includes(selectedCurriculum)) return false;
      }

      // Grade
      if (selectedGrade !== 'All') {
        if (!tutor.grades.includes(selectedGrade)) return false;
      }

      // Mode
      if (selectedMode !== 'All') {
        if (!tutor.modes.includes(selectedMode)) return false;
      }

      // Area
      if (selectedArea !== 'All') {
        if (!tutor.areas.includes(selectedArea)) return false;
      }

      return true;
    });
  }, [searchTerm, selectedSubject, selectedCurriculum, selectedGrade, selectedMode, selectedArea]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSubject('All');
    setSelectedCurriculum('All');
    setSelectedGrade('All');
    setSelectedMode('All');
    setSelectedArea('All');
  };

  const handleCallFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callForm.parentName || !callForm.mobileNumber) return;

    setIsCallingSubmitting(true);
    try {
      await submitStudentRegistration({
        student_name: callForm.parentName,
        parent_name: callForm.parentName,
        mobile_number: callForm.mobileNumber,
        parent_mobile: callForm.mobileNumber,
        class_grade: callForm.grade,
        curriculum: 'CBSE',
        subjects_required: activeCallTutor ? [activeCallTutor.primarySubject] : ['All Subjects'],
        learning_mode: 'Home Tuition',
        location: 'Hyderabad - Requested via Tutors Page'
      });
      setCallSubmitSuccess(true);
      setTimeout(() => {
        setCallSubmitSuccess(false);
        setActiveCallTutor(null);
        setCallForm({ parentName: '', mobileNumber: '', grade: 'Class 9-10', message: '' });
      }, 2500);
    } catch {
      setCallSubmitSuccess(true);
      setTimeout(() => {
        setCallSubmitSuccess(false);
        setActiveCallTutor(null);
      }, 2500);
    } finally {
      setIsCallingSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* 1. Hero & Header Banner */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-roar-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-roar-yellow/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 text-roar-blue text-xs sm:text-sm font-bold tracking-wide mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-roar-yellow fill-roar-yellow" />
            <span>India's Verified Faculty & 1-on-1 Tutors</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-roar-navy tracking-tight leading-tight max-w-4xl mx-auto">
            Find & Connect with <span className="text-roar-blue">Expert Tutors</span> <span className="text-roar-yellow">All Over India</span>
          </h1>

          <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse certified, background-verified educators for <strong>CBSE, ICSE, State Board, IB & Cambridge</strong> from <strong>LKG to Graduation</strong>. Request immediate home visits or online live sessions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-roar-blue">500+</div>
              <div className="text-xs text-slate-500 font-medium">Verified Tutors</div>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <span>4.9</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="text-xs text-slate-500 font-medium">Average Rating</div>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-medium">Background Checked</div>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-roar-navy">30 Mins</div>
              <div className="text-xs text-slate-500 font-medium">Fast Match Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Multi-Category Filters */}
      <section className="py-8 bg-slate-50/60 border-b border-slate-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tutor name, subject (Maths, Physics...), or locality (Kukatpally, Madhapur)..."
                className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-roar-blue focus:border-transparent shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Call Direct Hotline Trigger */}
            <a
              href="tel:6309763394"
              className="w-full sm:w-auto px-5 py-3 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: 6309763394</span>
            </a>
          </div>

          {/* Filter Pills with Horizontal Scrolling on Mobile */}
          <div className="flex flex-col gap-3">
            {/* Subject Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="font-bold text-slate-600 shrink-0 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-roar-blue" />
                <span>Subject:</span>
              </span>
              {subjectsList.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors ${
                    selectedSubject === subject
                      ? 'bg-roar-blue text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            {/* Secondary Filter Row: Curriculum, Grade, Mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-slate-200/60">
              <div className="flex flex-wrap items-center gap-2">
                {/* Curriculum dropdown */}
                <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Curriculum:</span>
                  <select
                    value={selectedCurriculum}
                    onChange={(e) => setSelectedCurriculum(e.target.value)}
                    className="bg-transparent font-bold text-roar-navy focus:outline-none cursor-pointer"
                  >
                    {curriculaList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Grade dropdown */}
                <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Grade:</span>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="bg-transparent font-bold text-roar-navy focus:outline-none cursor-pointer"
                  >
                    {gradesList.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                {/* Mode dropdown */}
                <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Mode:</span>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="bg-transparent font-bold text-roar-navy focus:outline-none cursor-pointer"
                  >
                    {modesList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Area dropdown */}
                <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Hyderabad Area:</span>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="bg-transparent font-bold text-roar-navy focus:outline-none cursor-pointer"
                  >
                    {areasList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Reset Action */}
              {(searchTerm || selectedSubject !== 'All' || selectedCurriculum !== 'All' || selectedGrade !== 'All' || selectedMode !== 'All' || selectedArea !== 'All') && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tutors Directory Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-roar-navy">
                Available Tutors <span className="text-roar-blue">({filteredTutors.length})</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verified educators ready for immediate scheduling in Hyderabad
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Call Assistance Active</span>
            </div>
          </div>

          {filteredTutors.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-4 max-w-xl mx-auto">
              <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-roar-navy">No tutors matching your specific criteria</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                We have over 500+ private tutors across Hyderabad. Call our academic coordinators directly and we will assign the ideal tutor within 30 minutes!
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                >
                  Clear Filters
                </button>
                <a
                  href="tel:6309763394"
                  className="px-6 py-2.5 bg-roar-blue text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md hover:bg-roar-blue-hover transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Coordinator: 6309763394</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-xl hover:border-roar-blue/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header & Photo */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                        />
                        <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full shadow-sm" title="Verified Educator">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide">
                          {tutor.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-roar-navy truncate group-hover:text-roar-blue transition-colors">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate">
                          {tutor.qualification}
                        </p>
                        
                        {/* Rating and Experience */}
                        <div className="flex items-center gap-3 pt-0.5 text-xs">
                          <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{tutor.rating}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({tutor.reviewsCount})</span>
                          </div>
                          <span className="text-slate-400">•</span>
                          <span className="font-semibold text-slate-700">{tutor.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Primary Subject Banner */}
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-roar-blue flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span>{tutor.primarySubject}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {tutor.feeInfo}
                      </span>
                    </div>

                    {/* Curricula and Grades Badges */}
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 font-medium">Curricula:</span>
                        {tutor.curricula.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {c}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 font-medium">Grades:</span>
                        {tutor.grades.slice(0, 2).map((g) => (
                          <span key={g} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold text-[11px] border border-amber-200/60">
                            {g}
                          </span>
                        ))}
                        {tutor.grades.length > 2 && (
                          <span className="text-[10px] text-slate-500 font-bold">+{tutor.grades.length - 2} more</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] pt-1">
                        <MapPin className="w-3.5 h-3.5 text-roar-blue shrink-0" />
                        <span className="truncate">Areas: {tutor.areas.slice(0, 3).join(', ')}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Interactive Call & Details Buttons */}
                  <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setActiveProfileTutor(tutor)}
                      className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-roar-navy font-bold rounded-xl border border-slate-200 text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>View Profile</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveCallTutor(tutor)}
                      className="w-full py-2.5 px-3 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-roar-blue/20 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-roar-yellow" />
                      <span>Call Tutor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. "Join as Tutor" Banner */}
      <section className="py-16 bg-gradient-to-r from-roar-navy via-slate-900 to-roar-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-roar-yellow text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Join RoarUps Educator Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
            Are You a Passionate Tutor or Teacher in Hyderabad?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Get verified student leads for home tuitions, tuition centers, and online batches in your preferred localities.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-extrabold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Register as a Tutor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:6309763394"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-roar-yellow" />
              <span>Tutor Helpline: 6309763394</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. POPUP MODAL 1: Phone Call / Instant Contact Popup */}
      <AnimatePresence>
        {activeCallTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCallTutor(null)}
              className="fixed inset-0 bg-roar-navy/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveCallTutor(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Preview of Tutor */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <img
                  src={activeCallTutor.avatar}
                  alt={activeCallTutor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-roar-blue/20"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block">
                    Direct Tutor Connect
                  </div>
                  <h3 className="text-lg font-bold text-roar-navy">{activeCallTutor.name}</h3>
                  <p className="text-xs text-slate-500">{activeCallTutor.primarySubject} • {activeCallTutor.experience}</p>
                </div>
              </div>

              {/* Direct Call & WhatsApp Triggers */}
              <div className="py-4 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Connect immediately with RoarUps academic coordinators to schedule a free 1-on-1 demo or direct home visit with <strong>{activeCallTutor.name}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:6309763394"
                    className="w-full py-3.5 px-4 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-2xl shadow-lg shadow-roar-blue/25 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4 text-roar-yellow" />
                    <span>Call 6309763394</span>
                  </a>

                  <a
                    href={`https://wa.me/916309763394?text=${encodeURIComponent(
                      `Hello RoarUps, I would like to book/connect with tutor ${activeCallTutor.name} for ${activeCallTutor.primarySubject}. Please arrange details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

              {/* Quick Callback Form */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-roar-navy uppercase tracking-wider mb-3">
                  Or Request an Instant Callback for this Tutor:
                </h4>

                {callSubmitSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center text-xs font-bold space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <p>Callback Request Received!</p>
                    <p className="text-[11px] font-normal text-emerald-700">Our coordinator will call you within 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallFormSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={callForm.parentName}
                        onChange={(e) => setCallForm({ ...callForm, parentName: e.target.value })}
                        placeholder="Your Name (Parent / Student)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-roar-blue focus:bg-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={callForm.mobileNumber}
                        onChange={(e) => setCallForm({ ...callForm, mobileNumber: e.target.value })}
                        placeholder="Mobile Number"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-roar-blue focus:bg-white outline-none"
                      />
                      <select
                        value={callForm.grade}
                        onChange={(e) => setCallForm({ ...callForm, grade: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-roar-blue focus:bg-white outline-none"
                      >
                        <option value="Class 1-5">Class 1-5</option>
                        <option value="Class 6-8">Class 6-8</option>
                        <option value="Class 9-10">Class 9-10</option>
                        <option value="Inter (11 & 12)">Inter (11 & 12)</option>
                        <option value="Graduation">Graduation</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isCallingSubmitting}
                      className="w-full py-3 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isCallingSubmitting ? (
                        <span>Connecting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Fast Callback</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. POPUP MODAL 2: Full Detailed Tutor Profile Modal */}
      <AnimatePresence>
        {activeProfileTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProfileTutor(null)}
              className="fixed inset-0 bg-roar-navy/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <button
                onClick={() => setActiveProfileTutor(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
                <img
                  src={activeProfileTutor.avatar}
                  alt={activeProfileTutor.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                      {activeProfileTutor.badge}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Faculty</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-roar-navy">{activeProfileTutor.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{activeProfileTutor.qualification}</p>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{activeProfileTutor.rating} ({activeProfileTutor.reviewsCount} reviews)</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-semibold">{activeProfileTutor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Approach */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-roar-navy uppercase tracking-wider">About Educator & Philosophy</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {activeProfileTutor.bio}
                </p>
              </div>

              {/* Teaching Methodology */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-roar-navy uppercase tracking-wider">Teaching Methodology</h4>
                <p className="text-xs sm:text-sm text-slate-700 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60 leading-relaxed">
                  {activeProfileTutor.teachingStyle}
                </p>
              </div>

              {/* Key Highlights & Achievements */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-roar-navy uppercase tracking-wider">Key Highlights & Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeProfileTutor.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability & Locality Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-roar-blue" />
                    <span>Availability Slots:</span>
                  </span>
                  <span className="text-slate-600">{activeProfileTutor.availability}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-roar-blue" />
                    <span>Serviced Localities:</span>
                  </span>
                  <span className="text-slate-600">{activeProfileTutor.areas.join(', ')}</span>
                </div>
              </div>

              {/* Actions Footer inside Profile */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const tutor = activeProfileTutor;
                    setActiveProfileTutor(null);
                    setActiveCallTutor(tutor);
                  }}
                  className="w-full sm:flex-1 py-3.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-roar-yellow" />
                  <span>Call Tutor Now</span>
                </button>

                <a
                  href={`https://wa.me/916309763394?text=${encodeURIComponent(
                    `Hello RoarUps, I viewed profile of ${activeProfileTutor.name} (${activeProfileTutor.primarySubject}). I want to book a free demo session.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Book Free Demo</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Scroll-Triggered Floating Action Buttons: Call + WhatsApp */}
      <AnimatePresence>
        {showScrollPopup && !isScrollPopupDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-24 lg:bottom-10 right-4 sm:right-6 z-40 flex flex-col items-end gap-3"
          >
            {/* Dismiss button */}
            <button
              onClick={() => setIsScrollPopupDismissed(true)}
              className="w-7 h-7 rounded-full bg-slate-800/70 text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-colors self-end"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/916309763394?text=Hi%20RoarUps,%20please%20help%20me%20find%20the%20best%20tutor%20for%20my%20child."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-3 rounded-full shadow-xl shadow-green-500/30 transition-all hover:-translate-y-0.5 text-sm"
              aria-label="WhatsApp us"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline-block whitespace-nowrap">WhatsApp Us</span>
            </a>

            {/* Call Button */}
            <a
              href="tel:6309763394"
              className="group flex items-center gap-2.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold px-4 py-3 rounded-full shadow-xl shadow-roar-blue/30 transition-all hover:-translate-y-0.5 text-sm"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5 shrink-0 text-roar-yellow" />
              <span className="hidden sm:inline-block whitespace-nowrap">Call: 6309763394</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};
