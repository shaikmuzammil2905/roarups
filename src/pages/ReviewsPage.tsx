import React, { useEffect, useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Modal } from '../components/common/Modal';
import { fetchApprovedReviews, submitReview } from '../services/db';
import { Review } from '../types';
import { Star, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Parent' | 'Student' | 'Tutor'>('Parent');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    async function loadReviews() {
      const data = await fetchApprovedReviews();
      setReviews(data);
      setIsLoading(false);
    }
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !feedback) {
      setModalState({
        isOpen: true,
        title: 'Missing Fields',
        message: 'Please enter your name and feedback.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitReview({ name, role, rating, feedback });
      if (!res.success) throw new Error(res.error);

      setModalState({
        isOpen: true,
        title: 'Review Submitted',
        message: 'Thank you for sharing your experience. Your review has been submitted for approval.',
        type: 'success'
      });

      setName('');
      setFeedback('');
      setRating(5);
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Submission Failed',
        message: err.message || 'Failed to submit review.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50 py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-roar-blue/10 text-roar-blue font-bold text-xs uppercase tracking-wider mb-3">
            Community Testimonials
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-roar-navy tracking-tight mb-3">
            Parent & Student Reviews
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Read verified experiences from our parents, students, and tutors across Hyderabad.
          </p>
        </div>
      </section>

      {/* Main Grid: Approved Reviews + Submission Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Approved Testimonials List */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-extrabold text-roar-navy border-b pb-3">
                Verified Reviews ({reviews.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-roar-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-slate-500 text-center py-12 bg-slate-50 rounded-2xl">
                  No published reviews yet. Be the first to share your experience!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((r, idx) => (
                    <div
                      key={r.id || idx}
                      className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group hover:border-roar-blue/30 transition-all"
                    >
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-roar-blue/10" />
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < r.rating
                                ? 'text-roar-yellow fill-roar-yellow'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-700 text-sm italic mb-4 leading-relaxed">
                        "{r.feedback}"
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200/60">
                        <span className="font-bold text-roar-navy">{r.name}</span>
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-roar-blue font-bold">
                          {r.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Share Your Experience Form */}
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquarePlus className="w-6 h-6 text-roar-blue" />
                <h2 className="text-2xl font-extrabold text-roar-navy">
                  Share Your RoarUps Experience
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Tell us about your experience with RoarUps. Reviews will be reviewed by our admin team before being displayed.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= rating
                              ? 'text-roar-yellow fill-roar-yellow scale-110'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Feedback / Testimonial *</label>
                  <textarea
                    required
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share details about teaching quality, subject clarity, or academic improvement..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
