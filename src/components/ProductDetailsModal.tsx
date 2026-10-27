import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, CheckCircle2, Phone, MessageSquare, Truck, Award, Sparkles } from 'lucide-react';
import { Language, Product } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  language: Language;
  onAddToCart: (product: Product, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  language,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeVariant = product.variants && product.variants.length > 0 ? product.variants[selectedVariantIndex] : null;
  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentMrp = activeVariant ? activeVariant.mrp : product.mrp;
  const currentPacking = activeVariant ? activeVariant.packing : product.bagSize;
  const currentDealerPrice = activeVariant ? activeVariant.dealerPrice : product.dealerPrice;

  const handleAddCurrentToCart = () => {
    const productWithVariant: Product = {
      ...product,
      price: currentPrice,
      mrp: currentMrp,
      bagSize: currentPacking,
      dealerPrice: currentDealerPrice,
      selectedVariantId: activeVariant?.id
    };
    onAddToCart(productWithVariant, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-md border border-slate-200 my-4 sm:my-8 relative max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700 transition-colors shadow-md"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Gallery Section */}
            <div className="md:col-span-6 space-y-3 sm:space-y-4">
              <div className="aspect-square bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
                <img
                  src={galleryImages[selectedImgIndex]}
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#1B5E20] text-white font-extrabold text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                  {currentPacking}
                </span>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImgIndex === idx ? 'border-[#1B5E20] ring-2 ring-emerald-300' : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Section */}
            <div className="md:col-span-6 space-y-4 sm:space-y-5">
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-[#1B5E20]">
                  <span>SKU: {product.sku}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span className="font-black text-xs sm:text-sm">{product.rating}</span>
                    <span className="text-slate-500 font-semibold text-[10px] sm:text-xs">({product.reviewsCount} Reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {language === 'mr' ? product.nameMr : product.nameEn}
                </h2>

                <p className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-1 rounded-lg">
                  {language === 'mr' ? product.taglineMr : product.taglineEn}
                </p>
              </div>

              {/* Variants Picker if Available */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
                    <span>{language === 'mr' ? 'पॅकिंग पर्याय निवडा (Select Variant):' : 'Select Packing Variant:'}</span>
                    <span className="text-[#1B5E20] font-black">{currentPacking}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((variant, vIdx) => {
                      const isSelected = selectedVariantIndex === vIdx;
                      return (
                        <button
                          key={variant.id || vIdx}
                          type="button"
                          onClick={() => setSelectedVariantIndex(vIdx)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#1B5E20] bg-emerald-50 ring-1 ring-[#1B5E20]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="font-black text-xs text-slate-900">{variant.packing}</div>
                          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                            <span className="font-extrabold text-xs text-[#1B5E20]">₹{variant.price}</span>
                            <span className="text-[10px] text-slate-400 line-through">MRP: ₹{variant.mrp}</span>
                          </div>
                          {variant.dealerPrice && (
                            <div className="text-[10px] font-bold text-emerald-700 mt-0.5">
                              Dealer Rate: ₹{variant.dealerPrice}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pricing & Stock */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F6F0] border border-emerald-900/10 flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#1B5E20]">₹{currentPrice}</div>
                  <div className="text-xs text-slate-400 line-through font-semibold">MRP: ₹{currentMrp}</div>
                  {currentDealerPrice && (
                    <div className="text-[10px] sm:text-[11px] text-emerald-800 font-bold">Dealer Price: ₹{currentDealerPrice}</div>
                  )}
                  <div className="text-[9px] sm:text-[10px] text-emerald-700 font-extrabold">Includes GST & Direct Factory Invoice</div>
                </div>

                <div className="text-right space-y-1">
                  <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-200 text-[#1B5E20] text-[10px] sm:text-xs font-black">
                    In Stock ({product.stock} available)
                  </span>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold">Fast Dispatch from Nashik Depot</div>
                </div>
              </div>

              {/* Composition */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider block">
                  {language === 'mr' ? 'रासायनिक रचना (Composition):' : 'Chemical / Nutrient Composition:'}
                </span>
                <p className="p-2.5 sm:p-3 rounded-xl bg-slate-100 text-slate-800 font-mono text-[10px] sm:text-[11px]">
                  {language === 'mr' ? product.compositionMr : product.compositionEn}
                </p>
              </div>

              {/* Dosage */}
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider block">
                  {language === 'mr' ? 'शिफारस केलेला डोस (Dosage per Acre):' : 'Recommended Dosage per Acre:'}
                </span>
                <p className="p-2.5 sm:p-3 rounded-xl bg-amber-50 text-amber-900 font-bold border border-amber-200 text-[11px] sm:text-xs">
                  {language === 'mr' ? product.dosageMr : product.dosageEn}
                </p>
              </div>

              {/* Desktop-only Add to Cart Box */}
              <div className="hidden sm:block space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 font-black text-slate-700 hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-black text-xs text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 font-black text-slate-700 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted ? 'bg-red-50 text-red-600 border-red-300' : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <button
                  onClick={handleAddCurrentToCart}
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#1B5E20] hover:bg-[#144718] text-white font-black text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {language === 'mr'
                      ? `कार्टमध्ये जोडा (₹${currentPrice * quantity})`
                      : `Add to Cart (₹${currentPrice * quantity})`}
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Extended Details Tabs */}
          <div className="space-y-6 border-t border-slate-200 pt-6">
            
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-[#1B5E20]">
                {language === 'mr' ? 'सविस्तर माहिती (Product Overview)' : 'Product Overview'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {language === 'mr' ? product.descriptionMr : product.descriptionEn}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h3 className="text-lg font-black text-[#1B5E20]">
                {language === 'mr' ? 'मुख्य फायदे (Key Benefits)' : 'Key Agronomic Benefits'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800">
                {(language === 'mr' ? product.benefitsMr : product.benefitsEn).map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Crops */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                {language === 'mr' ? 'उपयुक्त पिके (Recommended Crops):' : 'Suitable Crops:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(language === 'mr' ? product.recommendedCropsMr : product.recommendedCropsEn).map((crop, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-[#1B5E20] text-xs font-extrabold border border-slate-200">
                    🌾 {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Agronomist Call CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1B5E20] to-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-amber-300" />
                <div>
                  <div className="text-xs font-bold text-amber-300">शेतकरी हेल्पलाइन व तांत्रिक सल्ला</div>
                  <div className="text-sm font-black">Micronik Helpline: {COMPANY_DETAILS.phonePrimary}</div>
                </div>
              </div>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Micronik%20Agri,%20I%20want%20information%20about%20${encodeURIComponent(product.nameEn)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shrink-0 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

          </div>

        </div>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="sm:hidden sticky bottom-0 z-20 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 shadow-lg flex items-center gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-10 flex items-center justify-center font-black text-slate-700 active:bg-slate-200"
            >
              -
            </button>
            <span className="w-8 h-10 flex items-center justify-center font-black text-xs text-slate-900">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-10 flex items-center justify-center font-black text-slate-700 active:bg-slate-200"
            >
              +
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
              isWishlisted ? 'bg-red-50 text-red-600 border-red-300' : 'bg-slate-50 text-slate-600 border-slate-300'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Full-width Mobile Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddCurrentToCart}
            className="flex-1 h-10 px-3 rounded-xl bg-[#1B5E20] hover:bg-[#144718] active:scale-[0.98] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 border border-emerald-800"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {language === 'mr'
                ? `कार्टमध्ये जोडा (₹${currentPrice * quantity})`
                : `Add to Cart (₹${currentPrice * quantity})`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
