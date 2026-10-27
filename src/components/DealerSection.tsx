import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Store, Truck, Handshake, MapPin, Phone, Building, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { DEALERS_LOCATIONS, COMPANY_DETAILS } from '../data/content';

interface DealerSectionProps {
  language: Language;
  onOpenDealerModal: () => void;
}

export const DealerSection: React.FC<DealerSectionProps> = ({ language, onOpenDealerModal }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const filteredDealers = selectedDistrict === 'all'
    ? DEALERS_LOCATIONS
    : DEALERS_LOCATIONS.filter(d => d.districtEn.toLowerCase().includes(selectedDistrict.toLowerCase()));

  return (
    <section id="dealers" className="py-20 bg-white text-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Invite */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C400]/20 text-[#F5C400] text-xs font-bold border border-[#F5C400]/30">
              <Store className="w-4 h-4" />
              <span>{language === 'mr' ? 'डीलरशिप व वितरक आमंत्रण' : 'Distributor & Dealer Network'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'mr' ? 'माइक्रॉनिक ॲग्रीचे अधिकृत डीलर बना!' : 'Partner with Micronik Agri Network'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {language === 'mr'
                ? 'महाराष्ट्रातील कृषी सेवा केंद्र चालक व वितरकांसाठी सुवर्णसंधी. आमच्या उत्कृष्ट गुणवत्तेच्या खतांची विक्री करून तुमचा व्यवसाय दुप्पट करा.'
                : 'Expand your agro-retail business with Maharashtra’s trusted micronutrient brand. Unmatched profit margins, lab-certified quality, and prompt dispatch.'}
            </p>

            {/* 3 Dealer Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <Store className="w-6 h-6 text-[#F5C400] mb-2" />
                <h3 className="font-bold text-white text-sm">
                  {language === 'mr' ? 'बल्क ऑर्डर्स (Bulk Orders)' : 'Bulk Orders & Margins'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'mr' ? 'थेट कंपनी दरात आकर्षक मार्जिन व डिस्काउंट.' : 'Highly competitive wholesale pricing & seasonal rebates.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <Truck className="w-6 h-6 text-[#F5C400] mb-2" />
                <h3 className="font-bold text-white text-sm">
                  {language === 'mr' ? 'जलद लॉजिस्टिक्स (Fast Delivery)' : 'Fast Logistics'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'mr' ? 'पिंपळगाव डेपोमधून २४-४८ तासात गाडी पोहोच.' : 'Direct dispatch from Pimpalgaon depot within 24-48 hours.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <Handshake className="w-6 h-6 text-[#F5C400] mb-2" />
                <h3 className="font-bold text-white text-sm">
                  {language === 'mr' ? 'मार्केटिंग सपोर्ट (Partnership)' : 'Marketing Support'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'mr' ? 'शेतकरी मेळावे, पोस्टर्स व प्रॉडक्ट कॅटलॉग.' : 'Farmer meets, promotional posters & technical support.'}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDealerModal}
                className="px-8 py-4 rounded-2xl font-extrabold text-sm sm:text-base text-slate-950 bg-[#F5C400] hover:bg-amber-300 shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>{language === 'mr' ? 'डीलरशिप अर्जासाठी येथे क्लिक करा' : 'Become an Authorized Dealer'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="px-6 py-4 rounded-2xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                {language === 'mr' ? 'डीलर हेल्पलाइन: ८८०५४५२२८८' : 'Dealer Hotline: 8805452288'}
              </a>
            </div>
          </div>
        </div>

        {/* Dealer Network Search / Locator */}
        <div className="mt-16 text-left space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {language === 'mr' ? 'जवळचे अधिकृत डीलर शोधा' : 'Find Authorized Dealers Near You'}
              </h3>
              <p className="text-xs text-slate-600">
                {language === 'mr' ? 'नाशिक, सांगली, सोलापूर, अहमदनगर व इतर जिल्हे:' : 'Search by district or township:'}
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['all', 'nashik', 'sangli', 'solapur', 'ahmednagar'].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors shrink-0 ${
                    selectedDistrict === dist
                      ? 'bg-[#B71C1C] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {/* Dealer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                className={`p-5 rounded-2xl border transition-all ${
                  dealer.isMainHub
                    ? 'bg-amber-50/80 border-amber-300 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {language === 'mr' ? dealer.districtMr : dealer.districtEn}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base mt-1">
                      {language === 'mr' ? dealer.dealerNameMr : dealer.dealerNameEn}
                    </h4>
                  </div>
                  {dealer.isMainHub && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B71C1C] text-white">
                      {language === 'mr' ? 'मुख्य डेपो' : 'Main Depot'}
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B71C1C]" />
                    <span>{language === 'mr' ? dealer.townMr : dealer.townEn}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{dealer.contactPerson}: {dealer.phone}</span>
                  </div>
                </div>

                <a
                  href={`tel:${dealer.phone}`}
                  className="mt-4 w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'डीलरला फोन करा' : 'Call Dealer'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
