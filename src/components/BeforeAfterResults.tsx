import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { BEFORE_AFTER_RESULTS } from '../data/content';

interface BeforeAfterResultsProps {
  language: Language;
}

export const BeforeAfterResults: React.FC<BeforeAfterResultsProps> = ({ language }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const currentItem = BEFORE_AFTER_RESULTS[activeItemIndex];

  return (
    <section id="results" className="py-20 bg-white text-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold border border-amber-200">
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'mr' ? 'प्रत्यक्ष क्षेत्रातील निकाल' : 'Proven Field Results'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {language === 'mr' ? 'मायक्रॉनिक वापरण्यापूर्वी आणि नंतरचा फरक' : 'Before vs. After Micronik Impact'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {language === 'mr'
              ? 'उत्कृष्ट फूलधारणा, एकसारखी सेटिंग, मण्यांची चकाकी आणि उत्पन्नात भरीव वाढ.'
              : 'Real photos comparing crop vigor, berry uniformity, leaf canopy density, and yield boosts.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mt-8">
          {BEFORE_AFTER_RESULTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveItemIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeItemIndex === idx
                  ? 'bg-[#B71C1C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'mr' ? item.titleMr : item.titleEn}
            </button>
          ))}
        </div>

        {/* Side-by-side Visual Comparison Cards */}
        <div className="mt-10 max-w-5xl mx-auto bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-[#F5C400] uppercase tracking-wider">
                {language === 'mr' ? currentItem.cropMr : currentItem.cropEn}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {language === 'mr' ? currentItem.titleMr : currentItem.titleEn}
              </h3>
            </div>

            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2E7D32] to-emerald-700 text-white font-extrabold text-sm shadow">
              {language === 'mr' ? currentItem.metricMr : currentItem.metricEn}
            </div>
          </div>

          {/* Comparison Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Before Photo */}
            <div className="space-y-3 group">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-700">
                <img
                  src={currentItem.beforeImage}
                  alt={currentItem.beforeLabelEn}
                  className="w-full h-full object-cover filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/90 text-red-400 text-xs font-extrabold border border-red-500/30">
                  {language === 'mr' ? 'आधी (Before)' : 'BEFORE MICRONIK'}
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium text-left">
                {language === 'mr' ? currentItem.beforeLabelMr : currentItem.beforeLabelEn}
              </p>
            </div>

            {/* After Photo */}
            <div className="space-y-3 group">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xl">
                <img
                  src={currentItem.afterImage}
                  alt={currentItem.afterLabelEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-950/90 text-emerald-300 text-xs font-extrabold border border-emerald-400/40 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>{language === 'mr' ? 'नंतर (After)' : 'AFTER MICRONIK'}</span>
                </div>
              </div>
              <p className="text-xs text-emerald-300 font-bold text-left">
                {language === 'mr' ? currentItem.afterLabelMr : currentItem.afterLabelEn}
              </p>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-slate-300 text-left bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {language === 'mr' ? currentItem.descriptionMr : currentItem.descriptionEn}
          </p>

        </div>
      </div>
    </section>
  );
};
