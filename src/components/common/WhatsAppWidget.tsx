import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('Hello ROARUPS, I want to enquire about Home Tuitions / Tuition Center learning.');

  const whatsappNumber = '916309763394';

  const handleStartChat = (message: string) => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Authentic WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-40 flex items-center gap-2"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-2 border-white group"
          aria-label="Official WhatsApp Support"
        >
          {/* Exact Official WhatsApp SVG Icon */}
          <svg className="w-6 h-6 sm:w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.261-1.118zm13.111-5.719c-.317-.159-1.875-.926-2.166-1.032-.29-.106-.502-.159-.714.159-.211.318-.82 1.032-1.005 1.244-.185.212-.37.238-.687.079-.317-.159-1.341-.494-2.556-1.577-.945-.843-1.583-1.884-1.768-2.202-.185-.318-.02-.49.139-.648.143-.143.317-.37.476-.555.159-.185.212-.318.317-.529.106-.212.053-.397-.026-.555-.079-.159-.714-1.72-.979-2.356-.257-.619-.519-.536-.714-.546-.185-.01-.397-.01-.608-.01-.212 0-.555.079-.847.397-.291.318-1.111 1.085-1.111 2.646 0 1.561 1.137 3.069 1.296 3.281.159.212 2.24 3.42 5.427 4.796 2.054.887 2.859.98 3.896.827.632-.093 1.875-.767 2.139-1.508.264-.741.264-1.376.185-1.508-.079-.133-.291-.212-.608-.371z"/>
          </svg>
          
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-roar-yellow rounded-full border-2 border-white animate-ping" />
          
          {/* Tooltip on desktop */}
          <span className="hidden md:inline-block absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp Support (6309763394)
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

            {/* Authentic WhatsApp Chat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-emerald-100"
            >
              {/* WhatsApp Green Chat Header */}
              <div className="bg-[#075E54] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#128C7E] flex items-center justify-center border-2 border-white/40 shadow-inner">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.261-1.118zm13.111-5.719c-.317-.159-1.875-.926-2.166-1.032-.29-.106-.502-.159-.714.159-.211.318-.82 1.032-1.005 1.244-.185.212-.37.238-.687.079-.317-.159-1.341-.494-2.556-1.577-.945-.843-1.583-1.884-1.768-2.202-.185-.318-.02-.49.139-.648.143-.143.317-.37.476-.555.159-.185.212-.318.317-.529.106-.212.053-.397-.026-.555-.079-.159-.714-1.72-.979-2.356-.257-.619-.519-.536-.714-.546-.185-.01-.397-.01-.608-.01-.212 0-.555.079-.847.397-.291.318-1.111 1.085-1.111 2.646 0 1.561 1.137 3.069 1.296 3.281.159.212 2.24 3.42 5.427 4.796 2.054.887 2.859.98 3.896.827.632-.093 1.875-.767 2.139-1.508.264-.741.264-1.376.185-1.508-.079-.133-.291-.212-.608-.371z"/>
                    </svg>
                  </div>
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

              {/* Chat Body & Message Options */}
              <div className="p-5 space-y-4 bg-[#E5DDD5]/40 min-h-[220px]">
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 max-w-[90%] space-y-1">
                  <p className="text-xs font-bold text-[#075E54]">ROARUPS Team</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Welcome to ROARUPS! How can we assist your educational needs today?
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Enquiry Presets:</p>

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

              {/* Action Footer */}
              <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleStartChat(customMsg)}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.261-1.118zm13.111-5.719c-.317-.159-1.875-.926-2.166-1.032-.29-.106-.502-.159-.714.159-.211.318-.82 1.032-1.005 1.244-.185.212-.37.238-.687.079-.317-.159-1.341-.494-2.556-1.577-.945-.843-1.583-1.884-1.768-2.202-.185-.318-.02-.49.139-.648.143-.143.317-.37.476-.555.159-.185.212-.318.317-.529.106-.212.053-.397-.026-.555-.079-.159-.714-1.72-.979-2.356-.257-.619-.519-.536-.714-.546-.185-.01-.397-.01-.608-.01-.212 0-.555.079-.847.397-.291.318-1.111 1.085-1.111 2.646 0 1.561 1.137 3.069 1.296 3.281.159.212 2.24 3.42 5.427 4.796 2.054.887 2.859.98 3.896.827.632-.093 1.875-.767 2.139-1.508.264-.741.264-1.376.185-1.508-.079-.133-.291-.212-.608-.371z"/>
                  </svg>
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
