import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Star,
  MessageCircle,
  Clock,
  Award,
  Package,
  Check,
  ChevronRight,
  Send
} from 'lucide-react';
import { Language, Product, ProductVariant, ProductReview } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  language: Language;
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  allProducts,
  language,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );

  useEffect(() => {
    setSelectedImage(product.image);
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product.id, product.image]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs' | 'dosage' | 'reviews'>('benefits');
  const [pincode, setPincode] = useState<string>('');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(false);
  const [pincodeMessage, setPincodeMessage] = useState<string>('');

  // Local reviews state
  const [reviews, setReviews] = useState<ProductReview[]>([
    {
      id: 'rev_1',
      productId: product.id,
      userName: 'ज्ञानेश्वर पाटील (Dnyaneshwar Patil)',
      userLocation: 'निफाड, नाशिक (Niphad, Nashik)',
      rating: 5,
      comment: 'द्राक्ष बागेत ऑक्टोबर छाटणीनंतर हे प्रॉडक्ट वापरले, अप्रतिम रिझल्ट मिळाला. फुटवे आणि घडांची वाढ एकदम एकसारखी झाली.',
      crop: 'द्राक्ष (Grapes)',
      date: '12 May 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev_2',
      productId: product.id,
      userName: 'Sachin Shinde',
      userLocation: 'बारामती, पुणे (Baramati, Pune)',
      rating: 5,
      comment: 'Quality is 100% genuine. Micronik Agri delivery was super fast and packaging was sturdy.',
      crop: 'टोमॅटो (Tomato)',
      date: '28 April 2026',
      verifiedPurchase: true
    }
  ]);

  // Review Form
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const discountPercent = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      if (pincode.startsWith('42') || pincode.startsWith('41') || pincode.startsWith('40') || pincode.startsWith('43') || pincode.startsWith('44')) {
        setPincodeMessage(
          language === 'mr'
            ? '✓ पिनकोडवर डिलिव्हरी उपलब्ध! १ ते ३ दिवसांत शेतावर पोहोचेल.'
            : '✓ Delivery Available! Estimated delivery in 1-3 business days across Maharashtra.'
        );
      } else {
        setPincodeMessage(
          language === 'mr'
            ? '✓ संपूर्ण भारतात डिलिव्हरी उपलब्ध (४-५ दिवस).'
            : '✓ All India Standard Shipping available (4-5 business days).'
        );
      }
    } else {
      setPincodeChecked(true);
      setPincodeMessage(
        language === 'mr' ? 'कृपया ६ अंकी वैध पिनकोड प्रविष्ट करा.' : 'Please enter a valid 6-digit postal pincode.'
      );
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    const newRev: ProductReview = {
      id: `rev_${Date.now()}`,
      productId: product.id,
      userName: newReviewName,
      userLocation: newReviewLocation || 'Maharashtra, India',
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Just now',
      verifiedPurchase: true
    };
    setReviews([newRev, ...reviews]);
    setNewReviewName('');
    setNewReviewLocation('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // WhatsApp Inquiry Link
  const inquiryText = encodeURIComponent(
    `नमस्कार मायक्रॉनिक ॲग्री! मला ${product.nameEn} (${product.nameMr}) या खताबद्दल माहिती व दर विचारायचे आहेत. SKU: ${product.sku}`
  );
  const whatsappInquiryUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${inquiryText}`;

  // Related products
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar: Breadcrumb + Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel text-slate-800 font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-sm group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#1B5E20] group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'mr' ? 'दुकान कडे परत जा' : 'Back to Store'}</span>
          </button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>
              {language === 'mr' ? 'दुकान' : 'Shop'}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="capitalize text-slate-600">{product.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-[#1B5E20] truncate max-w-[200px]">
              {language === 'mr' ? product.nameMr : product.nameEn}
            </span>
          </div>
        </div>

        {/* Main Product Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/80 shadow-2xl relative overflow-hidden">
          
          {/* Ambient organic glows */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 relative z-10">
            
            {/* LEFT: Image Gallery (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-white p-6 flex items-center justify-center border border-slate-200/80 shadow-inner overflow-hidden group">
                {discountPercent > 0 && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-red-600 text-white font-black text-xs shadow-md tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-red-500 hover:bg-white shadow-md transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400'
                    }`}
                  />
                </button>
                <img
                  src={selectedImage}
                  alt={product.nameEn}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {product.gallery && Array.from(new Set(product.gallery)).length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {Array.from(new Set(product.gallery)).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl bg-white p-1.5 border-2 transition-all shrink-0 cursor-pointer overflow-hidden ${
                        selectedImage === img
                          ? 'border-[#1B5E20] shadow-md ring-2 ring-[#4CAF50]/30'
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Certified Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-slate-900 block">
                      {language === 'mr' ? '१००% प्रमाणित खत' : '100% Genuine FCO'}
                    </span>
                    <span className="text-slate-500">{language === 'mr' ? 'लॅब टेस्टेड फॉर्म्युला' : 'Govt Approved'}</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-slate-900 block">
                      {language === 'mr' ? 'थेट शेतावर डिलिव्हरी' : 'Fast Farm Delivery'}
                    </span>
                    <span className="text-slate-500">{language === 'mr' ? 'महाराष्ट्रभर सेवा' : 'Cash on Delivery'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Details & Purchase Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} {language === 'mr' ? 'पुनरावलोकने' : 'reviews'})</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {language === 'mr' ? product.nameMr : product.nameEn}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#1B5E20]">
                  {language === 'mr' ? product.taglineMr : product.taglineEn}
                </p>
                <div className="text-xs text-slate-500 font-mono">
                  SKU: <span className="font-bold text-slate-700">{product.sku}</span> |{' '}
                  <span className="text-emerald-700 font-bold">
                    {product.inStock ? (language === 'mr' ? 'स्टॉक उपलब्ध (In Stock)' : 'In Stock') : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 to-amber-50/90 border border-emerald-200/80 flex flex-wrap items-baseline gap-4">
                <div className="text-3xl sm:text-4xl font-black text-[#1B5E20]">
                  ₹{currentPrice}
                </div>
                {currentMrp > currentPrice && (
                  <div className="text-base sm:text-lg text-slate-400 line-through font-bold">
                    MRP: ₹{currentMrp}
                  </div>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs">
                    {language === 'mr' ? `₹${currentMrp - currentPrice} बचत (${discountPercent}%)` : `Save ₹${currentMrp - currentPrice} (${discountPercent}%)`}
                  </span>
                )}
                <div className="w-full text-xs text-slate-600 font-medium pt-1">
                  {language === 'mr' ? 'सर्व कर समाविष्ट (Inclusive of all taxes) • जीएसटी बिल सह' : 'Inclusive of all taxes • Official GST Invoice provided'}
                </div>
              </div>

              {/* Packaging Variants Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    {language === 'mr' ? 'पॅकिंग पर्याय निवडा (Select Bag Size):' : 'Select Packaging Option:'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer flex items-center gap-2 ${
                          selectedVariant?.id === v.id
                            ? 'border-[#1B5E20] bg-emerald-50/80 text-[#1B5E20] shadow-sm font-extrabold'
                            : 'border-slate-200 bg-white/70 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {selectedVariant?.id === v.id && <Check className="w-3.5 h-3.5 text-[#1B5E20]" />}
                        <span>{v.packing}</span>
                        <span className="text-[#1B5E20] font-black">₹{v.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center rounded-2xl border border-slate-300 bg-white shadow-sm p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition-all text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black text-slate-900 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition-all text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="flex-1 min-w-[160px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#1B5E20] hover:from-emerald-700 hover:to-[#154a19] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer transform active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>{language === 'mr' ? 'कार्टमध्ये जोडा' : 'Add to Cart'}</span>
                  </button>

                  {/* Buy Now (Direct to Checkout) */}
                  <button
                    onClick={() => onBuyNow(product, quantity)}
                    className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-900/10 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
                  >
                    <Sparkles className="w-5 h-5 text-slate-900" />
                    <span>{language === 'mr' ? 'थेट खरेदी करा (Buy Now)' : 'Buy Now'}</span>
                  </button>
                </div>

                {/* WhatsApp Direct Product Inquiry */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#075E54] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>
                    {language === 'mr'
                      ? 'या खताबद्दल व्हॉट्सॲपवर डॉक्टरांशी चर्चा करा'
                      : 'Ask Crop Doctor about this product on WhatsApp'}
                  </span>
                </a>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'mr' ? 'पिनकोड तपासा (Check Delivery):' : 'Check Delivery to Your Farm:'}</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6 digit pincode (e.g. 422209)"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setPincodeChecked(false);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all cursor-pointer"
                  >
                    {language === 'mr' ? 'तपासा' : 'Check'}
                  </button>
                </form>
                {pincodeChecked && (
                  <p className="text-xs font-bold text-emerald-700">{pincodeMessage}</p>
                )}
              </div>

            </div>
          </div>

          {/* TABS SECTION: Benefits, Specs, Dosage, Reviews */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 space-y-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? 'फायदे व कार्य (Key Benefits)' : 'Key Benefits'}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? 'घटक व पिके (Specs & Crops)' : 'Specs & Recommended Crops'}
              </button>
              <button
                onClick={() => setActiveTab('dosage')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'dosage'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? 'डोस व वापर पद्धती (Dosage)' : 'Dosage & Application'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {language === 'mr' ? `शेतकऱ्यांचे अनुभव (${reviews.length})` : `Farmer Reviews (${reviews.length})`}
              </button>
            </div>

            {/* Tab 1: Benefits */}
            {activeTab === 'benefits' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-black text-slate-900">
                  {language === 'mr' ? 'पिकासाठी मुख्य फायदे' : 'Agronomic Value & Benefits'}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {language === 'mr' ? product.descriptionMr : product.descriptionEn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(language === 'mr' ? product.benefitsMr : product.benefitsEn).map((benefit, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Specs & Recommended Crops */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-emerald-800">
                      {language === 'mr' ? 'घटक रचना (Composition)' : 'Chemical Composition'}
                    </h4>
                    <p className="text-sm font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {language === 'mr' ? product.compositionMr : product.compositionEn}
                    </p>
                    <div className="text-xs text-slate-500 font-medium">
                      FCO Grade Standard Approved Formulation
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-emerald-800">
                      {language === 'mr' ? 'शिफारस केलेली पिके (Recommended Crops)' : 'Suitable Crops'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'mr' ? product.recommendedCropsMr : product.recommendedCropsEn).map((crop, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#1B5E20] font-extrabold text-xs border border-emerald-300"
                        >
                          🌿 {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Dosage & Application */}
            {activeTab === 'dosage' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {language === 'mr' ? 'प्रमाण व वापरण्याची अचूक पद्धत' : 'Application Rates & Method'}
                    </h4>
                    <span className="text-xs text-slate-600 font-medium">
                      {language === 'mr' ? 'सर्वोत्तम रिझल्टसाठी डॉक्टरांच्या मार्गदर्शनानुसार वापरा' : 'For optimal yield, apply during cool morning or evening hours'}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white text-slate-800 font-bold text-sm border border-amber-200">
                  {language === 'mr' ? product.dosageMr : product.dosageEn}
                </div>
              </motion.div>
            )}

            {/* Tab 4: Reviews & Write a Review */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Existing Reviews List */}
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-sm text-slate-900">{rev.userName}</div>
                          <div className="text-xs text-slate-500 font-medium">{rev.userLocation} {rev.crop && `• ${rev.crop}`}</div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">{rev.comment}</p>
                      <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Farmer Purchase • {rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit New Review Form */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
                  <h4 className="font-black text-sm text-slate-900">
                    {language === 'mr' ? 'तुमचा अनुभव सामायिक करा (Write a Review)' : 'Share Your Crop Experience'}
                  </h4>
                  {reviewSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                      {language === 'mr' ? 'धन्यवाद! तुमचा अभिप्राय यशस्वीरीत्या जोडला गेला.' : 'Thank you! Your review has been added.'}
                    </div>
                  )}
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder={language === 'mr' ? 'तुमचे नाव (Full Name)' : 'Your Name'}
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder={language === 'mr' ? 'गाव / तालुका / जिल्हा' : 'Village / District'}
                        value={newReviewLocation}
                        onChange={(e) => setNewReviewLocation(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder={language === 'mr' ? 'या खताचा तुमच्या पिकावर काय परिणाम झाला?' : 'How did this product perform on your crop?'}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'अभिप्राय सबमिट करा' : 'Submit Review'}</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {language === 'mr' ? 'संबंधित कृषी पोषण उत्पादने' : 'Related Crop Nutrition Products'}
              </h2>
              <button
                onClick={onBack}
                className="text-xs font-extrabold text-[#1B5E20] hover:underline"
              >
                {language === 'mr' ? 'सर्व उत्पादने पहा →' : 'View All →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((relProd) => (
                <div
                  key={relProd.id}
                  onClick={() => onSelectProduct(relProd)}
                  className="rounded-2xl glass-card glass-card-hover p-4 flex flex-col justify-between cursor-pointer border border-white/80"
                >
                  <div className="space-y-3">
                    <div className="aspect-square rounded-xl bg-white p-3 flex items-center justify-center border border-slate-100">
                      <img src={relProd.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {relProd.category}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                        {language === 'mr' ? relProd.nameMr : relProd.nameEn}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {language === 'mr' ? relProd.shortDescMr : relProd.shortDescEn}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
                    <span className="font-black text-base text-[#1B5E20]">₹{relProd.price}</span>
                    <span className="text-xs font-bold text-slate-700 hover:text-emerald-700">
                      {language === 'mr' ? 'पहा →' : 'View →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
