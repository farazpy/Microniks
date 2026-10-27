import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, ShieldCheck, CheckCircle2, AlertTriangle, X, Search, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AuthenticityModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AuthenticityModal: React.FC<AuthenticityModalProps> = ({ isOpen, onClose, language }) => {
  const [batchCode, setBatchCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<'success' | 'invalid' | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchCode.trim()) return;

    // Simulate batch verification
    if (batchCode.length >= 4) {
      setVerificationResult('success');
    } else {
      setVerificationResult('invalid');
    }
  };

  const sampleCodes = ['MIC-2026-9821', 'BORO-5F-4410', 'SILK-40K-8821'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-100 text-[#2E7D32]">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {language === 'mr' ? 'खत ओरिजिनल असल्याचे तपासा' : 'Verify Product Authenticity'}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {language === 'mr' ? 'माइक्रॉनिक पॅकेजिंगवरील बॅच कोड किंवा क्यूआर नंबर टाका' : 'Enter the batch QR code printed on your product bag'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {language === 'mr' ? 'बॅच कोड / QR नंबर (Batch Code):' : 'Batch Serial Number:'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={batchCode}
                      onChange={(e) => {
                        setBatchCode(e.target.value);
                        setVerificationResult(null);
                      }}
                      placeholder="उदा. MIC-2026-9821"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-sm font-bold uppercase tracking-wider pl-10"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                  <span>{language === 'mr' ? 'नमुना कोड वापरून पहा:' : 'Try sample batch code:'}</span>
                  {sampleCodes.map((code) => (
                    <button
                      type="button"
                      key={code}
                      onClick={() => {
                        setBatchCode(code);
                        setVerificationResult('success');
                      }}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] hover:bg-slate-200"
                    >
                      {code}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-extrabold text-sm text-white bg-[#2E7D32] hover:bg-[#236327] transition-colors shadow"
                >
                  {language === 'mr' ? 'खात्री करा (Verify Now)' : 'Verify Batch Authenticity'}
                </button>
              </form>

              {/* Result Notification */}
              {verificationResult === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-[#2E7D32] font-extrabold text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>{language === 'mr' ? '१००% मूळ व प्रमाणित उत्पादक (Certified Original!)' : '100% Authentic Micronik Product'}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {language === 'mr'
                      ? `बॅच कोड "${batchCode}" पिंपळगाव बसवंत लॅबमध्ये तपासलेला व १००% ओरिजिनल आहे.`
                      : `Batch "${batchCode}" is genuine, lab-verified, and manufactured at Pimpalgaon Baswant works.`}
                  </p>
                </div>
              )}

              {verificationResult === 'invalid' && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-300 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-[#B71C1C] font-extrabold text-sm">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{language === 'mr' ? 'अवैध कोड किंवा बनावट शंका' : 'Invalid Batch Code'}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {language === 'mr'
                      ? 'कृपया पॅकेजिंगवरील कोड पुन्हा तपासा किंवा थेट बी. एम. सोनवणे (८८०५४५२२८८) यांच्याशी संपर्क साधा.'
                      : 'Please check code spelling or contact helpline 8805452288.'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
