import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { fetchApprovedReviews } from '../../services/db';
import { Review } from '../../types';

export const ReviewCarousel: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const data = await fetchApprovedReviews();
      setReviews(data);
      setIsLoading(false);
    }
    loadReviews();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-roar-blue font-extrabold text-xs tracking-wider uppercase mb-2 block">
              Parent & Student Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight">
              What Parents & Students Say
            </h2>
          </div>
          <Link
            to="/reviews"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-roar-blue hover:text-roar-blue-hover"
          >
            <span>View All & Leave a Review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-roar-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No reviews published yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review, idx) => (
              <motion.div
                key={review.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between relative group hover:border-roar-blue/30 hover:shadow-card transition-all"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-roar-blue/10 group-hover:text-roar-blue/20 transition-colors" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-roar-yellow fill-roar-yellow'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    "{review.feedback}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-roar-navy">{review.name}</h4>
                    <p className="text-xs text-roar-blue font-semibold">{review.role}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-roar-blue text-xs font-extrabold flex items-center justify-center">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
