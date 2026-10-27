import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Instagram, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    crop: 'grapes',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', village: '', crop: 'grapes', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#1B5E20] text-xs font-black">
            <Phone className="w-4 h-4 text-[#1B5E20]" />
            <span>{language === 'mr' ? '२४/७ शेतकरी हेल्पलाइन' : 'Agri Support & Direct Contact'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#1B5E20] tracking-tight">
            {language === 'mr' ? 'मायक्रॉनिक ॲग्री संपर्क केंद्र' : 'Contact Micronik Agri Private Limited'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            {language === 'mr'
              ? 'खास द्राक्ष व पीक सल्लागारांशी थेट बोला किंवा तुमच्या शेतासाठी खतांची ऑर्डर नोंदवा.'
              : 'Reach out for agronomist consultation, dealer enquiries, or direct farm delivery orders.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Company Contact Cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Person Card */}
            <div className="p-6 rounded-3xl bg-[#F8F6F0] border border-emerald-900/10 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] text-amber-300 flex items-center justify-center font-black">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1B5E20]">B.M. Sonawane</h3>
                  <div className="text-xs text-slate-600 font-bold">Director & Senior Crop Doctor</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-extrabold text-slate-800 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span>Helpline Phone 1:</span>
                  <a href={`tel:${COMPANY_DETAILS.phones[0]}`} className="text-[#1B5E20] hover:underline">
                    {COMPANY_DETAILS.phones[0]}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span>Helpline Phone 2:</span>
                  <a href={`tel:${COMPANY_DETAILS.phones[1]}`} className="text-[#1B5E20] hover:underline">
                    {COMPANY_DETAILS.phones[1]}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span>GST Number:</span>
                  <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">{COMPANY_DETAILS.gstNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimary}`}
                  className="py-3 rounded-xl bg-[#1B5E20] hover:bg-[#144718] text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Micronik%20Agri,%20I%20have%20an%20inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Address & Email Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-xs">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1B5E20] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">मुख्य पत्ता (Headquarters Address):</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                      {COMPANY_DETAILS.fullAddressEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Mail className="w-5 h-5 text-[#1B5E20] shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">ईमेल (Official Email):</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-[#1B5E20] font-bold hover:underline">
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Instagram className="w-5 h-5 text-pink-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">इन्स्टाग्राम (Official Instagram):</span>
                    <a
                      href={COMPANY_DETAILS.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 font-bold hover:underline"
                    >
                      @micronikagripvtltd
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Form (Right) */}
          <div className="lg:col-span-7 bg-[#F8F6F0] rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xl space-y-6">
            
            <div>
              <h3 className="text-2xl font-black text-[#1B5E20]">
                {language === 'mr' ? 'शेतकरी चौकशी फॉर्म' : 'Farmer Advisory & Order Form'}
              </h3>
              <p className="text-xs text-slate-600 font-semibold">
                {language === 'mr'
                  ? 'खालील फॉर्म भरा, आमची टीम तुम्हाला १० मिनिटात फोन करेल.'
                  : 'Fill in your details and our agronomy team will contact you shortly.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-100 text-[#1B5E20] border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#4CAF50] mx-auto" />
                <h4 className="text-lg font-black">
                  {language === 'mr' ? 'चौकशी यशस्वीपणे पाठवली गेली!' : 'Enquiry Sent Successfully!'}
                </h4>
                <p className="text-xs font-semibold">
                  {language === 'mr'
                    ? 'बी. एम. सोनवणे आणि आमची टीम तुम्हाला लवकरच संपर्क करेल.'
                    : 'Agronomist B.M. Sonawane will review your inquiry and call back.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">पूर्ण नाव (Full Name)</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="उदा. नितीन पाटील"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">मोबाईल नंबर (Mobile Number)</label>
                    <input
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9822XXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">गाव व तालुका (Village/Taluka)</label>
                    <input
                      type="text"
                      name="address"
                      autoComplete="address-level2"
                      required
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      placeholder="उदा. पिंपळगाव बसवंत"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">मुख्य पीक (Primary Crop)</label>
                    <select
                      name="crop"
                      autoComplete="off"
                      value={formData.crop}
                      onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent outline-none cursor-pointer"
                    >
                      <option value="grapes">द्राक्ष (Grapes)</option>
                      <option value="pomegranate">डाळिंब (Pomegranate)</option>
                      <option value="tomato">टोमॅटो (Tomato)</option>
                      <option value="vegetables">कांदा व भाजीपाला (Onions/Veg)</option>
                      <option value="other">इतर (Other)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">तुमचा संदेश / समस्या (Message/Question)</label>
                  <textarea
                    rows={3}
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="उदा. द्राक्ष बागेत ऑक्टोबर छाटणीसाठी बेसल डोसचा सल्ला हवा आहे..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#1B5E20] hover:bg-[#144718] text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'mr' ? 'चौकशी पाठवा (Send Message)' : 'Submit Advisory Request'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
