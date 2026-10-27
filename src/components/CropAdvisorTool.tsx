import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sprout, ArrowRight, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface CropAdvisorToolProps {
  language: Language;
}

export const CropAdvisorTool: React.FC<CropAdvisorToolProps> = ({ language }) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('grapes');
  const [selectedStageId, setSelectedStageId] = useState<number>(0);

  const crops = [
    {
      id: 'grapes',
      nameMr: 'द्राक्ष (Grapes)',
      nameEn: 'Grapes',
      stages: [
        {
          id: 0,
          titleMr: 'ऑक्टोबर छाटणी / बेसल टप्पा (October Pruning)',
          titleEn: 'October Pruning / Basal Stage',
          recommendedMr: '१०० किलो बेसल डोस (बोरोमिक्स-५एफ १० किलो + सिल्कफर्ट ४० किलो + झिंकफर २५ किलो + मॅगप्रो २५ किलो)',
          recommendedEn: '100 KG Basal Formula (Boromix-5F 10kg + Silkfert 40kg + Zincfer 25kg + Magpro 25kg)',
          benefitMr: 'पांढऱ्या मुळांची प्रचंड वाढ, घड लांबी व मणी तडकणे पूर्ण रोखते.'
        },
        {
          id: 1,
          titleMr: 'पोगा व पोंगा अवस्था (Flower Bud Initiation)',
          titleEn: 'Flower Bud Initiation Stage',
          recommendedMr: 'झिंकफर (५ किलो) + ह्युमिक गोल्ड ड्रिपद्वारे',
          recommendedEn: 'Zincfer (5 KG) + Humic Gold via Drip',
          benefitMr: 'पेऱ्यांमधील अंतर योग्य ठेवून सुटसुटीत घड मिळतात.'
        },
        {
          id: 2,
          titleMr: 'फूलधारणा व सेटिंग (Flowering & Berry Set)',
          titleEn: 'Flowering & Berry Set Stage',
          recommendedMr: 'बोरोमिक्स-५एफ (२ ग्रॅम / लिटर फवारणी व आळवणी)',
          recommendedEn: 'Boromix-5F (2 gm/Litre Foliar & Drenching)',
          benefitMr: 'परागीभवन सुधारून मणी गळ रोखते व आकार एकसारखा करते.'
        },
        {
          id: 3,
          titleMr: 'मणी फुगवणी व शर्करा वाढ (Berry Elongation & Sugar Brix)',
          titleEn: 'Berry Elongation & Sugar Brix',
          recommendedMr: 'कॅल्शियम नायट्रेट प्लस + मॅगप्रो (१० किलो प्रति एकर)',
          recommendedEn: 'Calcium Nitrate Plus + Magpro (10 KG per acre)',
          benefitMr: 'मण्यांची चकाकी, वजन आणि टणकपणा वाढवते.'
        }
      ]
    },
    {
      id: 'tomato',
      nameMr: 'टोमॅटो (Tomato)',
      nameEn: 'Tomato',
      stages: [
        {
          id: 0,
          titleMr: 'लागवड व बेसल टप्पा (Planting & Bed Prep)',
          titleEn: 'Planting & Bed Prep',
          recommendedMr: 'सिल्कफर्ट (२५ किलो) + झिंकफर (१० किलो)',
          recommendedEn: 'Silkfert (25 KG) + Zincfer (10 KG)',
          benefitMr: 'झाडांची मुळे मजबूत करून पिकाचा पाया भक्कम करते.'
        },
        {
          id: 1,
          titleMr: 'फूलधारणा अवस्था (Flowering Stage)',
          titleEn: 'Flowering Stage',
          recommendedMr: 'बोरोमिक्स-५एफ (५ किलो प्रति एकर)',
          recommendedEn: 'Boromix-5F (5 KG per acre)',
          benefitMr: 'कळ्या गळणे थांबवून जास्तीत जास्त फळे सेट करते.'
        },
        {
          id: 2,
          titleMr: 'तोडा व पक्वता (Harvesting Pickings)',
          titleEn: 'Harvesting Pickings',
          recommendedMr: 'मॅगप्रो (१० किलो) + कॅल्शियम नायट्रेट (१० किलो)',
          recommendedEn: 'Magpro (10 KG) + Calcium Nitrate (10 KG)',
          benefitMr: 'फळांचा गर्द लाल रंग, चकाकी आणि बाजारात जास्त दर मिळवतो.'
        }
      ]
    },
    {
      id: 'pomegranate',
      nameMr: 'डाळिंब (Pomegranate)',
      nameEn: 'Pomegranate',
      stages: [
        {
          id: 0,
          titleMr: 'बहार विश्रांती व सुरुवात (Resting & Blooming)',
          titleEn: 'Resting & Blooming',
          recommendedMr: 'सिल्कफर्ट (४० किलो) + बोरोमिक्स-५एफ (१० किलो)',
          recommendedEn: 'Silkfert (40 KG) + Boromix-5F (10 KG)',
          benefitMr: 'डाळिंब फळे तडकणे ०% वर आणते.'
        }
      ]
    }
  ];

  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0];
  const currentStage = currentCrop.stages[selectedStageId] || currentCrop.stages[0];

  const handleWhatsAppConsultation = () => {
    const text = language === 'mr'
      ? `नमस्कार, मी माइक्रॉनिक वेबसाइटवरील क्रॉप अडव्हायझरवरून "${currentCrop.nameMr}" च्या "${currentStage.titleMr}" टप्प्यासाठी शिफारस पाहिली. याबद्दल अधिक माहिती हवी आहे.`
      : `Hello, I checked the Crop Advisor tool for "${currentCrop.nameEn}" at stage "${currentStage.titleEn}". Please advise on ordering.`;

    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white text-slate-800 border-y border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl text-left space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B71C1C]" />
                <span>{language === 'mr' ? 'स्मार्ट पीक सल्लागार टूल' : 'Smart Crop Recommendation Tool'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'mr' ? 'पिकानुसार त्वरित खत डोस निवडा' : 'Select Crop → Stage → Instant Recommendation'}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">{language === 'mr' ? 'पीक निवडा:' : 'Select Crop:'}</span>
              <div className="flex gap-1.5">
                {crops.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCropId(c.id);
                      setSelectedStageId(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCropId === c.id
                        ? 'bg-[#B71C1C] text-white shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {language === 'mr' ? c.nameMr : c.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Growth Stage Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              {language === 'mr' ? '२. पिकाची सध्याची अवस्था निवडा (Select Growth Stage):' : '2. Select Crop Growth Stage:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {currentCrop.stages.map((stg, sIdx) => (
                <button
                  key={stg.id}
                  onClick={() => setSelectedStageId(sIdx)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                    selectedStageId === sIdx
                      ? 'bg-amber-100/80 border-amber-400 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="line-clamp-1">{language === 'mr' ? stg.titleMr : stg.titleEn}</span>
                  {selectedStageId === sIdx && <CheckCircle2 className="w-4 h-4 text-[#B71C1C] shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Output Result Box */}
          <motion.div
            key={`${selectedCropId}-${selectedStageId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white space-y-4 shadow-xl border border-emerald-500/30"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase text-amber-300">
                  {language === 'mr' ? 'मायक्रॉनिक शिफारस डोस' : 'Micronik Recommended Combo'}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {language === 'mr' ? currentStage.titleMr : currentStage.titleEn}
                </h4>
              </div>

              <div className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-extrabold">
                100% Proven Result
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-300 uppercase">
                {language === 'mr' ? 'वापरावयाचे खत व प्रमाण:' : 'Recommended Products & Quantity:'}
              </div>
              <div className="text-base sm:text-lg font-bold text-white bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                {language === 'mr' ? currentStage.recommendedMr : currentStage.recommendedEn}
              </div>
              <p className="text-xs text-slate-300">
                ✓ <strong className="text-white">{language === 'mr' ? 'फायदा:' : 'Benefit:'}</strong> {currentStage.benefitMr}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full sm:w-auto py-3 px-6 rounded-xl font-extrabold text-xs sm:text-sm text-slate-950 bg-[#F5C400] hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{language === 'mr' ? 'हा डोस मागवण्यासाठी व्हॉट्सॲप करा' : 'Order This Schedule on WhatsApp'}</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
