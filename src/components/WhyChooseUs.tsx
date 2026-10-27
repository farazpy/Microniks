import React from 'react';
import { motion } from 'motion/react';
import { Award, FlaskConical, TrendingUp, Sprout, Users, ShieldCheck, Check } from 'lucide-react';
import { Language } from '../types';
import { WHY_CHOOSE_US } from '../data/content';

interface WhyChooseUsProps {
  language: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-7 h-7 text-[#B71C1C]" />;
      case 'FlaskConical':
        return <FlaskConical className="w-7 h-7 text-[#2E7D32]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-[#B71C1C]" />;
      case 'Grape':
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-[#2E7D32]" />;
      case 'Users':
        return <Users className="w-7 h-7 text-[#B71C1C]" />;
      default:
        return <ShieldCheck className="w-7 h-7 text-[#F5C400]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-slate-50 text-slate-800 scroll-mt-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold border border-amber-200">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'mr' ? 'विश्वासार्हता व दर्जा' : 'Trust & Excellence'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {language === 'mr' ? 'शेतकरी माइक्रॉनिक का निवडतात?' : 'Why Farmers Choose Micronik'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {language === 'mr'
              ? 'पिंपळगाव बसवंत व नाशिक भागातील २५,००० पेक्षा जास्त शेतकऱ्यांचा अतूट विश्वास'
              : 'Unmatched field performance, lab precision, and crop yield enhancement across Maharashtra'}
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 text-left">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative p-8 rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Card Accent Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/60 to-transparent rounded-tr-2xl pointer-events-none group-hover:from-amber-200/80 transition-colors" />

              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:bg-amber-400/20 group-hover:border-amber-400 transition-colors">
                  {getIcon(item.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#B71C1C] transition-colors">
                  {language === 'mr' ? item.titleMr : item.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {language === 'mr' ? item.descMr : item.descEn}
                </p>
              </div>

              {/* Bottom Tagline */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#2E7D32]">
                <Check className="w-4 h-4 text-[#F5C400]" />
                <span>{language === 'mr' ? '१००% गुणवत्तेची खात्री' : '100% Quality Guaranteed'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
