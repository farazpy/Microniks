import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, Sprout, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 text-slate-900 shadow-2xl border border-white/80"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-[#1B5E20] mb-1 shadow-sm border border-emerald-200">
              <Sprout className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {language === 'mr' ? 'मायक्रॉनिक ॲग्री मध्ये स्वागत' : 'Welcome to Micronik Agri'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'mr'
                ? 'तुमच्या गुगल खात्यासह १-क्लिक मध्ये लॉग इन करा व जलद खरेदी करा.'
                : 'Sign in with your Google account for 1-click orders and real-time tracking.'}
            </p>
          </div>

          {/* Value Props */}
          <div className="space-y-2.5 mb-6 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60">
            <div className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'mr' ? 'थेट पार्सल ट्रॅकिंग व डिजिटल इनव्हॉइस' : 'Live Order Tracking & Digital Invoices'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'mr' ? 'जतन केलेले शेताचे पत्ते (Auto Address Fill)' : 'Saved Farm Addresses & Instant Checkout'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'mr' ? 'शेतकरी विशेष सवलती व ऑफर्स' : 'Exclusive Farmer Discounts & Offers'}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-bold text-center">
              {error}
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base border border-slate-300 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#1B5E20]" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>{language === 'mr' ? 'Google सह पुढे जा' : 'Continue with Google'}</span>
          </button>

          <div className="mt-5 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? '१००% सुरक्षित Firebase प्रमाणीकरण' : '100% Secure Firebase Authentication'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
