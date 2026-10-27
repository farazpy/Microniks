import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowRight, X, Share2, Check } from 'lucide-react';
import { BlogPost, Language } from '../types';
import { BLOG_POSTS, COMPANY_DETAILS } from '../data/content';

interface BlogSectionProps {
  language: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ language }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-20 bg-slate-50 text-slate-800 scroll-mt-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#2E7D32] text-xs font-bold border border-emerald-200">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'mr' ? 'मायक्रॉनिक कृषी माहिती' : 'Agri Knowledge Hub'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {language === 'mr' ? 'द्राक्ष व बागायती शेती तंत्रज्ञान ब्लॉग' : 'Expert Farming Tips & Crop Management'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {language === 'mr'
              ? 'ऑक्टोबर छाटणी, फवारणी वेळापत्रक, सूक्ष्म अन्नद्रव्ये आणि जमीन सुपीकतेविषयी विशेष माहिती.'
              : 'Practical insights written by experienced agronomists for Maharashtra grape and vegetable farmers.'}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 text-amber-400 text-xs font-bold backdrop-blur-md">
                  {language === 'mr' ? post.categoryMr : post.categoryEn}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#B71C1C] transition-colors leading-snug">
                    {language === 'mr' ? post.titleMr : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {language === 'mr' ? post.excerptMr : post.excerptEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2E7D32]">
                  <span>{language === 'mr' ? 'पूर्ण लेख वाचा' : 'Read Full Article'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-[#B71C1C] text-xs font-bold">
                  {language === 'mr' ? activeArticle.categoryMr : activeArticle.categoryEn}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {language === 'mr' ? activeArticle.titleMr : activeArticle.titleEn}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#2E7D32]" />
                    {activeArticle.author}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Article Hero Image */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Body Text */}
              <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {language === 'mr' ? activeArticle.contentMr : activeArticle.contentEn}
              </div>

              {/* Share & Close Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'लिंक कॉपी झाली!' : 'लेख शेअर करा'}</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
