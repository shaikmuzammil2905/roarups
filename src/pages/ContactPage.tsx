import React, { useEffect, useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Modal } from '../components/common/Modal';
import { submitContactMessage, fetchWebsiteSettings } from '../services/db';
import { WebsiteSettings } from '../types';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Navigation, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    async function loadSettings() {
      const data = await fetchWebsiteSettings();
      setSettings(data);
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setModalState({
        isOpen: true,
        title: 'Missing Fields',
        message: 'Please provide your name, phone number, and message.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitContactMessage(formData);
      if (!res.success) throw new Error(res.error);

      setModalState({
        isOpen: true,
        title: 'Message Sent',
        message: 'Thank you for reaching out to ROARUPS! Our team will contact you shortly.',
        type: 'success'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setModalState({
        isOpen: true,
        title: 'Sending Failed',
        message: err.message || 'Failed to send message.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultDirectionsUrl = "https://maps.google.com/?q=Road+No.+5,+IDPL+Colony,+Vasanth+Nagar,+JNTU,+Hyderabad,+Telangana+500072";
  const directionsUrl = settings?.google_maps?.directions_url || defaultDirectionsUrl;

  return (
    <PageLayout>
      {/* Contact Banner Header */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50 py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-roar-blue/10 text-roar-blue font-bold text-xs uppercase tracking-wider mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-roar-navy tracking-tight mb-3">
            Contact RoarUps
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Have questions about home tuitions, tuition center batches, or online classes? We are here to assist you.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Details & Quick Action Cards */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-extrabold text-roar-navy border-b pb-3">Contact Details</h2>

              {/* Address Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-roar-blue text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-roar-navy mb-1">Center Address</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    IDPL Colony, Plot No. 734, Vasanth Nagar Road No. 5, Near JNTU Metro, Hyderabad, Telangana 500072
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-roar-yellow text-roar-navy flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-roar-navy mb-1">Business Hours</h4>
                  <p className="text-xs text-slate-700 font-bold">6:00 PM – 8:30 PM (Daily)</p>
                </div>
              </div>

              {/* Phone Dialer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:6309763394"
                  className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 hover:border-roar-blue transition-colors flex items-center gap-3 group"
                >
                  <Phone className="w-6 h-6 text-roar-blue group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Call Primary</span>
                    <strong className="text-sm font-bold text-roar-navy">6309763394</strong>
                  </div>
                </a>

                <a
                  href="tel:9490988856"
                  className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 hover:border-roar-blue transition-colors flex items-center gap-3 group"
                >
                  <Phone className="w-6 h-6 text-roar-blue group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Call Secondary</span>
                    <strong className="text-sm font-bold text-roar-navy">9490988856</strong>
                  </div>
                </a>
              </div>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/916309763394"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:roarupstuitions@gmail.com"
                className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-roar-blue transition-colors flex items-center gap-3 group block"
              >
                <Mail className="w-6 h-6 text-roar-blue" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block">Email Us</span>
                  <strong className="text-sm font-bold text-roar-navy">roarupstuitions@gmail.com</strong>
                </div>
              </a>
            </div>

            {/* Right Col: Send Message Form */}
            <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-extrabold text-roar-navy mb-2">Send Us a Message</h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below and our educational counseling team will respond promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-full">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full max-w-full box-border px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full max-w-full box-border px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full max-w-full box-border px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Inquiry *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your subject requirements, grade level, or question..."
                    className="w-full max-w-full box-border px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue bg-white text-sm resize-none"
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
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-roar-navy">Visit Our Tuition Center Location</h2>
              <p className="text-xs text-slate-500">Road No. 5, IDPL Colony, Vasanth Nagar, Near JNTU, Hyderabad</p>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-roar-yellow hover:bg-roar-yellow-hover text-roar-navy font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 text-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200 h-96 w-full relative">
            <iframe
              title="ROARUPS Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.358509893907!2d78.388889!3d17.491667!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzMwLjAiTiA3OMKwMjMnMjA4IkU!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
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
