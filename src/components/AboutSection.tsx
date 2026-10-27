import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, HeartPulse, Users, Sprout, MapPin, CheckCircle2, Quote, Compass, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, WHY_CHOOSE_US } from '../data/content';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F6F0] text-slate-900 border-t border-emerald-900/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Company Overview & Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B5E20] text-white text-xs font-black shadow-sm">
            <Award className="w-4 h-4 text-amber-300" />
            <span>{COMPANY_DETAILS.positioningEn}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1B5E20] leading-tight tracking-tight">
            {language === 'mr' ? COMPANY_DETAILS.nameMr : COMPANY_DETAILS.nameEn}
          </h2>

          <p className="text-lg sm:text-2xl font-black text-[#2E7D32] tracking-wide">
            {language === 'mr' 
              ? 'मायक्रॉनिक ॲग्री – योग्य पोषण. योग्य मार्गदर्शन. उत्तम वाढ.' 
              : 'Micronik Agri – The Right Nutrition. The Right Guidance. Better Growth.'}
          </p>
        </div>

        {/* Founder & CEO Feature Card + Company Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
          
          {/* CEO Photo & Details */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <img
                src="https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498101/IMG-20260526-WA0014.jpg"
                alt="BM Sonawane - Founder & CEO"
                className="relative w-56 sm:w-64 h-72 sm:h-80 object-cover rounded-2xl shadow-lg border-2 border-emerald-600/30"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#1B5E20]">BM Sonawane</h3>
              <p className="text-xs sm:text-sm font-extrabold text-amber-700 uppercase tracking-widest">
                {language === 'mr' ? 'संस्थापक आणि मुख्य कार्यकारी अधिकारी (Founder & CEO)' : 'Founder & CEO'}
              </p>
              <p className="text-xs text-slate-500 font-semibold">Micronik Agri Private Limited</p>
            </div>
          </div>

          {/* Core Vision & Philosophy Text */}
          <div className="lg:col-span-7 space-y-5 relative z-10">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
              <Quote className="w-5 h-5 text-[#1B5E20]" />
              <span>{language === 'mr' ? 'आमची भूमिका व ध्येय' : 'Our Leadership Vision'}</span>
            </div>

            <div className="space-y-4 text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
              {language === 'mr' ? (
                <>
                  <p className="font-bold text-slate-900 text-sm sm:text-base border-l-4 border-[#1B5E20] pl-3 py-0.5">
                    मायक्रॉनिक ॲग्री प्रायव्हेट लिमिटेड (Micronik Agri Private Limited) मध्ये, आमचा असा ठाम विश्वास आहे की प्रत्येक पिकाला योग्य पोषण आणि प्रत्येक शेतकऱ्याला योग्य मार्गदर्शन मिळालेच पाहिजे.
                  </p>
                  <p>
                    आम्ही जमिनीची स्थिती, पिकाची गरज आणि हंगामी गरजेनुसार डिझाइन केलेली उच्च दर्जाची खते तयार करतो आणि विक्री करतो.
                  </p>
                  <p>
                    भारतभरातील शेतकऱ्यांचा एक विश्वासू कृषी भागीदार बनणे हे आमचे ध्येय (Vision) आहे. आम्ही संशोधन, गुणवत्ता आणि व्यावहारिक उपायांवर लक्ष केंद्रित करतो जे पिकांची उत्तम वाढ आणि उत्पादकता वाढवतात.
                  </p>
                  <p>
                    प्रामाणिक सल्ला आणि विश्वासार्ह उत्पादनांद्वारे शेतकऱ्यांशी दीर्घकालीन नाते निर्माण करणे हे आमचे ध्येय आहे.
                  </p>
                  <p>
                    येत्या काळात आमचे उत्पादन विस्तारून भारतातील विविध प्रदेशांतील अधिकाधिक शेतकरी बांधवांपर्यंत पोहोचण्याचे आमचे नियोजन आहे. आमचे उद्दिष्ट आधुनिक कृषी उपाय शेतकऱ्यांपर्यंत पोहोचवणे आणि शेती अधिक कार्यक्षम व शाश्वत बनवणे हे आहे.
                  </p>
                  <p className="font-extrabold text-[#1B5E20]">
                    आम्ही स्वतःला फक्त एक खत कंपनी म्हणून नाही, तर प्रत्येक शेतकऱ्याच्या समृद्ध शेतीच्या प्रवासातील एक सच्चा भागीदार मानतो.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-900 text-sm sm:text-base border-l-4 border-[#1B5E20] pl-3 py-0.5">
                    At Micronik Agri Private Limited, we believe that every crop deserves the right nutrition and every farmer deserves the right guidance.
                  </p>
                  <p>
                    We manufacture and market quality fertilizers designed according to soil conditions, crop requirements and seasonal needs.
                  </p>
                  <p>
                    Our vision is to become a trusted agricultural partner for farmers across India. We focus on innovation, quality and practical solutions that support better crop growth and productivity.
                  </p>
                  <p>
                    We aim to build long-term relationships with farmers through honest advice and reliable products.
                  </p>
                  <p>
                    In the coming years, we plan to expand our product range and reach more farming communities across different regions. Our goal is to bring modern agricultural solutions closer to farmers and make farming more efficient and sustainable.
                  </p>
                  <p className="font-extrabold text-[#1B5E20]">
                    We see ourselves not just as a fertilizer company, but as a partner in every farmer’s journey towards better agriculture.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="text-xl font-black text-[#1B5E20]">50,000+</div>
                <div className="text-xs text-slate-600 font-bold">
                  {language === 'mr' ? 'समाधानी शेतकरी' : 'Farmers Served'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="text-xl font-black text-amber-800">300+</div>
                <div className="text-xs text-slate-600 font-bold">
                  {language === 'mr' ? 'अधिकृत डीलर नेटवर्क' : 'Authorized Dealers'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black">
              <Compass className="w-6 h-6 text-[#1B5E20]" />
            </div>
            <h4 className="text-lg font-black text-[#1B5E20]">
              {language === 'mr' ? 'योग्य पोषण (Right Nutrition)' : 'Right Nutrition'}
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {language === 'mr'
                ? 'जमिनीचे आरोग्य, पिकांची अवस्था आणि हवामानाचा अंदाज घेऊन तयार केलेली संतुलित खते व पोषक घटक.'
                : 'Custom-formulated micronutrients and fertilizers balanced for specific soil conditions and crop needs.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Lightbulb className="w-6 h-6 text-amber-800" />
            </div>
            <h4 className="text-lg font-black text-[#1B5E20]">
              {language === 'mr' ? 'योग्य मार्गदर्शन (Right Guidance)' : 'Right Guidance'}
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {language === 'mr'
                ? 'शेताच्या बांधावर प्रत्यक्ष जाऊन पिकांचे निरीक्षण आणि कृषी तज्ञांकडून प्रामाणिक तांत्रिक सल्ला.'
                : 'Direct agronomic consultation, seasonal schedule recommendations, and honest advice.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black">
              <TrendingUp className="w-6 h-6 text-[#1B5E20]" />
            </div>
            <h4 className="text-lg font-black text-[#1B5E20]">
              {language === 'mr' ? 'उत्तम वाढ (Better Growth)' : 'Better Growth'}
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {language === 'mr'
                ? 'पिकांची गुणवत्ता, रंग, वजन आणि उत्पादन क्षमता वाढवून शेतकऱ्यांना अधिक नफा मिळवून देणे.'
                : 'Maximizing yield quality, produce size, and profitability for sustainable farming success.'}
            </p>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498061/IMG-20260522-WA0000_1_1.jpg"
            alt="Product Bag"
            className="rounded-2xl shadow-sm object-cover aspect-square border border-amber-300 w-full"
            referrerPolicy="no-referrer"
          />
          <img
            src="https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498149/IMG-20260821-WA0030_1.jpg"
            alt="Grape Harvest"
            className="rounded-2xl shadow-sm object-cover aspect-square border border-emerald-300 w-full"
            referrerPolicy="no-referrer"
          />
          <img
            src="https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498078/IMG-20260522-WA0002_2.jpg"
            alt="Boromix Bag"
            className="rounded-2xl shadow-sm object-cover aspect-square border border-red-300 w-full"
            referrerPolicy="no-referrer"
          />
          <img
            src="https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498111/IMG-20260601-WA0007.jpg"
            alt="Basal Combo"
            className="rounded-2xl shadow-sm object-cover aspect-square border border-emerald-500 w-full"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Why Choose Us Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E20]">
              {language === 'mr' ? 'शेतकरी माइक्रॉनिकवरच विश्वास का ठेवतात?' : 'Why Farmers Trust Micronik Agri'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              {language === 'mr' ? 'आमची ६ खास वैशिष्ट्ये जी आम्हाला इतर कंपन्यांपेक्षा वेगळे ठरवतात.' : 'Our 6 core promises that set us apart as true Doctors of Crops.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-sm space-y-3 hover:border-emerald-400 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black">
                  <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <h4 className="text-lg font-black text-[#1B5E20]">
                  {language === 'mr' ? item.titleMr : item.titleEn}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {language === 'mr' ? item.descMr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
