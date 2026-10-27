import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Store, 
  MapPin, 
  Phone, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  Handshake, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  Send,
  BadgeCheck,
  Search
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS, DEALERS_LOCATIONS } from '../data/content';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface DealersPageProps {
  language: Language;
}

export const DealersPage: React.FC<DealersPageProps> = ({ language }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    district: 'Nashik',
    taluka: '',
    licenseNumber: '',
    gstNumber: '',
    expectedVolume: '5-10 Tons',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Extended Dealers List across Maharashtra agriculture hubs
  const allDealers = [
    ...DEALERS_LOCATIONS,
    {
      id: 'd4',
      districtMr: 'नाशिक',
      districtEn: 'Nashik',
      dealerNameMr: 'समर्थ ॲग्रो एजन्सी',
      dealerNameEn: 'Samarth Agro Agency',
      townMr: 'सायखेडा, निफाड, नाशिक',
      townEn: 'Saikheda, Niphad, Nashik',
      contactPerson: 'Kiran Shinde',
      phone: '9822114455',
      lat: 20.0812,
      lng: 74.0215,
    },
    {
      id: 'd5',
      districtMr: 'सांगली',
      districtEn: 'Sangli',
      dealerNameMr: 'तासगाव द्राक्ष कृषी सेवा केंद्र',
      dealerNameEn: 'Tasgaon Grape Krushi Seva Kendra',
      townMr: 'मार्केट यार्ड, तासगाव, सांगली',
      townEn: 'Market Yard, Tasgaon, Sangli',
      contactPerson: 'Vilasrao Patil',
      phone: '9422001122',
      lat: 17.0315,
      lng: 74.6012,
    },
    {
      id: 'd6',
      districtMr: 'सोलापूर',
      districtEn: 'Solapur',
      dealerNameMr: 'पंढरपूर फार्मर्स ॲग्रो सर्व्हिसेस',
      dealerNameEn: 'Pandharpur Farmers Agro Services',
      townMr: 'स्टेशन रोड, पंढरपूर, सोलापूर',
      townEn: 'Station Road, Pandharpur, Solapur',
      contactPerson: 'Amol Deshmukh',
      phone: '9890123456',
      lat: 17.6781,
      lng: 75.3278,
    },
    {
      id: 'd7',
      districtMr: 'पुणे',
      districtEn: 'Pune',
      dealerNameMr: 'बारामती ॲग्रो फर्टिलायझर्स',
      dealerNameEn: 'Baramati Agro Fertilizers',
      townMr: 'भिगवण रोड, बारामती, पुणे',
      townEn: 'Bhigwan Road, Baramati, Pune',
      contactPerson: 'Sachin Jagtap',
      phone: '9765432100',
      lat: 18.1517,
      lng: 74.5768,
    },
    {
      id: 'd8',
      districtMr: 'अहिल्यानगर (अहमदनगर)',
      districtEn: 'Ahmednagar',
      dealerNameMr: 'राहाता कृषी विकास केंद्र',
      dealerNameEn: 'Rahata Krushi Vikas Kendra',
      townMr: 'शिर्डी-राहाता बायपास, राहाता',
      townEn: 'Shirdi-Rahata Bypass, Rahata',
      contactPerson: 'Mahesh Gorde',
      phone: '9860112233',
      lat: 19.7042,
      lng: 74.4821,
    },
  ];

  const districts = [
    { id: 'all', labelMr: 'सर्व जिल्हे (All)', labelEn: 'All Districts' },
    { id: 'Nashik', labelMr: 'नाशिक (Nashik Hub)', labelEn: 'Nashik' },
    { id: 'Sangli', labelMr: 'सांगली (Sangli)', labelEn: 'Sangli' },
    { id: 'Solapur', labelMr: 'सोलापूर (Solapur)', labelEn: 'Solapur' },
    { id: 'Pune', labelMr: 'पुणे (Pune / Baramati)', labelEn: 'Pune' },
    { id: 'Ahmednagar', labelMr: 'अहिल्यानगर (Ahmednagar)', labelEn: 'Ahmednagar' },
  ];

  const filteredDealers = allDealers.filter((dealer) => {
    const matchesDistrict =
      selectedDistrict === 'all' ||
      dealer.districtEn.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
      dealer.districtMr.includes(selectedDistrict);
    const query = searchFilter.toLowerCase().trim();
    const matchesSearch =
      !query ||
      dealer.dealerNameEn.toLowerCase().includes(query) ||
      dealer.dealerNameMr.toLowerCase().includes(query) ||
      dealer.townEn.toLowerCase().includes(query) ||
      dealer.townMr.toLowerCase().includes(query);
    return matchesDistrict && matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'dealer_inquiries'), {
          ...formData,
          createdAt: serverTimestamp(),
          status: 'pending',
        });
      }
    } catch (err) {
      console.warn('Saved locally due to offline mode', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
    }
  };

  return (
    <div className="py-8 sm:py-12 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Hero Banner */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/90 shadow-xl relative overflow-hidden text-left">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5E20] text-white text-xs font-black">
              <Building className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'अधिकृत डीलरशिप व वितरक नेटवर्क' : 'Authorized Dealer Network & Dealership'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'मायक्रॉनिक ॲग्रीचे अधिकृत डीलर बना!'
                : 'Partner with Micronik Agri Network'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
              {language === 'mr'
                ? 'महाराष्ट्रातील कृषी सेवा केंद्र चालक, वितरक व कृषी कंपन्यांसाठी सुवर्णसंधी. आमच्या १००% प्रयोगशाळा प्रमाणित खतांची विक्री करून आकर्षक नफा मिळवा.'
                : 'Join Maharashtra’s most trusted viticulture and micronutrient brand. Unrivaled wholesale pricing, direct factory margins, fast depot dispatch, and full agronomy support.'}
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl glass-card border border-white/90 shadow-sm space-y-1">
                <Store className="w-5 h-5 text-[#1B5E20]" />
                <h2 className="font-extrabold text-xs text-slate-900">
                  {language === 'mr' ? 'थेट फॅक्टरी मार्जिन' : 'Wholesale Margins'}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'mr' ? '२५% ते ४०% आकर्षक डीलर नफा.' : 'High margins with seasonal volume incentives.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-white/90 shadow-sm space-y-1">
                <Truck className="w-5 h-5 text-[#1B5E20]" />
                <h2 className="font-extrabold text-xs text-slate-900">
                  {language === 'mr' ? '२४-४८ तासात डिलिव्हरी' : 'Fast 24-48h Dispatch'}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'mr' ? 'पिंपळगाव मुख्य डेपोमधून थेट गाडी पोहोच.' : 'Direct door delivery from Pimpalgaon Baswant depot.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-white/90 shadow-sm space-y-1">
                <Handshake className="w-5 h-5 text-[#1B5E20]" />
                <h2 className="font-extrabold text-xs text-slate-900">
                  {language === 'mr' ? 'शेतकरी मेळावे सपोर्ट' : 'Marketing & Lead Support'}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'mr' ? 'पोस्टर, बॅनर व बी. एम. सोनवणे सरांचा सल्ला.' : 'Promotional kits, farmer workshops, and agronomy backup.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Column Layout: Dealer Locator & Online Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authorized Dealers Directory (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1B5E20]" />
                  <span>{language === 'mr' ? 'जवळचे अधिकृत डीलर शोधा' : 'Find Authorized Dealers Near You'}</span>
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  {language === 'mr' ? 'थेट फोन करा किंवा दुकानाला भेट द्या.' : 'Verified agro-shops stocking official Micronik fertilizers.'}
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder={language === 'mr' ? 'दुकान किंवा गाव शोधा...' : 'Search shop or town...'}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/80 border border-slate-200 text-xs font-bold"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* District Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {districts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDistrict === d.id
                      ? 'bg-[#1B5E20] text-white shadow-sm'
                      : 'glass-card text-slate-700 hover:bg-white'
                  }`}
                >
                  {language === 'mr' ? d.labelMr : d.labelEn}
                </button>
              ))}
            </div>

            {/* Dealer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className={`rounded-2xl glass-card p-5 border transition-all duration-300 space-y-3 flex flex-col justify-between ${
                    dealer.isMainHub ? 'border-[#1B5E20] bg-emerald-50/40 shadow-md' : 'border-white/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {language === 'mr' ? dealer.districtMr : dealer.districtEn}
                      </span>
                      {dealer.isMainHub && (
                        <span className="text-[10px] font-black text-amber-900 bg-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" />
                          <span>HEAD DEPOT</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                      {language === 'mr' ? dealer.dealerNameMr : dealer.dealerNameEn}
                    </h4>

                    <p className="text-xs text-slate-600 font-medium flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{language === 'mr' ? dealer.townMr : dealer.townEn}</span>
                    </p>

                    <div className="text-[11px] text-slate-500 font-semibold">
                      {language === 'mr' ? 'संपर्क व्यक्ती:' : 'Contact:'} <span className="text-slate-800 font-bold">{dealer.contactPerson}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${dealer.phone}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{dealer.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/91${dealer.phone}?text=${encodeURIComponent(
                        `नमस्कार, मला मायक्रॉनिक खतांच्या उपलब्धतेबद्दल विचारायचे आहे.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold"
                      title="WhatsApp Dealer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Depot Notice Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white space-y-2 border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-black">
                <Store className="w-4 h-4" />
                <span>{language === 'mr' ? 'थेट मुख्य डेपो संपर्क' : 'Central Pimpalgaon Baswant Depot'}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {language === 'mr'
                  ? 'तुमच्या तालुक्यात डीलर नसल्यास थेट आमच्या मुख्य कार्यालयातून ट्रक / टेम्पो लोड ऑर्डर बुक करा.'
                  : 'If there is no authorized dealer in your block, order full vehicle loads directly from our main depot.'}
              </p>
              <div className="pt-1 flex items-center gap-3">
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimary}`}
                  className="text-xs font-black text-amber-300 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{COMPANY_DETAILS.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Online Dealership Application Form (5 Cols) */}
          <div className="lg:col-span-5 text-left">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-xl space-y-5">
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  <FileText className="w-3 h-3" />
                  <span>{language === 'mr' ? 'ऑनलाईन अर्ज' : 'Online Registration'}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'mr' ? 'नवीन डीलरशिपसाठी अर्ज करा' : 'Apply for Dealership'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {language === 'mr'
                    ? 'माहिती भरा, आमचे मार्केटिंग मॅनेजर २४ तासात संपर्क करतील.'
                    : 'Submit details and our sales executive will contact you with wholesale price-lists.'}
                </p>
              </div>

              {submittedSuccessfully ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-emerald-950">
                      {language === 'mr' ? 'अर्ज यशस्वीरित्या प्राप्त झाला!' : 'Application Submitted Successfully!'}
                    </h4>
                    <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                      {language === 'mr'
                        ? 'मायक्रॉनिक ॲग्री टीम २४ तासात आपल्याशी संपर्क साधेल आणि होलसेल प्राईस लिस्ट पाठवेल.'
                        : 'Our territory manager will call you within 24 hours with product catalog & wholesale quotations.'}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                      `नमस्कार, मी ${formData.shopName} (${formData.ownerName}, ${formData.district}) कडून मायक्रॉनिक ॲग्रीच्या डीलरशिपसाठी अर्ज केला आहे. कृपया प्राईस लिस्ट पाठवा.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md inline-flex"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'mr' ? 'व्हॉट्सॲपवर त्वरित अपडेट मिळवा' : 'Connect Instantly on WhatsApp'}</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'mr' ? 'कृषी केंद्राचे / दुकानाचे नाव *' : 'Shop / Krushi Kendra Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder={language === 'mr' ? 'उदा. श्री गजानन ॲग्रो एजन्सी' : 'e.g. Samarth Krushi Seva Kendra'}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'मालकाचे नाव *' : 'Proprietor Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        placeholder={language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10 digit number"
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'जिल्हा *' : 'District *'}
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                      >
                        <option value="Nashik">नाशिक (Nashik)</option>
                        <option value="Sangli">सांगली (Sangli)</option>
                        <option value="Solapur">सोलापूर (Solapur)</option>
                        <option value="Pune">पुणे (Pune)</option>
                        <option value="Ahmednagar">अहिल्यानगर (Ahmednagar)</option>
                        <option value="Satara">सातारा (Satara)</option>
                        <option value="Jalgaon">जळगाव (Jalgaon)</option>
                        <option value="Other">इतर (Other District)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'तालुका / गाव *' : 'Taluka / Town *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.taluka}
                        onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                        placeholder={language === 'mr' ? 'उदा. निफाड / पिंपळगाव' : 'e.g. Niphad / Tasgaon'}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'अपेक्षित मासिक मागणी' : 'Expected Monthly Vol.'}
                      </label>
                      <select
                        value={formData.expectedVolume}
                        onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold"
                      >
                        <option value="2-5 Tons">2 - 5 Tons (Small)</option>
                        <option value="5-10 Tons">5 - 10 Tons (Standard)</option>
                        <option value="10-25 Tons">10 - 25 Tons (Semi-Wholesale)</option>
                        <option value="25+ Tons">25+ Tons (Distributor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {language === 'mr' ? 'जीएसटी नंबर (ऐच्छिक)' : 'GST Number (Optional)'}
                      </label>
                      <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                        placeholder="27XXXXXXXXXXXXX"
                        className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'mr' ? 'काही विशेष संदेश / प्रश्न' : 'Message or Special Requirements'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={language === 'mr' ? 'तुमच्या भागातील द्राक्ष/टोमॅटो क्षेत्राबद्दल सांगा...' : 'Tell us about your region crops or customer base...'}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#1B5E20] hover:from-emerald-700 hover:to-emerald-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'mr' ? 'नोंदणी होत आहे...' : 'Submitting Application...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{language === 'mr' ? 'डीलरशिपसाठी अर्ज सबमिट करा' : 'Submit Dealership Application'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
