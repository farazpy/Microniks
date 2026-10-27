import React from 'react';
import { Phone, Mail, MapPin, Instagram, Stethoscope, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 md:pb-12 border-t border-emerald-900/30 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left border-b border-slate-800 pb-12">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="footer" size="lg" showTagline={true} />

            <p className="text-xs text-slate-300 font-medium leading-relaxed pt-2">
              {language === 'mr' ? COMPANY_DETAILS.secondaryLineMr : COMPANY_DETAILS.secondaryLineEn}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-bold space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-black">
                <Stethoscope className="w-4 h-4" />
                <span>{COMPANY_DETAILS.positioningEn}</span>
              </div>
              <div>GSTIN: <span className="text-white">{COMPANY_DETAILS.gstNumber}</span></div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              {language === 'mr' ? 'महत्वाच्या लिंक्स' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'मुख्यपृष्ठ (Home)' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'दुकान (Shop Products)' : 'Shop Products'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('schedules')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'पीक वेळापत्रक व डोस' : 'Crop Schedules & Dosage'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dealers')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'अधिकृत डीलर नेटवर्क' : 'Dealers & Franchise'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'कृषी ज्ञान व ब्लॉग' : 'Agri Blog & Guides'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'आमच्याबद्दल (About Us)' : 'About Micronik Agri'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#4CAF50] cursor-pointer">
                  {language === 'mr' ? 'संपर्क (Contact Us)' : 'Contact & Helpline'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              {language === 'mr' ? 'संपर्क व कार्यालय' : 'Head Office & Helpline'}
            </h4>

            <div className="space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.fullAddressEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span>Helpline: <a href={`tel:${COMPANY_DETAILS.phonePrimary}`} className="text-amber-300 font-black">{COMPANY_DETAILS.phoneFormatted}</a></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:underline">{COMPANY_DETAILS.email}</a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={COMPANY_DETAILS.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-300 font-extrabold hover:underline">
                  Follow on Instagram (@micronikagripvtltd)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-semibold">
          <div>
            © 2026 {COMPANY_DETAILS.nameEn}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenAdmin} className="text-slate-500 hover:text-white">
              Admin Login
            </button>
            <span>•</span>
            <span>Pimpalgaon Baswant, Nashik</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
