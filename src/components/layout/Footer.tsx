import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-roar-navy text-white pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-3 rounded-xl shadow-md">
              <img
                src="/assets/roarups-logo.png"
                alt="ROARUPS Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-roar-yellow font-bold text-base tracking-wide">
              "Your Success Is Our Mission"
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Hyderabad’s premier education and tuition platform. Delivering personalized home tuitions, tuition center learning, and online classes from LKG to Graduation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/916309763394"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-roar-yellow transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-roar-yellow transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-roar-yellow transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-300 hover:text-roar-yellow transition-colors">Register Now</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-roar-yellow transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-300 hover:text-roar-yellow transition-colors">Reviews & Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-roar-yellow transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Educational Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/home-tuitions" className="text-slate-300 hover:text-roar-yellow transition-colors flex items-center justify-between">
                  <span>Roar Home Tuitions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/services/tuition-center" className="text-slate-300 hover:text-roar-yellow transition-colors flex items-center justify-between">
                  <span>Roar Tuition Center</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/services/online-classes" className="text-slate-300 hover:text-roar-yellow transition-colors flex items-center justify-between">
                  <span>Online Classes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li className="pt-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Curricula Supported</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CBSE • ICSE • State Board • IB • Cambridge
                </p>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-roar-yellow shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Road No. 5, IDPL Colony, Vasanth Nagar, Near JNTU, Hyderabad, Telangana 500072
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-roar-yellow shrink-0" />
                <div className="text-xs space-x-2">
                  <a href="tel:6309763394" className="hover:text-roar-yellow transition-colors">6309763394</a>
                  <span>/</span>
                  <a href="tel:9490988856" className="hover:text-roar-yellow transition-colors">9490988856</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-roar-yellow shrink-0" />
                <a href="mailto:roarupstuitions@gmail.com" className="text-xs hover:text-roar-yellow transition-colors">
                  roarupstuitions@gmail.com
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                <span className="font-semibold text-white">Business Hours:</span> 6:00 PM – 8:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 ROARUPS. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
