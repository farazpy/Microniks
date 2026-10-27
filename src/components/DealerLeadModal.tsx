import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Send, CheckCircle2, X, Building, Phone, MapPin, User } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface DealerLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DealerLeadModal: React.FC<DealerLeadModalProps> = ({ isOpen, onClose, language }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    district: 'Nashik',
    taluka: '',
    currentBusiness: 'Agri Retail Shop'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Also offer WhatsApp direct trigger
    const text = language === 'mr'
      ? `नमस्कार, मी डीलरशिप अर्जासाठी माहिती भरली आहे:\nदुकान: ${formData.shopName}\nनाव: ${formData.ownerName}\nफोन: ${formData.phone}\nजिल्हा: ${formData.district}, तालुका: ${formData.taluka}`
      : `Hello, I submitted a dealership inquiry:\nShop: ${formData.shopName}\nName: ${formData.ownerName}\nPhone: ${formData.phone}\nDistrict: ${formData.district}, Taluka: ${formData.taluka}`;

    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-md relative text-left border border-slate-200"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-100 text-[#B71C1C]">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {language === 'mr' ? 'डीलरशिप अर्ज / चौकशी' : 'Become an Authorized Dealer'}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {language === 'mr' ? 'माहिती भरा, आमचे मार्केटिंग अधिकारी थेट संपर्क साधतील' : 'Fill details below to get wholesale agency terms'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-700 mb-1">
                      {language === 'mr' ? 'दुकान/फर्मचे नाव (Shop / Firm Name):' : 'Agri Shop / Firm Name:'}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder="उदा. बसुका कृषी सेवा केंद्र"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B71C1C] focus:border-transparent text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">
                        {language === 'mr' ? 'मालकाचे नाव (Owner Name):' : 'Owner Name:'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        placeholder="उदा. नितीन पाटील"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B71C1C] focus:border-transparent text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        {language === 'mr' ? 'फोन नंबर (Mobile No):' : 'Mobile Number:'}
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="9822XXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B71C1C] focus:border-transparent text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1">
                        {language === 'mr' ? 'जिल्हा (District):' : 'District:'}
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B71C1C] focus:border-transparent text-slate-800 bg-white"
                      >
                        <option value="Nashik">नाशिक (Nashik)</option>
                        <option value="Sangli">सांगली (Sangli)</option>
                        <option value="Solapur">सोलापूर (Solapur)</option>
                        <option value="Ahmednagar">अहमदनगर (Ahmednagar)</option>
                        <option value="Pune">पुणे (Pune)</option>
                        <option value="Jalgaon">जळगाव (Jalgaon)</option>
                        <option value="Satara">सातारा (Satara)</option>
                        <option value="Other">इतर जिल्हा (Other)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        {language === 'mr' ? 'तालुका / गाव (Taluka):' : 'Taluka / Village:'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.taluka}
                        onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                        placeholder="उदा. निफाड / पिंपळगाव"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B71C1C] focus:border-transparent text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-[#F5C400] hover:bg-amber-300 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'mr' ? 'डीलरशिप अर्ज पाठवा' : 'Submit Dealer Inquiry'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {language === 'mr' ? 'अर्ज यशस्वीपणे मिळाला!' : 'Inquiry Submitted Successfully!'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {language === 'mr'
                    ? 'धन्यवाद. बी. एम. सोनवणे व मायक्रॉनिक टीम तुमच्याशी २४ तासांत संपर्क साधेल.'
                    : 'Thank you. BM Sonawane & team will review your application and contact you shortly.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close Window'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
