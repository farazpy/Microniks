import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, Eye, Star, Filter, Sparkles, Tag, ShieldAlert, ArrowRight } from 'lucide-react';
import { Language, Product } from '../types';

interface ShopSectionProps {
  language: Language;
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  language,
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', labelMr: 'सर्व उत्पादने', labelEn: 'All Products' },
    { id: 'fertilizer', labelMr: 'सेंद्रिय व पोटॅश खते (Silkfert / Potash)', labelEn: 'Bio-Fertilizers & Potash' },
    { id: 'micronutrient', labelMr: 'सूक्ष्म अन्नद्रव्ये (Micronutrients)', labelEn: 'Micronutrient Mixtures' },
    { id: 'zinc', labelMr: 'झिंक पोषण (Zincfer)', labelEn: 'Zinc Nutrition' },
    { id: 'magnesium', labelMr: 'मॅग्नेशियम (Magpro)', labelEn: 'Magnesium Sulphate' },
    { id: 'specialty', labelMr: 'विशेष खते व जेल (Orthosale / Cropgel)', labelEn: 'Specialty Gels & Silicon' },
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      product.nameMr.toLowerCase().includes(query) ||
      product.nameEn.toLowerCase().includes(query) ||
      product.shortDescMr.toLowerCase().includes(query) ||
      product.shortDescEn.toLowerCase().includes(query) ||
      product.recommendedCropsEn.some((c) => c.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.isPopular ? 1 : -1;
  });

  return (
    <section id="shop" className="py-12 sm:py-16 text-slate-900 scroll-mt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title Glass Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/80 shadow-lg flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5E20] text-white text-xs font-black">
              <Tag className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? '१००% ओरिजनल खते' : 'Official Micronik Catalog'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === 'mr' ? 'मायक्रॉनिक कृषी खत भांडार (E-Shop)' : 'Micronik Agri Product Catalog'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-xl">
              {language === 'mr'
                ? 'द्राक्ष, टोमॅटो व डाळिंब पिकांसाठी उच्च प्रतिची प्रयोगशाळा प्रमाणित खते थेट खरेदी करा.'
                : 'Direct farm order of lab-certified micronutrient mixtures & basal kits with GST invoice.'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/80 p-2 rounded-2xl border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-[#1B5E20]" />
            <span className="text-xs font-bold text-slate-700">{language === 'mr' ? 'क्रमवारी:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-black text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">{language === 'mr' ? 'लोकप्रिय (Featured)' : 'Featured'}</option>
              <option value="price-low">{language === 'mr' ? 'किंमत: कमी ते जास्त' : 'Price: Low to High'}</option>
              <option value="price-high">{language === 'mr' ? 'किंमत: जास्त ते कमी' : 'Price: High to Low'}</option>
              <option value="rating">{language === 'mr' ? 'सर्वात जास्त रेटिंग' : 'Highest Rated'}</option>
            </select>
          </div>
        </div>

        {/* Category Tabs Glass Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap shadow-sm border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md scale-105'
                  : 'glass-card text-slate-700 border-white/80 hover:bg-white'
              }`}
            >
              {language === 'mr' ? cat.labelMr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 glass-panel rounded-3xl border border-white/80">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'mr' ? 'कोणतीही उत्पादने सापडली नाहीत.' : 'No matching products found.'}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              {language === 'mr' ? 'कृपया वेगळा शोध शब्द किंवा कॅटेगरी निवडून पहा.' : 'Try adjusting your search query or category filter.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              {language === 'mr' ? 'सर्व उत्पादने दाखवा' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.id === product.id);
              const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

              return (
                <div
                  key={product.id}
                  className="rounded-3xl glass-card glass-card-hover overflow-hidden border border-white/90 shadow-md flex flex-col justify-between relative group"
                >
                  {/* Top Image Container */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-square bg-white p-4 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.nameEn}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discount Tag */}
                    {discountPercent > 0 && (
                      <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-md">
                        {discountPercent}% OFF
                      </div>
                    )}

                    {/* Popular Badge */}
                    {product.isPopular && (
                      <div className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-black text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 text-slate-950 shrink-0" />
                        <span className="hidden xs:inline sm:inline">BESTSELLER</span>
                      </div>
                    )}

                    {/* Wishlist Heart Action */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                        isWishlisted ? 'bg-red-600 text-white' : 'bg-white/90 text-slate-700 hover:text-red-600 hover:bg-white'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    </button>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-[#1B5E20]">
                        <span className="truncate max-w-[65%]">{product.bagSize}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 shrink-0">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-semibold text-[9px] sm:text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-black text-slate-900 text-xs sm:text-base leading-snug hover:text-[#1B5E20] cursor-pointer line-clamp-1"
                        title={language === 'mr' ? product.nameMr : product.nameEn}
                      >
                        {language === 'mr' ? product.nameMr : product.nameEn}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1 sm:line-clamp-2 leading-relaxed">
                        {language === 'mr' ? product.shortDescMr : product.shortDescEn}
                      </p>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base sm:text-xl font-black text-[#1B5E20]">₹{product.price}</span>
                          {product.mrp > product.price && (
                            <span className="text-[10px] sm:text-xs text-slate-400 line-through font-semibold">₹{product.mrp}</span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-emerald-800 font-black bg-emerald-100 px-1.5 py-0.5 rounded-md">
                          GST Inc.
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product, 1)}
                          className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{language === 'mr' ? 'कार्ट' : 'Add'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#1B5E20] hover:from-emerald-700 hover:to-[#154a19] text-white font-extrabold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'mr' ? 'पहा' : 'Details'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
