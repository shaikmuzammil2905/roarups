import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { Modal } from '../components/common/Modal';
import {
  submitTutorRegistration,
  submitStudentRegistration,
  submitParentRegistration,
  uploadAadhaarDocument
} from '../services/db';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { UserCheck, GraduationCap, Users, ShieldAlert, Upload, CheckCircle2, ArrowLeft } from 'lucide-react';

type RegistrationType = 'tutor' | 'student' | 'parent' | null;

export const RegisterPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<RegistrationType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  // Shared Form Options
  const curriculaOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];
  const gradesOptions = ['LKG/UKG', 'Class 1-5', 'Class 6-8', 'Class 9-10', 'Intermediate (11 & 12)', 'Graduation / Degree'];
  const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Social Studies', 'Commerce / Economics', 'Computer Science'];

  // Tutor Form State
  const [tutorForm, setTutorForm] = useState({
    fullName: '',
    mobileNumber: '',
    password: '',
    qualification: '',
    gender: 'Male',
    subjects: [] as string[],
    classes: [] as string[],
    curriculum: [] as string[],
    teachingExperience: '1-3 Years',
    preferredTeachingMode: 'Both',
    location: '',
  });
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    studentName: '',
    mobileNumber: '',
    password: '',
    classGrade: 'Class 9-10',
    curriculum: 'CBSE',
    subjectsRequired: [] as string[],
    learningMode: 'Offline',
    location: '',
    parentName: '',
    parentMobile: '',
  });

  // Parent Form State
  const [parentForm, setParentForm] = useState({
    parentName: '',
    studentName: '',
    classGrade: 'Class 9-10',
    curriculum: 'CBSE',
    mobileNumber: '',
    password: '',
    location: '',
    subjectsRequired: [] as string[],
    learningMode: 'Both',
  });

  const handleArrayToggle = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Submit Tutor Handler
  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorForm.fullName || !tutorForm.mobileNumber || !tutorForm.password) {
      setModalState({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please fill in all required fields (Name, Mobile, Password).',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let userId: string | null = null;
      let aadhaarFilePath: string | null = null;

      // Supabase Auth Integration if configured
      if (isSupabaseConfigured && supabase) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${tutorForm.mobileNumber}@roarups.temp`, // temporary email mapping for phone registration
          password: tutorForm.password,
          options: {
            data: {
              full_name: tutorForm.fullName,
              role: 'tutor',
              mobile: tutorForm.mobileNumber
            }
          }
        });
        if (authError && !authError.message.includes('User already registered')) {
          throw new Error(authError.message);
        }
        if (authData.user) userId = authData.user.id;
      }

      // Upload Aadhaar if provided
      if (aadhaarFile && userId) {
        const uploadRes = await uploadAadhaarDocument(aadhaarFile, userId);
        if (uploadRes.filePath) aadhaarFilePath = uploadRes.filePath;
      }

      const res = await submitTutorRegistration({
        user_id: userId,
        full_name: tutorForm.fullName,
        mobile_number: tutorForm.mobileNumber,
        qualification: tutorForm.qualification,
        gender: tutorForm.gender,
        subjects: tutorForm.subjects,
        classes: tutorForm.classes,
        curriculum: tutorForm.curriculum,
        teaching_experience: tutorForm.teachingExperience,
        preferred_teaching_mode: tutorForm.preferredTeachingMode,
        location: tutorForm.location,
        aadhaar_file_path: aadhaarFilePath,
      });

      if (!res.success) {
        throw new Error(res.error || 'Failed to submit registration');
      }

      setModalState({
        isOpen: true,
        title: 'Registration Submitted',
        message: 'Your registration has been submitted successfully. Our team will review your details and contact you.',
        type: 'success'
      });
      setSelectedType(null);
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Submission Error',
        message: err.message || 'An error occurred during registration. Please check your connection or Supabase settings.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Student Handler
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.studentName || !studentForm.mobileNumber || !studentForm.password) {
      setModalState({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please fill in Student Name, Mobile Number, and Password.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let userId: string | null = null;
      if (isSupabaseConfigured && supabase) {
        const { data: authData } = await supabase.auth.signUp({
          email: `${studentForm.mobileNumber}@roarups.temp`,
          password: studentForm.password,
          options: {
            data: {
              full_name: studentForm.studentName,
              role: 'student',
              mobile: studentForm.mobileNumber
            }
          }
        });
        if (authData?.user) userId = authData.user.id;
      }

      const res = await submitStudentRegistration({
        user_id: userId,
        student_name: studentForm.studentName,
        mobile_number: studentForm.mobileNumber,
        class_grade: studentForm.classGrade,
        curriculum: studentForm.curriculum,
        subjects_required: studentForm.subjectsRequired,
        learning_mode: studentForm.learningMode,
        location: studentForm.location,
        parent_name: studentForm.parentName,
        parent_mobile: studentForm.parentMobile
      });

      if (!res.success) throw new Error(res.error);

      setModalState({
        isOpen: true,
        title: 'Student Account Registered',
        message: 'Your student registration has been created successfully! You can now login to your dashboard.',
        type: 'success'
      });
      setSelectedType(null);
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Registration Error',
        message: err.message || 'Registration failed.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Parent Handler
  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentForm.parentName || !parentForm.mobileNumber || !parentForm.password) {
      setModalState({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please fill in Parent Name, Mobile Number, and Password.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let userId: string | null = null;
      if (isSupabaseConfigured && supabase) {
        const { data: authData } = await supabase.auth.signUp({
          email: `${parentForm.mobileNumber}@roarups.temp`,
          password: parentForm.password,
          options: {
            data: {
              full_name: parentForm.parentName,
              role: 'parent',
              mobile: parentForm.mobileNumber
            }
          }
        });
        if (authData?.user) userId = authData.user.id;
      }

      const res = await submitParentRegistration({
        user_id: userId,
        parent_name: parentForm.parentName,
        student_name: parentForm.studentName,
        class_grade: parentForm.classGrade,
        curriculum: parentForm.curriculum,
        mobile_number: parentForm.mobileNumber,
        location: parentForm.location,
        subjects_required: parentForm.subjectsRequired,
        learning_mode: parentForm.learningMode
      });

      if (!res.success) throw new Error(res.error);

      setModalState({
        isOpen: true,
        title: 'Parent Account Created',
        message: 'Your parent registration has been created successfully! Our academic coordinator will contact you shortly.',
        type: 'success'
      });
      setSelectedType(null);
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Registration Error',
        message: err.message || 'Parent registration failed.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="py-12 lg:py-20 bg-slate-50 min-h-[80vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-roar-navy tracking-tight mb-2">
              Registration Portal
            </h1>
            <p className="text-slate-600 text-base">
              Join ROARUPS as a Tutor, Student, or Parent to access personalized education services.
            </p>
          </div>

          {/* STEP 1: Selection Cards */}
          {!selectedType && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-roar-navy mb-8">
                Choose Your Registration Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tutor Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType('tutor')}
                  className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-card hover:border-roar-blue hover:shadow-card-hover cursor-pointer text-center space-y-4 group transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-roar-blue flex items-center justify-center mx-auto group-hover:bg-roar-blue group-hover:text-white transition-all">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-roar-navy">Tutor</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Register as a qualified tutor to teach Home Tuitions, Tuition Center, or Online Classes in Hyderabad.
                  </p>
                  <span className="inline-block px-4 py-2 bg-blue-50 text-roar-blue font-bold rounded-xl text-xs group-hover:bg-roar-blue group-hover:text-white transition-all">
                    Apply as Tutor →
                  </span>
                </motion.div>

                {/* Student Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType('student')}
                  className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-card hover:border-roar-yellow hover:shadow-card-hover cursor-pointer text-center space-y-4 group transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-roar-yellow flex items-center justify-center mx-auto group-hover:bg-roar-yellow group-hover:text-roar-navy transition-all">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-roar-navy">Student</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Register to find experienced tutors for CBSE, ICSE, State, IB, Cambridge from LKG to Graduation.
                  </p>
                  <span className="inline-block px-4 py-2 bg-amber-50 text-roar-navy font-bold rounded-xl text-xs group-hover:bg-roar-yellow transition-all">
                    Register Student →
                  </span>
                </motion.div>

                {/* Parent Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType('parent')}
                  className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-card hover:border-emerald-500 hover:shadow-card-hover cursor-pointer text-center space-y-4 group transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-roar-navy">Parent</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Enroll your child for high-quality home tuitions or center coaching with dedicated support.
                  </p>
                  <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-xs group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    Parent Enrollment →
                  </span>
                </motion.div>
              </div>
            </div>
          )}

          {/* STEP 2: Selected Registration Form */}
          {selectedType && (
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl">
              <button
                onClick={() => setSelectedType(null)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-roar-navy mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Registration Type</span>
              </button>

              {/* TUTOR FORM */}
              {selectedType === 'tutor' && (
                <form onSubmit={handleTutorSubmit} className="space-y-6">
                  <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-extrabold text-roar-navy">Tutor Registration</h2>
                    <p className="text-xs text-slate-500">Provide your qualifications and teaching preferences.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={tutorForm.fullName}
                        onChange={(e) => setTutorForm({ ...tutorForm, fullName: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={tutorForm.mobileNumber}
                        onChange={(e) => setTutorForm({ ...tutorForm, mobileNumber: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password *</label>
                      <input
                        type="password"
                        required
                        value={tutorForm.password}
                        onChange={(e) => setTutorForm({ ...tutorForm, password: e.target.value })}
                        placeholder="Create account password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Qualification *</label>
                      <input
                        type="text"
                        required
                        value={tutorForm.qualification}
                        onChange={(e) => setTutorForm({ ...tutorForm, qualification: e.target.value })}
                        placeholder="e.g. M.Sc Physics, B.Tech"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gender</label>
                      <select
                        value={tutorForm.gender}
                        onChange={(e) => setTutorForm({ ...tutorForm, gender: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teaching Experience</label>
                      <select
                        value={tutorForm.teachingExperience}
                        onChange={(e) => setTutorForm({ ...tutorForm, teachingExperience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                      >
                        <option value="Fresher">Fresher / Less than 1 Year</option>
                        <option value="1-3 Years">1 - 3 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Area in Hyderabad</label>
                    <input
                      type="text"
                      required
                      value={tutorForm.location}
                      onChange={(e) => setTutorForm({ ...tutorForm, location: e.target.value })}
                      placeholder="e.g. Vasanth Nagar, JNTU, Kukatpally"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Multi-select checkable options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Curriculum Expertise</label>
                    <div className="flex flex-wrap gap-2">
                      {curriculaOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleArrayToggle(tutorForm.curriculum, c, (val) => setTutorForm({ ...tutorForm, curriculum: val }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            tutorForm.curriculum.includes(c)
                              ? 'bg-roar-blue text-white border-roar-blue'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Subjects You Can Teach</label>
                    <div className="flex flex-wrap gap-2">
                      {subjectsList.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleArrayToggle(tutorForm.subjects, s, (val) => setTutorForm({ ...tutorForm, subjects: val }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            tutorForm.subjects.includes(s)
                              ? 'bg-roar-blue text-white border-roar-blue'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aadhaar Private Document Upload */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Confidential Aadhaar Verification</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Aadhaar documents are strictly kept private in secure storage for verification only. They are never exposed publicly.
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setAadhaarFile(e.target.files?.[0] || null)}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-roar-blue file:text-white hover:file:bg-roar-blue-hover"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Submit Tutor Registration</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* STUDENT FORM */}
              {selectedType === 'student' && (
                <form onSubmit={handleStudentSubmit} className="space-y-6">
                  <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-extrabold text-roar-navy">Student Registration</h2>
                    <p className="text-xs text-slate-500">Register to connect with experienced tutors in Hyderabad.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.studentName}
                        onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                        placeholder="Enter student name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={studentForm.mobileNumber}
                        onChange={(e) => setStudentForm({ ...studentForm, mobileNumber: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password *</label>
                      <input
                        type="password"
                        required
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        placeholder="Create account password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class / Grade *</label>
                      <select
                        value={studentForm.classGrade}
                        onChange={(e) => setStudentForm({ ...studentForm, classGrade: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      >
                        {gradesOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Curriculum</label>
                      <select
                        value={studentForm.curriculum}
                        onChange={(e) => setStudentForm({ ...studentForm, curriculum: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      >
                        {curriculaOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Learning Mode</label>
                      <select
                        value={studentForm.learningMode}
                        onChange={(e) => setStudentForm({ ...studentForm, learningMode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-yellow text-sm"
                      >
                        <option value="Home Tuition">Home Tuition</option>
                        <option value="Tuition Center">Tuition Center</option>
                        <option value="Online Classes">Online Classes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent / Guardian Name</label>
                      <input
                        type="text"
                        value={studentForm.parentName}
                        onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                        placeholder="Parent name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent Mobile Number</label>
                      <input
                        type="tel"
                        value={studentForm.parentMobile}
                        onChange={(e) => setStudentForm({ ...studentForm, parentMobile: e.target.value })}
                        placeholder="Parent mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Area</label>
                    <input
                      type="text"
                      required
                      value={studentForm.location}
                      onChange={(e) => setStudentForm({ ...studentForm, location: e.target.value })}
                      placeholder="e.g. Vasanth Nagar, JNTU, Hyderabad"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-roar-navy border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Submit Student Registration</span>
                    )}
                  </button>
                </form>
              )}

              {/* PARENT FORM */}
              {selectedType === 'parent' && (
                <form onSubmit={handleParentSubmit} className="space-y-6">
                  <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-extrabold text-roar-navy">Parent Registration</h2>
                    <p className="text-xs text-slate-500">Create account to manage your child’s tuitions and tutoring requests.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent Name *</label>
                      <input
                        type="text"
                        required
                        value={parentForm.parentName}
                        onChange={(e) => setParentForm({ ...parentForm, parentName: e.target.value })}
                        placeholder="Enter parent name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={parentForm.studentName}
                        onChange={(e) => setParentForm({ ...parentForm, studentName: e.target.value })}
                        placeholder="Enter student name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={parentForm.mobileNumber}
                        onChange={(e) => setParentForm({ ...parentForm, mobileNumber: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password *</label>
                      <input
                        type="password"
                        required
                        value={parentForm.password}
                        onChange={(e) => setParentForm({ ...parentForm, password: e.target.value })}
                        placeholder="Create account password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Class / Grade</label>
                      <select
                        value={parentForm.classGrade}
                        onChange={(e) => setParentForm({ ...parentForm, classGrade: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      >
                        {gradesOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Curriculum</label>
                      <select
                        value={parentForm.curriculum}
                        onChange={(e) => setParentForm({ ...parentForm, curriculum: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm"
                      >
                        {curriculaOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Address</label>
                    <input
                      type="text"
                      required
                      value={parentForm.location}
                      onChange={(e) => setParentForm({ ...parentForm, location: e.target.value })}
                      placeholder="e.g. Road No. 5, Vasanth Nagar, JNTU, Hyderabad"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Create Parent Account</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        type={modalState.type}
      >
        <p className="text-slate-700 text-sm leading-relaxed">{modalState.message}</p>
      </Modal>
    </PageLayout>
  );
};
