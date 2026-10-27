import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Share2, 
  Check, 
  X, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag,
  MessageCircle,
  Tag
} from 'lucide-react';
import { BlogPost, Language, Product } from '../types';
import { BLOG_POSTS, COMPANY_DETAILS } from '../data/content';

interface BlogPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectProduct?: (product: Product) => void;
  products: Product[];
}

export const BlogPage: React.FC<BlogPageProps> = ({
  language,
  onNavigate,
  products,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', labelMr: 'सर्व लेख (All)', labelEn: 'All Guides' },
    { id: 'grapes', labelMr: 'द्राक्ष शेती (Grape Viticulture)', labelEn: 'Grape Viticulture' },
    { id: 'soil', labelMr: 'माती व पीक आरोग्य (Soil Health)', labelEn: 'Soil & Health' },
    { id: 'micronutrients', labelMr: 'सूक्ष्म अन्नद्रव्ये (Micronutrients)', labelEn: 'Micronutrients' },
  ];

  // Extended blog posts
  const extendedBlogPosts: BlogPost[] = [
    ...BLOG_POSTS,
    {
      id: 'pomegranate-fruit-cracking-cure',
      titleMr: 'डाळिंब बागेत फळे तडकणे (Fruit Cracking) कसे थांबवावे?',
      titleEn: 'How to Prevent Severe Fruit Cracking in Pomegranate Orchards',
      excerptMr: 'बोरॉन आणि कॅल्शियमच्या असंतुलनामुळे डाळिंबाची फळे तडकतात. जाणून घ्या सिल्कफर्ट आणि बोरोमिक्स-५एफ चे अचूक डोस.',
      excerptEn: 'Learn how Boron-Calcium synergy and organic soil conditioner stop pomegranate splitting and boost aril sweetness.',
      contentMr: `डाळिंब पिकात फळे तडकणे ही शेतकऱ्यांसाठी अत्यंत मोठी आर्थिक नुकसानीची समस्या आहे.

फळे तडकण्याची मुख्य कारणे:
१. जमिनीत पाण्याचे असंतुलन (कधी जास्त, कधी कमी पाणी).
२. बोरॉन व कॅल्शियम या सूक्ष्म अन्नद्रव्यांची कमतरता.
३. झाडाच्या मुळांची अन्नद्रव्य शोषण करण्याची क्षमता कमी असणे.

माइक्रॉनिक प्रमाणित उपाय:
- बेसल टप्प्यात: सिल्कफर्ट (४० किलो) + बोरोमिक्स-५एफ (१० किलो) प्रति एकर द्या.
- फळ फुगवणी टप्प्यात: मॅगप्रो (१० किलो) आणि कॅल्शियम नायट्रेट ड्रिपद्वारे द्या.
- फवारणी: बोरोमिक्स-५एफ १.५ ग्रॅम प्रति लिटर पाणी १५ दिवसांच्या अंतराने २ वेळा फवारा.

या नियोजनाने डाळिंब फळांची साल जाड व लवचिक राहून तडकण्याचे प्रमाण ०% वर येते.`,
      contentEn: `Fruit splitting in pomegranate is primarily triggered by moisture fluctuations and acute Boron-Calcium cell wall deficiency.

Root Causes:
1. Irregular irrigation cycles causing uneven pulp expansion.
2. Low boron availability in alkaline high-pH soils.
3. Weak feeder root system unable to uptake calcium during berry swelling.

Recommended Solution:
- Basal Stage: Silkfert (40 KG) + Boromix-5F (10 KG) per acre.
- Fruit Swelling Stage: Magpro (10 KG) via drip fertigation.
- Foliar Spray: Boromix-5F @ 1.5 gm/Ltr twice at 15-day intervals.

This protocol ensures thick, elastic skin and spotless deep-red arils.`,
      categoryMr: 'माती व पीक आरोग्य',
      categoryEn: 'Soil & Crop Health',
      date: '१२ सप्टेंबर २०२६',
      readTime: '४ मिनिटे',
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498137/IMG-20260821-WA0024.jpg',
      author: 'B.M. Sonawane (Crop Doctor)'
    },
    {
      id: 'tomato-blossom-end-rot-yield',
      titleMr: 'टोमॅटो पिकात फुलोरा वाढ आणि फळांची चकाकी वाढवण्याचे रहस्य',
      titleEn: 'Boosting Tomato Blossom Count, Fruit Firmness and Market Premium',
      excerptMr: 'टोमॅटो फळांचा गडद लाल रंग, वजन व टिकवण क्षमता वाढवण्यासाठी मायक्सेल बीएम-२० आणि मॅगप्रोचा वापर कसा करावा.',
      excerptEn: 'Field guide on optimizing tomato fruit sizing, shelf life, and weight with balanced micronutrients.',
      contentMr: `टोमॅटो पिकात जास्त तोडे आणि बाजारात रु. ५०-१०० जादा दर मिळवण्यासाठी झाडाचे पोषण सुरुवातीपासून मजबूत असणे आवश्यक आहे.

महत्त्वाचे टप्पे:
१. पुनर्लागवड टप्पा: झिंकफर (१० किलो) + सिल्कफर्ट (२५ किलो) बेसल बेडमध्ये टाका.
२. फूलधारणा टप्पा: बोरोमिक्स-५एफ (५ किलो) ड्रिपमधून किंवा २ ग्रॅम/लिटर फवारणी करा ज्यामुळे कळी गळ थांबते.
३. तोडा टप्पा: मॅगप्रो (१० किलो) + पोटॅश युक्त खतांचा डोस द्या, ज्यामुळे फळांचा लाल रंग आणि चकाकी वाढेल.`,
      contentEn: `Achieving 30+ pickings and securing top rates in Nashik and Mumbai markets requires precision micronutrient management.

Key Stages:
1. Bed Preparation: Zincfer (10 KG) + Silkfert (25 KG) in basal bed.
2. Flowering: Boromix-5F @ 2 gm/Ltr foliar spray to arrest flower abortion.
3. Harvest: Magpro (10 KG) + high potassium fertigation for dense red coloration.`,
      categoryMr: 'भाजीपाला शेती',
      categoryEn: 'Vegetables & Cash Crops',
      date: '०५ सप्टेंबर २०२६',
      readTime: '३ मिनिटे',
      image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498145/IMG-20260821-WA0025.jpg',
      author: 'माइक्रॉनिक ॲग्रोनॉमी टीम'
    }
  ];

  const filteredPosts = extendedBlogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      post.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      post.categoryMr.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.titleEn.toLowerCase().includes(query) ||
      post.titleMr.toLowerCase().includes(query) ||
      post.excerptEn.toLowerCase().includes(query) ||
      post.excerptMr.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      qMr: 'मायक्रॉनिक १०० किलो बेसल डोस कधी द्यावा?',
      qEn: 'When should the 100 KG Basal Kit be applied in grapes?',
      aMr: 'द्राक्ष बागेत ऑक्टोबर छाटणीनंतर (प्रूनिंगनंतर) ताबडतोब किंवा पहिले पाणी देण्यापूर्वी हा बेसल डोस झाडाच्या मुळांशी चर खोदून द्यावा.',
      aEn: 'Apply immediately following October pruning before the initial heavy irrigation, placed in feeder root trenches.',
    },
    {
      qMr: 'बोरोमिक्स-५एफ आणि सिल्कफर्ट एकत्र वापरता येतात का?',
      qEn: 'Can Boromix-5F and Silkfert be mixed together?',
      aMr: 'होय, माइक्रॉनिकचे सर्व बेसल फॉर्म्युलेशन एकमेकांशी १००% अनुकूल (Compatible) असून एकत्र वापरल्यास मुळांची वाढ व अन्नद्रव्य शोषण दुप्पट वेगाने होते.',
      aEn: 'Yes, all Micronik basal grades are fully compatible and synergistic when combined in the root zone.',
    },
    {
      qMr: 'ड्रिपमधून खते सोडताना काय काळजी घ्यावी?',
      qEn: 'What precautions should be taken when applying through drip fertigation?',
      aMr: 'खते पूर्णपणे पाण्यात विरघळवून मगच व्हेंचुरी किंवा डोझरमधून सोडावीत. खत दिल्यानंतर किमान १५-२० मिनिटे साधे पाणी चालू ठेवावे जेणेकरून ड्रीपर्स चोक होणार नाहीत.',
      aEn: 'Dissolve thoroughly in water before suction, and flush drip laterals with clean water for 15-20 minutes post application.',
    },
    {
      qMr: 'घरपोच खते मिळण्यासाठी किती वेळ लागतो?',
      qEn: 'How long does direct farm delivery take across Maharashtra?',
      aMr: 'नाशिक, सांगली, सोलापूर, पुणे व अहिल्यानगर जिल्ह्यात २४ ते ४८ तासांत थेट शेतावर किंवा जवळील ट्रान्सपोर्ट डेपोवर खते पोहोचवली जातात.',
      aEn: 'Direct farm and depot dispatches reach all Maharashtra agro districts within 24 to 48 hours.',
    },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/90 shadow-xl relative overflow-hidden text-left">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5E20] text-white text-xs font-black">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'मायक्रॉनिक कृषी ज्ञान व तंत्रज्ञान' : 'Agri Knowledge & Agronomy Hub'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'द्राक्ष, डाळिंब व बागायती शेती तंत्रज्ञान ब्लॉग'
                : 'Scientific Farming Guides & Viticulture Insights'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
              {language === 'mr'
                ? 'पिंपळगाव बसवंतच्या १०+ वर्षांच्या प्रत्यक्ष संशोधनावर आधारित शेती सल्ले, फवारणी वेळापत्रक, मणी तडकणे उपाय आणि माती आरोग्य सुधारणा.'
                : 'Practical agronomy articles authored by crop specialists to guide grape and orchard farmers in Maharashtra.'}
            </p>

            {/* Search Input Bar */}
            <div className="pt-2 max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'लेखात शोधा (उदा. छाटणी, डाळिंब, झिंक)...' : 'Search topics (e.g., Pruning, Boron, Tomato)...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 bg-white/90 text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              />
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md scale-105'
                  : 'glass-card text-slate-700 border-white/80 hover:bg-white'
              }`}
            >
              {language === 'mr' ? cat.labelMr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="rounded-3xl glass-card overflow-hidden border border-white/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-black backdrop-blur-md">
                  {language === 'mr' ? post.categoryMr : post.categoryEn}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#1B5E20] transition-colors leading-snug line-clamp-2">
                    {language === 'mr' ? post.titleMr : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                    {language === 'mr' ? post.excerptMr : post.excerptEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#1B5E20]" />
                    <span>{post.author}</span>
                  </span>
                  <span className="text-xs font-black text-[#1B5E20] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{language === 'mr' ? 'पूर्ण वाचा' : 'Read Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Farmer FAQs Accordion Section */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/90 shadow-lg space-y-6 text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-[#1B5E20] text-xs font-black">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शेतकऱ्यांचे नेहमीचे प्रश्न (FAQ)' : 'Farmer Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'mr' ? 'खत वापर व पीक नियोजन मार्गदर्शन' : 'Common Questions on Application & Timings'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl glass-card border border-white/90 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left font-black text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-50/40"
                  >
                    <span>{language === 'mr' ? faq.qMr : faq.qEn}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1B5E20] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-white/60">
                      {language === 'mr' ? faq.aMr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Article Full View Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white flex flex-col justify-between text-left">
              
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-white/80">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1B5E20] text-white text-[10px] font-black">
                    {language === 'mr' ? activeArticle.categoryMr : activeArticle.categoryEn}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{activeArticle.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Share Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {language === 'mr' ? activeArticle.titleMr : activeArticle.titleEn}
                </h2>

                <div className="relative h-60 rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={activeArticle.image}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                  {language === 'mr' ? activeArticle.contentMr : activeArticle.contentEn}
                </div>

                {/* Agronomist Callout */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#1B5E20]">
                      {language === 'mr' ? 'अधिक सल्ल्यासाठी संपर्क' : 'Consult Our Agronomist Team'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{activeArticle.author}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'mr'
                      ? 'आपल्या पिकाच्या अचूक डोससाठी बी. एम. सोनवणे सरांशी थेट व्हॉट्सॲपवर चर्चा करा.'
                      : 'Get customized fertilizer dosage advice tailored directly to your soil test reports.'}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                        `नमस्कार, मी '${language === 'mr' ? activeArticle.titleMr : activeArticle.titleEn}' हा लेख वाचला. मला सल्ला हवा आहे.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'व्हॉट्सॲपवर विचारा' : 'WhatsApp Agronomist'}</span>
                    </a>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onNavigate('shop');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'खते खरेदी करा' : 'Buy Fertilizers'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-white/80 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs cursor-pointer"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close Article'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
