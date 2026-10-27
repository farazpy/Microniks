import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Building2,
  Lock,
  CheckCircle2,
  Sparkles,
  Loader2,
  User as UserIcon,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { Language, CartItem, ShippingDetails, Order, UserProfile } from '../types';
import { auth, signInWithGoogle, saveOrderToFirestore } from '../lib/firebase';
import { COMPANY_DETAILS } from '../data/content';

interface CheckoutPageProps {
  language: Language;
  cartItems: CartItem[];
  appliedDiscount: number;
  couponCode: string;
  onClearCart: () => void;
  onNavigate: (page: string) => void;
  onOrderSuccess: (order: Order) => void;
  onOpenAuthModal: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  language,
  cartItems,
  appliedDiscount,
  couponCode,
  onClearCart,
  onNavigate,
  onOrderSuccess,
  onOpenAuthModal,
}) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | 'bank_transfer'>('razorpay');

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('Nashik (नाशिक)');
  const [pincode, setPincode] = useState('');
  const [gstin, setGstin] = useState('');
  const [notes, setNotes] = useState('');

  // Pre-fill user details if logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        if (user.displayName && !fullName) setFullName(user.displayName);
        if (user.email && !email) setEmail(user.email);
        if (user.phoneNumber && !phone) setPhone(user.phoneNumber);
      }
    });
    return () => unsubscribe();
  }, []);

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const deliveryCharge = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 70;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full rounded-3xl glass-panel p-8 text-center space-y-4 shadow-xl border border-white/80">
          <h2 className="text-xl font-black text-slate-900">
            {language === 'mr' ? 'कार्टमध्ये कोणतेही उत्पादन नाही' : 'No items in cart to checkout'}
          </h2>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 rounded-2xl bg-[#1B5E20] text-white font-extrabold text-sm shadow-md"
          >
            {language === 'mr' ? 'दुकान पहा' : 'Browse Store'}
          </button>
        </div>
      </div>
    );
  }

  const districtsList = [
    'Nashik (नाशिक)',
    'Ahmednagar (अहिल्यानगर/अहमदनगर)',
    'Pune (पुणे)',
    'Sangli (सांगली)',
    'Solapur (सोलापूर)',
    'Satara (सातारा)',
    'Kolhapur (कोल्हापूर)',
    'Jalgaon (जळगाव)',
    'Chhatrapati Sambhajinagar / Aurangabad (छत्रपती संभाजीनगर)',
    'Jalna (जालना)',
    'Dhule (धुळे)',
    'Nandurbar (नंदुरबार)',
    'Beed (बीड)',
    'Latur (लातूर)',
    'Dharashiv / Osmanabad (धाराशिव)',
    'Nanded (नांदेड)',
    'Parbhani (परभणी)',
    'Hingoli (हिंगोली)',
    'Buldhana (बुलढाणा)',
    'Akola (अकोला)',
    'Amravati (अमरावती)',
    'Yavatmal (यवतमाळ)',
    'Nagpur (नागपूर)',
    'Wardha (वर्धा)',
    'Chandrapur (चंद्रपूर)',
    'Thane (ठाणे)',
    'Palghar (पालघर)',
    'Raigad (रायगड)',
    'Ratnagiri (रत्नागिरी)',
    'Sindhudurg (सिंधुदुर्ग)',
    'Other District (इतर जिल्हा)'
  ];

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      alert(language === 'mr' ? 'कृपया सर्व आवश्यक माहिती भरा.' : 'Please fill all mandatory address fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const generatedOrderNumber = `MCN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderId = `ord_${Date.now()}`;

      const shippingDetails: ShippingDetails = {
        fullName,
        phone,
        email,
        address,
        village,
        taluka,
        district,
        state: 'Maharashtra',
        pincode,
        gstin,
        notes
      };

      const newOrder: Order = {
        id: orderId,
        orderNumber: generatedOrderNumber,
        userId: currentUser ? currentUser.uid : 'guest',
        customerEmail: email || currentUser?.email || '',
        customerPhone: phone,
        items: cartItems,
        subtotal,
        discount: discountAmount,
        gstAmount,
        total: grandTotal,
        shipping: shippingDetails,
        shippingDetails,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save real order to Firestore
      await saveOrderToFirestore(newOrder);

      // Clear cart & trigger success screen
      onClearCart();
      onOrderSuccess(newOrder);
    } catch (err: any) {
      console.error('Failed to place order:', err);
      alert('Order failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('cart')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel text-slate-800 font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#1B5E20]" />
            <span>{language === 'mr' ? 'कार्टकडे परत जा' : 'Back to Cart'}</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>{language === 'mr' ? '२५६-बिट सुरक्षित चेकआऊट' : '256-Bit SSL Encrypted Checkout'}</span>
          </div>
        </div>

        {/* Auth Banner if not signed in */}
        {!currentUser && (
          <div className="p-4 sm:p-5 rounded-3xl glass-card border border-amber-300/80 bg-amber-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 font-black shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'mr' ? 'गुगल खात्यासह जलद चेकआऊट करा' : 'Sign In with Google for 1-Click Checkout'}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'mr'
                    ? 'पत्ता आणि संपर्क आपोआप भरला जाईल व ऑर्डर ट्रॅक करणे सोपे होईल.'
                    : 'Auto-fill your details and access live WhatsApp & app tracking.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-md border border-slate-300 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>{language === 'mr' ? 'गुगल लॉगिन' : 'Sign in with Google'}</span>
            </button>
          </div>
        )}

        {/* Main Checkout Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Shipping Details & Payment (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4">
                <div className="w-8 h-8 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center font-black text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {language === 'mr' ? 'डिलिव्हरी व शेताचा पत्ता' : 'Delivery & Farm Address'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'mr' ? 'पार्सल पोहोचण्यासाठी अचूक माहिती भरा' : 'Enter recipient and location details'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'शेतकऱ्याचे संपूर्ण नाव *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Baburao Patil"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'मोबाईल / व्हॉट्सॲप नंबर *' : 'WhatsApp Mobile Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'ईमेल (पर्यायी - इनव्हॉइससाठी)' : 'Email (Optional - for Invoice)'}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. farmer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* District Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'जिल्हा (District) *' : 'District *'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {districtsList.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Village & Taluka */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'गाव / तालुका (Village / Taluka)' : 'Village / Taluka'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pimpalgaon Baswant, Niphad"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'mr' ? 'पिनकोड (Pincode) *' : 'Postal Pincode *'}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 422209"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

              </div>

              {/* Street / Farm Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {language === 'mr' ? 'शेताचा / घराचा पत्ता व लँडमार्क *' : 'Farm Address & Landmark *'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    required
                    rows={2}
                    placeholder="Gat No / Farm landmark, Near Temple / Main Road"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* GSTIN (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'mr' ? 'जीएसटी नंबर (डीलर किंवा मोठ्या फार्मसाठी पर्यायी)' : 'GSTIN (Optional for dealers/large farms)'}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 27AAPCM8755L3ZG"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-mono uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4">
                <div className="w-8 h-8 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center font-black text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {language === 'mr' ? 'पेमेंट पद्धत निवडा' : 'Select Payment Method'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'mr' ? 'सुरक्षित ऑनलाइन किंवा कॅश ऑन डिलिव्हरी' : 'Choose instant UPI/Online or Pay on Delivery'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. UPI / Online */}
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paymentMethod === 'razorpay'
                      ? 'border-[#1B5E20] bg-emerald-50/80 shadow-md ring-2 ring-[#4CAF50]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-[#1B5E20]"
                    />
                  </div>
                  <div>
                    <span className="font-black text-xs sm:text-sm text-slate-900 block">
                      UPI / Online
                    </span>
                    <span className="text-[11px] text-slate-500">
                      GPay, PhonePe, Cards, NetBanking
                    </span>
                  </div>
                </label>

                {/* 2. Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#1B5E20] bg-emerald-50/80 shadow-md ring-2 ring-[#4CAF50]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote className="w-5 h-5 text-amber-600" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#1B5E20]"
                    />
                  </div>
                  <div>
                    <span className="font-black text-xs sm:text-sm text-slate-900 block">
                      Cash on Delivery
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {language === 'mr' ? 'माल शेतावर आल्यावर पैसे द्या' : 'Pay when parcel arrives'}
                    </span>
                  </div>
                </label>

                {/* 3. Direct Bank Transfer */}
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#1B5E20] bg-emerald-50/80 shadow-md ring-2 ring-[#4CAF50]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="accent-[#1B5E20]"
                    />
                  </div>
                  <div>
                    <span className="font-black text-xs sm:text-sm text-slate-900 block">
                      Bank Transfer
                    </span>
                    <span className="text-[11px] text-slate-500">
                      NEFT / RTGS Company Account
                    </span>
                  </div>
                </label>

              </div>

              {/* Payment Details Note */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
                  <div className="font-bold">Micronik Agri Private Limited Bank Details:</div>
                  <div>Bank: State Bank of India | Branch: Pimpalgaon Baswant</div>
                  <div>A/C No: 38920192831 | IFSC: SBIN0001234</div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Order Review Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl glass-panel p-6 border border-white/90 shadow-xl space-y-5 sticky top-24">
              
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-200/80 pb-3">
                {language === 'mr' ? 'ऑर्डर सारांश' : 'Order Review'}
              </h2>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt=""
                      className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 object-contain shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 truncate">
                        {language === 'mr' ? item.product.nameMr : item.product.nameEn}
                      </div>
                      <div className="text-slate-500">
                        Qty: {item.quantity} × ₹{item.selectedVariant ? item.selectedVariant.price : item.product.price}
                      </div>
                    </div>
                    <span className="font-black text-slate-900">
                      ₹{(item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation */}
              <div className="border-t border-slate-200 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>{language === 'mr' ? 'उपएकूण:' : 'Subtotal:'}</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{language === 'mr' ? 'सवलत:' : 'Discount:'}</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>{language === 'mr' ? 'डिलिव्हरी शुल्क:' : 'Shipping Fee:'}</span>
                  <span className="font-bold text-emerald-700">
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="text-base font-black text-slate-900">
                    {language === 'mr' ? 'एकूण देय रक्कम:' : 'Grand Total:'}
                  </span>
                  <span className="text-2xl font-black text-[#1B5E20]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Place Order Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#1B5E20] hover:from-emerald-700 hover:to-[#154a19] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{language === 'mr' ? 'ऑर्डर नोंदवली जात आहे...' : 'Placing Order...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>
                      {paymentMethod === 'cod'
                        ? (language === 'mr' ? 'कॅश ऑन डिलिव्हरी ऑर्डर नोंदवा' : 'Confirm Cash on Delivery Order')
                        : (language === 'mr' ? 'ऑर्डर नोंदवा व पेमेंट करा' : 'Place Order & Pay')}
                    </span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'mr' ? '१००% अस्सल खते • सुरक्षित डिलिव्हरी' : '100% Genuine FCO • Safe Farm Delivery'}</span>
                </div>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
