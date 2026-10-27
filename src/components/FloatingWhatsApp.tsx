import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface FloatingWhatsAppProps {
  language: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    {
      labelMr: '🍇 द्राक्ष १०० किलो बेसल डोस दर',
      labelEn: '🍇 100 KG Grape Basal Dose Rate',
      textMr: 'नमस्कार, मला १ एकर द्राक्ष बागेसाठी १०० किलो बेसल डोसचा दर व डिलिव्हरी माहिती हवी आहे.',
      textEn: 'Hello, I want rate & delivery details for 100 KG Grape Basal Dose.'
    },
    {
      labelMr: '🏬 डीलरशिप व विक्री एजन्सी चौकशी',
      labelEn: '🏬 Become a Dealer Inquiry',
      textMr: 'नमस्कार, मला माइक्रॉनिक खतांची डीलरशिप / एजन्सी हवी आहे.',
      textEn: 'Hello, I am interested in becoming a Micronik dealer.'
    },
    {
      labelMr: '🌾 इतर पिकांसाठी खत नियोजन',
      labelEn: '🌾 Fertilizer Schedule Advice',
      textMr: 'नमस्कार, मला माझ्या पिकासाठी मायक्रॉनिक खतांचे शेड्युल हवे आहे.',
      textEn: 'Hello, I need fertilizer schedule advice for my crop.'
    }
  ];

  const handleOpenWhatsApp = (text: string) => {
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-900 border border-emerald-500/40 p-5 shadow-sm text-left text-white space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">
                    {COMPANY_DETAILS.contactPerson} (Micronik Agri)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {language === 'mr' ? 'ऑनलाइन ऑन-ड्युटी' : 'Active Helpline'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {language === 'mr'
                ? 'नमस्कार! त्वरित उत्तारासाठी खालीलपैकी एक पर्याय निवडा:'
                : 'Welcome! Choose a topic below for instant response:'}
            </p>

            {/* Quick Buttons */}
            <div className="space-y-2">
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(language === 'mr' ? msg.textMr : msg.textEn)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-[#2E7D32] text-xs font-bold text-slate-200 hover:text-white text-left transition-colors flex items-center justify-between border border-slate-700/80 group"
                >
                  <span>{language === 'mr' ? msg.labelMr : msg.labelEn}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-amber-300 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'थेट कॉलिंग: ८८०५४५२२८८' : 'Call Directly: 8805452288'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#2E7D32] to-emerald-600 text-white font-extrabold text-sm shadow-sm hover:scale-105 transition-all duration-300 border border-emerald-400/50"
        aria-label="WhatsApp Helpline"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="hidden sm:inline font-extrabold">WhatsApp</span>
      </button>
    </div>
  );
};
