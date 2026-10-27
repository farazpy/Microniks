import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Info, Layers, Award } from 'lucide-react';
import { Language } from '../types';
import { BASAL_DOSE_ITEMS, COMPANY_DETAILS } from '../data/content';

interface GrapeBasalDoseSectionProps {
  language: Language;
}

export const GrapeBasalDoseSection: React.FC<GrapeBasalDoseSectionProps> = ({ language }) => {
  const [acreage, setAcreage] = useState<number>(1);

  const totalKgPerAcre = 100;
  const totalCalculatedKg = acreage * totalKgPerAcre;

  const handleWhatsAppCalculatorOrder = () => {
    const text = language === 'mr'
      ? `नमस्कार, मला माझ्या ${acreage} एकर द्राक्ष बागेसाठी एकूण ${totalCalculatedKg} किलो (माइक्रॉनिक १०० किलो बेसल डोस) ऑर्डर करायचा आहे.`
      : `Hello, I would like to order the 100 KG Basal Dose for my ${acreage} acre vineyard (Total: ${totalCalculatedKg} KG).`;

    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="basal-dose" className="py-20 bg-slate-900 text-white scroll-mt-16 relative overflow-hidden">
      {/* Decorative Background Vineyard Mesh */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1537084642907-629340c7e59c?q=80&w=1920&auto=format&fit=crop"
          alt="Grape Vineyard Mesh Background"
          className="w-full h-full object-cover filter blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-[#F5C400] text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-[#F5C400]" />
            <span>{language === 'mr' ? 'द्राक्ष बागायतदारांचा मानबिंदू' : 'Special Grape Farming Solution'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {language === 'mr' ? '१०० किलो बेसल डोस ( Basal Dose Formula )' : '100 KG Basal Dose Recommendation'}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            {language === 'mr'
              ? 'नाशिकच्या द्राक्ष बागायतदारांसाठी ऑक्टोबर छाटणीवेळी पांढऱ्या मुळांची वाढ, घड लांबी आणि मणी तडकणे रोखण्यासाठीचा परिपूर्ण डोस.'
              : 'Exact scientific ratio recommended for October grape pruning to establish root mass and uniform berry set.'}
          </p>
        </div>

        {/* Visual Infographic Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Infographic Chart (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#F5C400]">
                    {language === 'mr' ? 'शास्त्रीय खत मिश्रण प्रमाण' : 'Scientific Composition Ratio'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'mr' ? 'प्रति एकर शिफारस केलेला डोस' : 'Recommended per 1 Acre Vineyard'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400">100 KG</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-widest">
                    {language === 'mr' ? 'एकूण प्रमाण' : 'Total Net Weight'}
                  </span>
                </div>
              </div>

              {/* Progress Bar Infographic */}
              <div className="space-y-4">
                {BASAL_DOSE_ITEMS.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {language === 'mr' ? item.productNameMr : item.productNameEn}
                      </span>
                      <span className="text-[#F5C400] font-extrabold">{item.quantityKg} KG ({item.percentage}%)</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 pl-4">
                      {language === 'mr' ? item.descriptionMr : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#F5C400] shrink-0" />
                  <div className="text-xs text-slate-200">
                    <strong className="text-white block font-bold">
                      {language === 'mr' ? 'द्राक्ष मणी तडकणे ०% व मण्यांची चकाकी!' : '0% Berry Cracking & Maximum Shine'}
                    </strong>
                    {language === 'mr' ? 'ऑक्टोबर छाटणी वेळी जमिनीतून बेसल डोस म्हणून द्यावे.' : 'Apply into soil trenches during October vineyard pruning.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Acreage Calculator (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-amber-500/40 shadow-2xl relative text-left"
            >
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>{language === 'mr' ? 'द्राक्ष बाग डोस कॅल्क्युलेटर' : 'Acreage Requirement Calculator'}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {language === 'mr' ? 'तुमच्या बागेसाठी खताचे प्रमाण मोजा' : 'Calculate Your Vineyard Requirement'}
              </h3>

              <p className="text-xs text-slate-300 mt-1">
                {language === 'mr' ? 'क्षेत्र निवडा आणि लागणाऱ्या पोत्यांची संख्या पहा:' : 'Select acreage to estimate exact bag quantities:'}
              </p>

              {/* Slider Input */}
              <div className="my-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-300">{language === 'mr' ? 'द्राक्ष बाग क्षेत्र (Acres):' : 'Vineyard Area (Acres):'}</span>
                  <span className="text-2xl font-extrabold text-[#F5C400]">{acreage} {language === 'mr' ? 'एकर' : 'Acre(s)'}</span>
                </div>

                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  className="w-full accent-[#F5C400] cursor-pointer h-2 bg-slate-700 rounded-lg"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>0.5 Acre</span>
                  <span>5 Acres</span>
                  <span>10 Acres</span>
                  <span>20 Acres</span>
                </div>
              </div>

              {/* Calculated Breakdown List */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {language === 'mr' ? `एकूण ${acreage} एकरासाठी लागणारी खते:` : `Total Requirement for ${acreage} Acre(s):`}
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span>बोरोमिक्स-५एफ (10 KG Bag)</span>
                  <span className="font-bold text-[#F5C400]">{acreage * 10} KG ({Math.ceil((acreage * 10) / 10)} {language === 'mr' ? 'बॅग' : 'Bag'})</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span>सिल्कफर्ट (40 KG Bag)</span>
                  <span className="font-bold text-[#F5C400]">{acreage * 40} KG ({Math.ceil((acreage * 40) / 40)} {language === 'mr' ? 'बॅग' : 'Bag'})</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span>झिंकफर (25 KG Bag)</span>
                  <span className="font-bold text-[#F5C400]">{acreage * 25} KG ({Math.ceil((acreage * 25) / 25)} {language === 'mr' ? 'बॅग' : 'Bag'})</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-200">
                  <span>मॅगप्रो (25 KG Bag)</span>
                  <span className="font-bold text-[#F5C400]">{acreage * 25} KG ({Math.ceil((acreage * 25) / 25)} {language === 'mr' ? 'बॅग' : 'Bag'})</span>
                </div>
              </div>

              {/* Total Calculation Highlight & Order CTA */}
              <div className="mt-6 pt-4 border-t border-slate-700/80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-semibold">{language === 'mr' ? 'एकूण खत प्रमाण:' : 'Total Fertilizer Volume:'}</span>
                  <span className="text-2xl font-extrabold text-emerald-400">{totalCalculatedKg} KG</span>
                </div>

                <button
                  onClick={handleWhatsAppCalculatorOrder}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#2E7D32] to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <span>{language === 'mr' ? 'ही ऑर्डर व्हॉट्सॲपवर पाठवा' : 'Send Order to WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
