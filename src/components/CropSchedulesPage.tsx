import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Calculator, 
  Sprout, 
  CheckCircle2, 
  ShoppingBag, 
  Phone, 
  MessageSquare, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Layers,
  Leaf,
  Info
} from 'lucide-react';
import { Language, Product } from '../types';
import { CROP_SOLUTIONS, BASAL_DOSE_ITEMS, COMPANY_DETAILS } from '../data/content';

interface CropSchedulesPageProps {
  language: Language;
  onAddToCart: (product: Product, quantity?: number) => void;
  products: Product[];
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CropSchedulesPage: React.FC<CropSchedulesPageProps> = ({
  language,
  onAddToCart,
  products,
  onNavigate,
  onSelectProduct,
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('grapes');
  const [acreage, setAcreage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'schedule' | 'calculator' | 'deficiencies'>('schedule');

  const activeCrop = CROP_SOLUTIONS.find((c) => c.id === selectedCropId) || CROP_SOLUTIONS[0];

  // Basal Kit calculation per acre:
  // 1 acre = Silkfert (40kg - 1 bag), Boromix-5F (10kg - 1 bag), Zincfer (25kg - 1 bag), Magpro (25kg - 1 bag)
  const basalKit = [
    {
      id: 'micsell-bm-40',
      nameMr: 'सिल्कफर्ट / मायक्सेल बीएम-४० (Silkfert BM-40)',
      nameEn: 'Silkfert / MICSELL BM-40',
      bagsPerAcre: 1,
      bagWeightKg: 40,
      roleMr: 'सेंद्रिय कर्ब, पांढऱ्या मुळांची प्रचंड वाढ व माती सुपीकता',
      roleEn: 'Organic carbon backbone, stimulates massive white feeder roots',
      color: 'bg-amber-500',
    },
    {
      id: 'boromix-sf',
      nameMr: 'बोरोमिक्स-५एफ / एसएफ (BOROMIX-5F)',
      nameEn: 'BOROMIX-5F / SF Micro-Grade',
      bagsPerAcre: 1,
      bagWeightKg: 10,
      roleMr: 'बोरॉन + ५ सूक्ष्म अन्नद्रव्ये, मणी तडकणे ०% व एकसारखी सेटिंग',
      roleEn: 'Boron + 5 essential micronutrients, stops fruit cracking',
      color: 'bg-red-500',
    },
    {
      id: 'zincfer',
      nameMr: 'झिंकफर (ZINCFER Chealted/Granular)',
      nameEn: 'ZINCFER Active Zinc Nutrition',
      bagsPerAcre: 1,
      bagWeightKg: 25,
      roleMr: 'संजीवकांची निर्मिती, पानांचा आकार व घड पेऱ्यांमधील अंतर योग्य',
      roleEn: 'Natural auxin synthesis, bunch internode spacing & leaf size',
      color: 'bg-emerald-600',
    },
    {
      id: 'magpro',
      nameMr: 'मॅग्प्रो (MAGPRO High Purity)',
      nameEn: 'MAGPRO Magnesium Sulphate',
      bagsPerAcre: 1,
      bagWeightKg: 25,
      roleMr: 'हरितद्रव्य निर्मिती व प्रकाशसंश्लेषण गतिमान करून पाने गर्द हिरवी',
      roleEn: 'Intense chlorophyll synthesis for vigorous green canopy',
      color: 'bg-green-500',
    },
  ];

  const handleAddFullBasalKit = () => {
    basalKit.forEach((item) => {
      const matchedProd = products.find((p) => p.id === item.id) || products[0];
      onAddToCart(matchedProd, item.bagsPerAcre * acreage);
    });
  };

  const deficiencies = [
    {
      element: 'Zinc (झिंक कमतरता)',
      symbol: 'Zn',
      symptomMr: 'नवी पाने लहान व अरुंद होतात (Rosetting), पानांच्या शिरांमध्ये पिवळे पट्टे पडतात, पेऱ्यांमधील अंतर आखूड होते.',
      symptomEn: 'Small rosette leaves, interveinal yellowing on new flushes, stunted bunch internodes.',
      solutionMr: 'झिंकफर (ZINCFER) १०-२५ किलो प्रति एकर बेसल डोस किंवा २ ग्रॅम/लिटर फवारणी.',
      solutionEn: 'ZINCFER 10-25 KG per acre basal or 2 gm/Litre foliar spray.',
      productId: 'zincfer',
    },
    {
      element: 'Boron (बोरॉन कमतरता)',
      symbol: 'B',
      symptomMr: 'मणी तडकणे, कळ्या गळणे, फळांवर काळे डाग व घडांचा आकार वाकडा-तिकडा होणे.',
      symptomEn: 'Fruit splitting/cracking, severe flower blossom drop, uneven deformed berries.',
      solutionMr: 'बोरोमिक्स-५एफ (BOROMIX-5F) १० किलो बेसल किंवा १.५ ग्रॅम/लिटर फवारणी.',
      solutionEn: 'BOROMIX-5F 10 KG basal kit or 1.5 gm/Litre foliar spray.',
      productId: 'boromix-sf',
    },
    {
      element: 'Magnesium (मॅग्नेशियम कमतरता)',
      symbol: 'Mg',
      symptomMr: 'जुन्या पानांच्या शिरा सोडून उर्वरित भाग पिवळा पडतो (Interveinal Chlorosis), प्रकाशसंश्लेषण मंदावते.',
      symptomEn: 'Bottom leaves turn yellow between dark green veins, sluggish sugar accumulation.',
      solutionMr: 'मॅगप्रो (MAGPRO) २५ किलो बेसल किंवा १० किलो ड्रिपद्वारे देणे.',
      solutionEn: 'MAGPRO 25 KG per acre basal or 10 KG via drip fertigation.',
      productId: 'magpro',
    },
    {
      element: 'Iron & Trace Minerals (लोह व सूक्ष्म कमतरता)',
      symbol: 'Fe+',
      symptomMr: 'शेंड्याची कोवळी पाने पूर्णपणे पांढरी किंवा फिकट पिवळी पडतात, झाडाची वाढ खुंटते.',
      symptomEn: 'Top young leaves turn ivory white/pale yellow, stunted apical shoot growth.',
      solutionMr: 'मायक्सेल बीएम-२० / बीएम-३० (MICSELL BM-20) ५०० ग्रॅम प्रति एकर फवारणी.',
      solutionEn: 'MICSELL BM-20 / BM-30 500 GM per acre foliar spray.',
      productId: 'micsell-bm-20',
    },
  ];

  return (
    <div className="py-8 sm:py-12 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Hero Glass Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/90 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5E20] text-white text-xs font-black">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'मायक्रॉनिक कृषी वेळापत्रक व सल्ला' : 'Scientific Crop Schedules & Dosages'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'टप्पा-निहाय पीक पोषण वेळापत्रक व बेसल डोस'
                : 'Stage-Wise Crop Nutrition & Basal Formula'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
              {language === 'mr'
                ? 'द्राक्ष, डाळिंब, टोमॅटो व भाजीपाला पिकांसाठी शास्त्रोक्त पद्धतीने तयार केलेले खत व्यवस्थापन वेळापत्रक. एकरनुसार अचूक खत प्रमाण मोजा.'
                : 'Field-tested agronomy schedules engineered for Nashik viticulture, pomegranate orchards, and vegetable farms. Calculate exact fertilizer bags for your acreage.'}
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'glass-card text-slate-700 hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5" />
                  {language === 'mr' ? '१. पीक वेळापत्रक' : '1. Crop Schedules'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'glass-card text-slate-700 hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'mr' ? '२. एकर बेसल डोस कॅल्क्युलेटर' : '2. Basal Acreage Calculator'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('deficiencies')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'deficiencies'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'glass-card text-slate-700 hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  {language === 'mr' ? '३. अन्नद्रव्य कमतरता ओळख' : '3. Deficiency Diagnostics'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Crop Schedules */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Crop Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CROP_SOLUTIONS.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`px-4 py-3 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap border cursor-pointer ${
                    selectedCropId === crop.id
                      ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md scale-105'
                      : 'glass-card text-slate-700 border-white/80 hover:bg-white'
                  }`}
                >
                  {language === 'mr' ? crop.cropNameMr : crop.cropNameEn}
                </button>
              ))}
            </div>

            {/* Selected Crop Overview Banner */}
            <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-md flex flex-col md:flex-row items-center gap-6">
              <img
                src={activeCrop.image}
                alt=""
                className="w-full md:w-56 h-44 object-cover rounded-2xl border border-slate-200 shadow-sm shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-3 flex-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1B5E20] text-[11px] font-black">
                    {language === 'mr' ? 'प्रमाणित वेळापत्रक' : 'Certified Agronomy Schedule'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {activeCrop.stages.length} {language === 'mr' ? 'महत्त्वाचे टप्पे' : 'Growth Stages'}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  {language === 'mr' ? activeCrop.cropNameMr : activeCrop.cropNameEn}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  {language === 'mr' ? activeCrop.descriptionMr : activeCrop.descriptionEn}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                      `नमस्कार, मला ${language === 'mr' ? activeCrop.cropNameMr : activeCrop.cropNameEn} पिकाच्या खत वेळापत्रकाबद्दल माहिती हवी आहे.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'सल्लागारांशी व्हॉट्सॲपवर बोला' : 'Consult Agronomist on WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>{language === 'mr' ? 'संबंधित खते खरेदी करा' : 'Buy Recommended Products'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stages Timeline Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#1B5E20]" />
                <span>{language === 'mr' ? 'टप्पा-निहाय फवारणी व आळवणी डोस' : 'Stage-Wise Spray & Drenching Schedule'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCrop.stages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl glass-card p-5 border border-white/90 shadow-md space-y-3 text-left relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-xl bg-[#1B5E20] text-white text-xs font-black flex items-center justify-center shadow">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {language === 'mr' ? 'टप्पा' : 'Stage'} {idx + 1}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {language === 'mr' ? stage.stageMr : stage.stageEn}
                    </h4>

                    <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-2 text-xs">
                      <div>
                        <span className="font-extrabold text-[#1B5E20] block">
                          {language === 'mr' ? 'शिफारस केलेले खत:' : 'Recommended Product:'}
                        </span>
                        <span className="font-bold text-slate-800">
                          {language === 'mr' ? stage.productMr : stage.productEn}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">{language === 'mr' ? 'प्रमाण / डोस:' : 'Dosage:'}</span>
                        <span className="font-black text-slate-900">{language === 'mr' ? stage.dosageMr : stage.dosageEn}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Basal Dose Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-lg space-y-6">
              
              {/* Acreage Input Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-[#1B5E20]" />
                    <span>{language === 'mr' ? '१०० किलो बेसल डोस कॅल्क्युलेटर' : '100 KG Signature Basal Calculator'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {language === 'mr'
                      ? 'तुमच्या शेताचे क्षेत्र निवडा आणि अचूक खतांच्या गोण्यांची संख्या मिळवा.'
                      : 'Select your vineyard / orchard area to compute exact bag counts.'}
                  </p>
                </div>

                {/* Acreage Selector */}
                <div className="flex items-center gap-3 bg-white/90 p-2 rounded-2xl border border-slate-300 shadow-inner">
                  <span className="text-xs font-black text-slate-700 pl-2">
                    {language === 'mr' ? 'एकूण एकर:' : 'Total Acres:'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 5, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setAcreage(num)}
                        className={`w-9 h-9 rounded-xl font-black text-xs transition-all cursor-pointer ${
                          acreage === num
                            ? 'bg-[#1B5E20] text-white shadow-md scale-105'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={acreage}
                    onChange={(e) => setAcreage(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 py-1.5 px-2 rounded-xl border border-slate-300 text-center font-black text-xs"
                    title="Custom Acreage"
                  />
                </div>
              </div>

              {/* Formula Table / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {basalKit.map((item, idx) => {
                  const totalKg = item.bagWeightKg * acreage;
                  const totalBags = item.bagsPerAcre * acreage;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl glass-card p-4 border border-white/90 shadow-sm space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-xs font-black text-[#1B5E20] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {totalBags} {language === 'mr' ? 'बॅग' : 'Bag(s)'}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                          {language === 'mr' ? item.nameMr : item.nameEn}
                        </h4>

                        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                          {language === 'mr' ? item.roleMr : item.roleEn}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {language === 'mr' ? 'एकूण वजन:' : 'Total Weight:'}
                        </span>
                        <span className="text-sm font-black text-slate-900">{totalKg} KG</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary and 1-Click Order */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs text-amber-300 font-black uppercase tracking-wider">
                    {acreage} {language === 'mr' ? 'एकर बेसल डोस संच' : 'Acre Complete Basal Kit'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black">
                    {language === 'mr' ? `एकूण ${acreage * 4} बॅग्ज (${acreage * 100} किलो खत)` : `Total ${acreage * 4} Bags (${acreage * 100} KG Nutrients)`}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {language === 'mr'
                      ? 'द्राक्ष ऑक्टोबर छाटणीसाठी हमखास उत्पादन वाढवणारा फॉर्म्युला'
                      : 'Proven viticulture yield enhancement formula with 100% lab certification.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddFullBasalKit}
                    className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{language === 'mr' ? 'संपूर्ण किट कार्टमध्ये जोडा' : 'Add Full Kit to Cart'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Deficiency Diagnostic Guide */}
        {activeTab === 'deficiencies' && (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deficiencies.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl glass-card p-6 border border-white/90 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-black text-xs flex items-center justify-center border border-red-200">
                          {item.symbol}
                        </span>
                        <h4 className="font-black text-slate-900 text-base">{item.element}</h4>
                      </div>
                      <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                        {language === 'mr' ? 'लक्षणे व उपाय' : 'Symptom & Remedy'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs pt-2">
                      <div className="p-3 rounded-2xl bg-red-50/60 border border-red-100 text-slate-800 space-y-1">
                        <span className="font-black text-red-800 block">
                          {language === 'mr' ? 'दिसणारी लक्षणे:' : 'Visible Symptoms:'}
                        </span>
                        <p className="font-semibold leading-relaxed">
                          {language === 'mr' ? item.symptomMr : item.symptomEn}
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-slate-800 space-y-1">
                        <span className="font-black text-emerald-800 block">
                          {language === 'mr' ? 'माइक्रॉनिक उपाय व शिफारस:' : 'Micronik Solution:'}
                        </span>
                        <p className="font-semibold leading-relaxed">
                          {language === 'mr' ? item.solutionMr : item.solutionEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const prod = products.find((p) => p.id === item.productId) || products[0];
                      onAddToCart(prod, 1);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'उपाय खत कार्टमध्ये जोडा' : 'Add Remedy to Cart'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
