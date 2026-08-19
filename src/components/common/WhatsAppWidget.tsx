import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Phone } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('Hello ROARUPS, I want to enquire about home tuitions / tuition center.');

  const whatsappNumber = '916309763394';

  const handleStartChat = (message: string) => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Sticky Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-40 flex items-center gap-2"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-2 border-white group"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 sm:w-7 h-7 fill-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-roar-yellow rounded-full border-2 border-white animate-ping" />
          
          {/* Tooltip on desktop */}
          <span className="hidden md:inline-block absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp Enquiry (6309763394)
          </span>
        </button>
      </motion.div>

      {/* WhatsApp Modal Popup */}
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
              {/* WhatsApp Header */}
              <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <MessageSquare className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg leading-tight">ROARUPS WhatsApp</h3>
                    <p className="text-xs text-emerald-100 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      Official Support • 6309763394
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

              {/* Chat Body & Quick Presets */}
              <div className="p-6 space-y-4 bg-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Enquiry Option:</p>

                <div className="space-y-2">
                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I am looking for Home Tuitions for my child.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-between"
                  >
                    <span>🏡 Home Tuitions Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I want details regarding Tuition Center batches at Vasanth Nagar.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-between"
                  >
                    <span>🏫 Tuition Center Batch Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => handleStartChat('Hi ROARUPS, I am a qualified Tutor interested in teaching opportunities.')}
                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 transition-all flex items-center justify-between"
                  >
                    <span>👨‍🏫 Tutor Registration Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Custom Message:</label>
                  <textarea
                    rows={2}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Direct Call & WhatsApp Action Footer */}
              <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleStartChat(customMsg)}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Chat (6309763394)</span>
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 px-2 pt-1">
                  <span>Alternative Phone:</span>
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
