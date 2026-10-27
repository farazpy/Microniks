import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Info, Stethoscope, Sparkles, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface HeroProps {
  language: Language;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden select-none">
      
      {/* Background Video & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter contrast-110 saturate-110 opacity-50 scale-105"
        >
          <source
            src="https://res.cloudinary.com/fxqqfzhm/video/upload/v1789500636/Camera_gliding_through_agricultu__1080p_20260916005730_gwr_video_mvp.mp4"
            type="video/mp4"
          />
          {/* Fallback Image if Video fails or on low data mode */}
          <img
            src="https://images.unsplash.com/photo-1596386461350-326ccb383e9f?q=80&w=1920&auto=format&fit=crop"
            alt="Indian Lush Vineyard Farmland Pimpalgaon"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-emerald-950/20 via-transparent to-slate-950/80" />
      </div>

      {/* Floating Wheat & Leaf Micro-Animations */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-[10%] text-[#4CAF50]/30 text-5xl"
        >
          🌿
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-[12%] text-[#F5C400]/30 text-6xl"
        >
          🌾
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 left-[18%] text-amber-400/20 text-4xl"
        >
          🍃
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-6 sm:space-y-8">
        
        {/* Top Doctor Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/80 text-emerald-200 border border-emerald-500/30 backdrop-blur-md max-w-full"
        >
          <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4CAF50] shrink-0" />
          <span className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase truncate">
            {language === 'mr' ? 'पिकांचे डॉक्टर • मातीचे शास्त्रज्ञ' : 'Doctors of Crops • Soil Science Experts'}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-ping shrink-0" />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full"
        >
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight sm:leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-emerald-200">
              Better Soil.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] via-emerald-300 to-amber-300">
              Better Crops.
            </span>
            <span className="block text-white underline decoration-[#4CAF50] underline-offset-8">
              Better Tomorrow.
            </span>
          </h1>

          <p className="text-xs sm:text-lg lg:text-xl text-emerald-100/90 font-semibold max-w-2xl mx-auto leading-relaxed pt-1 sm:pt-2">
            {language === 'mr' ? COMPANY_DETAILS.secondaryLineMr : COMPANY_DETAILS.secondaryLineEn}
          </p>
        </motion.div>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full max-w-md sm:max-w-none mx-auto"
        >
          <button
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-[#F5C400] to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group border border-amber-300/80 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{language === 'mr' ? 'उत्पादने खरेदी करा (Shop Now)' : 'Shop Products'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-[#1B5E20]/90 hover:bg-[#1B5E20] border border-[#4CAF50]/60 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CAF50]" />
            <span>{language === 'mr' ? 'आमच्याबद्दल जाणून घ्या' : 'About Micronik Agri'}</span>
          </button>
        </motion.div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-6 sm:pt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left w-full"
        >
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">50,000+</div>
            <div className="text-xs text-slate-300 font-bold">
              {language === 'mr' ? 'संतुष्ट शेतकरी' : 'Farmers Empowered'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4CAF50]">100%</div>
            <div className="text-xs text-slate-300 font-bold">
              {language === 'mr' ? 'लॅब प्रमाणित खते' : 'Lab Tested Quality'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">300+</div>
            <div className="text-xs text-slate-300 font-bold">
              {language === 'mr' ? 'डीलर नेटवर्क' : 'Authorized Dealers'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#4CAF50]">10+ Yrs</div>
            <div className="text-xs text-slate-300 font-bold">
              {language === 'mr' ? 'पिंपळगाव द्राक्ष अनुभव' : 'Grape Hub Science'}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
