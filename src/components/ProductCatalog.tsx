import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MessageCircle, FileText, CheckCircle2, ChevronRight, Sparkles, Shield, X, QrCode } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS_DATA, COMPANY_DETAILS } from '../data/content';

interface ProductCatalogProps {
  language: Language;
  onOpenQRModal: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ language, onOpenQRModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', labelMr: 'सर्व उत्पादने (All)', labelEn: 'All Products' },
    { id: 'micronutrient', labelMr: 'सूक्ष्म अन्नद्रव्ये (Micronutrients)', labelEn: 'Micronutrients' },
    { id: 'fertilizer', labelMr: 'पायाभूत खते (Fertilizers)', labelEn: 'Fertilizers' },
    { id: 'zinc', labelMr: 'झिंक पोषण (Zinc Formula)', labelEn: 'Zinc Special' },
    { id: 'magnesium', labelMr: 'मॅग्नेशियम (Magnesium)', labelEn: 'Magnesium' },
    { id: 'specialty', labelMr: 'विशेष पोषण (Specialty)', labelEn: 'Specialty Bio' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handleWhatsAppProductInquiry = (product: Product) => {
    const text = language === 'mr'
      ? `नमस्कार, मला माइक्रॉनिकच्या "${product.nameMr}" (${product.bagSize}) खताबद्दल सविस्तर किंमत व वापराची माहिती हवी आहे.`
      : `Hello, I would like to inquire about Micronik "${product.nameEn}" (${product.bagSize}) pricing and application guidelines.`;
    
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-white text-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C400]/20 text-[#B71C1C] text-xs font-bold border border-[#F5C400]/40">
            <Sparkles className="w-4 h-4 text-[#B71C1C]" />
            <span>{language === 'mr' ? 'उच्च दर्जाची उत्पादने' : 'Premium Agriculture Catalog'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {language === 'mr' ? 'मायक्रॉनिक खते व सूक्ष्म अन्नद्रव्ये' : 'Micronik Fertilizers & Micronutrients'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {language === 'mr'
              ? 'द्राक्ष, टोमॅटो व बागायती पिकांच्या चांगल्या वाढीसाठी व उच्च उत्पन्नासाठी विशेष तयार केलेले ब्रँडेड खत मिश्रण.'
              : 'Scientifically balanced plant nutrition designed to maximize crop health, fruit firmness, and harvest value.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#B71C1C] to-red-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'mr' ? cat.labelMr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              {/* Top Banner Bag Size Badge */}
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Popularity Badge */}
                {product.isPopular && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F5C400] to-amber-500 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'द्राक्ष विशेष लोकप्रिय' : 'Best Seller'}</span>
                  </div>
                )}

                {/* Bag Size Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-xl border border-slate-700 shadow-md">
                  {product.bagSize}
                </div>

                {/* Product Title Banner */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
                    {language === 'mr' ? product.nameMr : product.nameEn}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mt-0.5 drop-shadow">
                    {language === 'mr' ? product.taglineMr : product.taglineEn}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {language === 'mr' ? product.shortDescMr : product.shortDescEn}
                  </p>

                  {/* Key Benefits List */}
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      {language === 'mr' ? 'प्रमुख फायदे (Key Benefits):' : 'Key Benefits:'}
                    </div>
                    {(language === 'mr' ? product.benefitsMr : product.benefitsEn).slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Crop Pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 mb-1.5">
                      {language === 'mr' ? 'शिफारस केलेली पिके (Recommended Crops):' : 'Recommended Crops:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'mr' ? product.recommendedCropsMr : product.recommendedCropsEn).map((crop, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px] font-semibold">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* View Details Modal Trigger */}
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'सविस्तर पहा' : 'View Details'}</span>
                    </button>

                    {/* Direct WhatsApp Enquiry */}
                    <button
                      onClick={() => handleWhatsAppProductInquiry(product)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#2E7D32] hover:bg-[#236327] transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'mr' ? 'दर विचारा' : 'Enquire Now'}</span>
                    </button>
                  </div>

                  {/* Authenticity QR Check button */}
                  <button
                    onClick={onOpenQRModal}
                    className="w-full py-1.5 text-center text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60"
                  >
                    <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'पॅकेजिंग खरी असल्याची खात्री करा (QR Code)' : 'Verify Batch Authenticity'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Details Full Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={activeModalProduct.image}
                      alt={activeModalProduct.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold mb-1">
                      {activeModalProduct.bagSize}
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {language === 'mr' ? activeModalProduct.nameMr : activeModalProduct.nameEn}
                    </h3>
                    <p className="text-xs text-[#2E7D32] font-semibold">
                      {language === 'mr' ? activeModalProduct.taglineMr : activeModalProduct.taglineEn}
                    </p>
                  </div>
                </div>

                {/* Composition & Dosage Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">
                      {language === 'mr' ? 'रासायनिक रचना (Composition):' : 'Chemical Composition:'}
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      {language === 'mr' ? activeModalProduct.compositionMr : activeModalProduct.compositionEn}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="text-xs font-bold text-[#B71C1C] uppercase mb-1">
                      {language === 'mr' ? 'शिफारस डोस (Dosage):' : 'Recommended Dosage:'}
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      {language === 'mr' ? activeModalProduct.dosageMr : activeModalProduct.dosageEn}
                    </p>
                  </div>
                </div>

                {/* Full Benefits */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'mr' ? 'सर्व फायदे व वैशिष्ट्ये:' : 'Complete Crop Benefits:'}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(language === 'mr' ? activeModalProduct.benefitsMr : activeModalProduct.benefitsEn).map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleWhatsAppProductInquiry(activeModalProduct)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2E7D32] hover:bg-[#236327] transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{language === 'mr' ? 'व्हॉट्सॲपवर दर विचारा' : 'Inquire Price on WhatsApp'}</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_DETAILS.phone}`}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                  >
                    {language === 'mr' ? 'थेट फोन करा' : 'Call Sales Hotline'}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
