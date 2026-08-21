import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageSquare, Mail, Copy, Check, X, ExternalLink } from 'lucide-react';
import { PRIMARY_WHATSAPP, SECONDARY_WHATSAPP, OFFICIAL_EMAIL } from '../../services/db';

interface SubmissionDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  whatsappUrl1?: string;
  whatsappUrl2?: string;
  mailtoUrl?: string;
  formattedText?: string;
}

export const SubmissionDispatchModal: React.FC<SubmissionDispatchModalProps> = ({
  isOpen,
  onClose,
  title = 'Submission Successful!',
  subtitle = 'Your inquiry has been prepared. Choose an option below to send directly to our team:',
  whatsappUrl1,
  whatsappUrl2,
  mailtoUrl,
  formattedText,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openUrl = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-roar-navy/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 p-6 sm:p-8"
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Badge & Title */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-extrabold text-roar-navy tracking-tight">{title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Direct Action Buttons */}
          <div className="space-y-3 mb-6">
            {/* Primary WhatsApp */}
            <button
              type="button"
              onClick={() => openUrl(whatsappUrl1)}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-between text-xs sm:text-sm group"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span className="truncate">Send to WhatsApp 1 ({PRIMARY_WHATSAPP})</span>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary WhatsApp */}
            <button
              type="button"
              onClick={() => openUrl(whatsappUrl2)}
              className="w-full py-3.5 px-4 bg-[#128C7E] hover:bg-[#0e7065] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-between text-xs sm:text-sm group"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span className="truncate">Send to WhatsApp 2 ({SECONDARY_WHATSAPP})</span>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Email Button */}
            <button
              type="button"
              onClick={() => openUrl(mailtoUrl)}
              className="w-full py-3.5 px-4 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-between text-xs sm:text-sm group"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 shrink-0" />
                <span className="truncate">Send to Email ({OFFICIAL_EMAIL})</span>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Formatted Text Preview & Copy */}
          {formattedText && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Formatted Summary
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-roar-blue hover:text-roar-blue-hover font-semibold flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] sm:text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto bg-white p-3 rounded-xl border border-slate-100">
                {formattedText}
              </pre>
            </div>
          )}

          {/* Close Action */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Done
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
