import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MapPin, CheckCircle2, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { TESTIMONIALS_DATA } from '../data/content';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  return (
    <section className="py-20 bg-slate-50 text-slate-800 scroll-mt-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold border border-amber-200">
            <HeartHandshake className="w-4 h-4" />
            <span>{language === 'mr' ? 'शेतकऱ्यांचे मनोगत' : 'Farmer Testimonials'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {language === 'mr' ? 'नाशिकच्या बागायतदारांचा प्रत्यक्ष अनुभव' : 'Trusted by Thousands of Maharashtra Farmers'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {language === 'mr'
              ? 'द्राक्ष, टोमॅटो व डाळिंब उत्पादकांनी मांडलेले प्रामाणिक अनुभव आणि निकाल.'
              : 'Real feedback and verified yield improvements shared by growers in Nashik and surrounding districts.'}
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {TESTIMONIALS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-emerald-300 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-200 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#F5C400]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-normal">
                  "{language === 'mr' ? item.quoteMr : item.quoteEn}"
                </p>

                {/* Yield Gain Badge */}
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold">
                  ✓ {item.yieldGain}
                </div>
              </div>

              {/* Farmer Profile Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.nameEn}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                    <span>{language === 'mr' ? item.nameMr : item.nameEn}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  </h3>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B71C1C]" />
                    <span>{language === 'mr' ? item.locationMr : item.locationEn}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {language === 'mr' ? item.cropMr : item.cropEn}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
