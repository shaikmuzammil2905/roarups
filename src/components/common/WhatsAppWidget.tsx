import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('Hello ROARUPS, I want to enquire about Home Tuitions / Tuition Center learning in Hyderabad.');

  const whatsappNumber = '916309763394';

  const handleStartChat = (message: string) => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Crisp WhatsApp Floating Button Matching Reference Image 5 Exactly */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 lg:bottom-8 lg:right-8 z-50 flex items-center gap-2"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative group transition-transform hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none"
          aria-label="Official WhatsApp Support"
        >
          {/* Subtle Pulse Animation */}
          <span className="absolute -inset-1 rounded-3xl bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

          {/* Exact WhatsApp Icon from Reference Image 5 */}
          <img
            src="/assets/whatsapp-icon.png"
            alt="WhatsApp Support"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-[0_10px_25px_rgba(37,211,102,0.45)] relative z-10 transition-shadow"
          />

          {/* Tooltip on Desktop */}
          <span className="hidden lg:inline-block absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp Support (6309763394)
          </span>
        </button>
      </motion.div>

      {/* Official WhatsApp Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-roar-navy/60 backdrop-blur-sm"
            />

            {/* Popup Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-emerald-100"
            >
              {/* WhatsApp Green Chat Header */}
              <div className="bg-[#075E54] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/whatsapp-icon.png"
                    alt="WhatsApp"
                    className="w-12 h-12 rounded-xl shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-base leading-tight">ROARUPS Academic Support</h3>
                    <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      Online • 6309763394
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Content & Presets */}
              <div className="p-5 space-y-4 bg-[#E5DDD5]/40 min-h-[200px]">
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 max-w-[90%] space-y-1">
                  <p className="text-xs font-bold text-[#075E54]">ROARUPS Academic Team</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Hello! How can we assist your tuition or academic enquiry today?
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Presets:</p>

                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I am looking for Home Tuitions for my child.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] hover:bg-emerald-50/60 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between shadow-sm"
                  >
                    <span>🏡 Home Tuitions Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-[#25D366]" />
                  </button>

                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I want details regarding Tuition Center batches at Vasanth Nagar.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] hover:bg-emerald-50/60 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between shadow-sm"
                  >
                    <span>🏫 Tuition Center Batch Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-[#25D366]" />
                  </button>

                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I am a qualified Tutor interested in teaching opportunities.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] hover:bg-emerald-50/60 text-xs font-semibold text-slate-800 transition-all flex items-center justify-between shadow-sm"
                  >
                    <span>👨‍🏫 Tutor Registration Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-[#25D366]" />
                  </button>
                </div>

                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Custom Message:</label>
                  <textarea
                    rows={2}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#25D366] focus:border-transparent resize-none shadow-sm"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleStartChat(customMsg)}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <img src="/assets/whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5 rounded-lg" />
                  <span>Start WhatsApp Chat (6309763394)</span>
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 px-2 pt-1">
                  <span>Alternative Call:</span>
                  <a href="tel:9490988856" className="font-bold text-roar-blue hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> 9490988856
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
