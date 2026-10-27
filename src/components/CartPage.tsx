import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { Language, CartItem } from '../types';

interface CartPageProps {
  language: Language;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: string) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedDiscount: number;
  onApplyCoupon: (code: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  language,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  couponCode,
  setCouponCode,
  appliedDiscount,
  onApplyCoupon,
}) => {
  const FREE_SHIPPING_THRESHOLD = 999;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const deliveryCharge = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 70;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST on agriculture inputs
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full rounded-3xl glass-panel p-8 sm:p-10 text-center space-y-6 shadow-xl border border-white/80">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100/80 text-[#1B5E20] flex items-center justify-center border border-emerald-300">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'mr' ? 'तुमची कार्ट रिकामी आहे' : 'Your Shopping Cart is Empty'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'mr'
                ? 'तुमच्या पिकांच्या निरोगी वाढीसाठी व अधिक उत्पादनासाठी उच्च दर्जाची सूक्ष्म अन्नद्रव्ये व खते निवडा.'
                : 'Browse our catalog of certified micronutrients and specialized fertilizers to boost your crop yield.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#1B5E20] text-white font-extrabold text-sm shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'mr' ? 'खते खरेदी करा (Shop Now)' : 'Explore Products & Shop'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('shop')}
                className="text-xs font-bold text-slate-500 hover:text-[#1B5E20] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'खरेदी सुरू ठेवा' : 'Continue Shopping'}</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>{language === 'mr' ? 'माझी खरेदी कार्ट' : 'Shopping Cart'}</span>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {language === 'mr' ? 'आयटम्स' : 'items'}
              </span>
            </h1>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
          >
            <span>{language === 'mr' ? 'ऑर्डर पूर्ण करा' : 'Proceed to Checkout'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2 text-[#1B5E20]">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {amountNeededForFreeShipping === 0
                  ? (language === 'mr' ? 'अभिनंदन! या ऑर्डरवर मोफत डिलिव्हरी लागू झाली आहे 🎉' : 'Congratulations! You unlocked FREE Delivery across Maharashtra! 🎉')
                  : (language === 'mr' ? `मोफत डिलिव्हरीसाठी अजून ₹${amountNeededForFreeShipping} ची खरेदी करा` : `Add ₹${amountNeededForFreeShipping} more to get FREE Delivery`)}
              </span>
            </div>
            <span className="font-extrabold text-[#1B5E20]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#1B5E20] rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Grid: Left Items + Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => {
              const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
              const unitMrp = item.selectedVariant ? item.selectedVariant.mrp : item.product.mrp;
              const itemTotal = unitPrice * item.quantity;
              const bagSize = item.selectedVariant ? item.selectedVariant.packing : item.product.bagSize;

              return (
                <motion.div
                  key={item.product.id}
                  layout
                  className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-xl bg-white p-2 border border-slate-200/80 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.nameEn}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.product.category}
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {language === 'mr' ? item.product.nameMr : item.product.nameEn}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {language === 'mr' ? 'पॅकिंग:' : 'Pack Size:'} <span className="font-bold text-slate-700">{bagSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-extrabold text-[#1B5E20]">₹{unitPrice}</span>
                        {unitMrp > unitPrice && (
                          <span className="text-slate-400 line-through">₹{unitMrp}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    
                    {/* Quantity counter */}
                    <div className="flex items-center rounded-xl border border-slate-300 bg-white p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-all cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center font-black text-xs text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[70px]">
                      <div className="text-base font-black text-slate-900">
                        ₹{itemTotal}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        (₹{unitPrice} × {item.quantity})
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Coupons & Promo Codes */}
            <div className="p-5 rounded-2xl glass-card border border-white/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>{language === 'mr' ? 'कूपन कोड व सवलत (Apply Coupon):' : 'Apply Discount Coupon:'}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon (e.g. FARMER10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  onClick={() => onApplyCoupon(couponCode)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all cursor-pointer"
                >
                  {language === 'mr' ? 'लागू करा' : 'Apply'}
                </button>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-100 text-[#1B5E20] text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {appliedDiscount}% {language === 'mr' ? 'सवलत यशस्वीरीत्या लागू झाली!' : 'Coupon Applied Successfully!'}
                  </span>
                </div>
              )}

              {/* Quick coupons pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="text-slate-500 font-medium">Available:</span>
                <button
                  onClick={() => onApplyCoupon('FARMER10')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1B5E20] border border-emerald-200 font-mono font-bold cursor-pointer"
                >
                  FARMER10 (10% Off)
                </button>
                <button
                  onClick={() => onApplyCoupon('OCTOBER20')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-mono font-bold cursor-pointer"
                >
                  OCTOBER20 (20% Off)
                </button>
              </div>
            </div>

            {/* Trust and Guarantee Footnote */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-bold">{language === 'mr' ? '१००% अस्सल लॅब टेस्टेड खत' : '100% Genuine Certified'}</span>
              </div>
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2 text-xs">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-700 font-bold">{language === 'mr' ? 'कॅश ऑन डिलिव्हरी उपलब्ध' : 'Pay on Delivery (COD)'}</span>
              </div>
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2 text-xs">
                <Percent className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-slate-700 font-bold">{language === 'mr' ? 'थेट फॅक्टरी होलसेल दर' : 'Factory Direct Rates'}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl glass-panel p-6 border border-white/90 shadow-xl space-y-5 sticky top-24">
              
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-200/80 pb-3">
                {language === 'mr' ? 'ऑर्डर सारांश (Order Summary)' : 'Order Summary'}
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>{language === 'mr' ? 'उपएकूण (Subtotal):' : 'Item Subtotal:'}</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{language === 'mr' ? `सवलत (${appliedDiscount}% Off):` : `Discount (${appliedDiscount}%):`}</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>{language === 'mr' ? 'डिलिव्हरी शुल्क (Shipping):' : 'Delivery Charges:'}</span>
                  <span className="font-bold text-slate-900">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 uppercase font-black">Free</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 text-xs">
                  <span>{language === 'mr' ? 'जीएसटी (५% समाविष्ट):' : 'Estimated GST (5% included):'}</span>
                  <span>₹{gstAmount}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-black text-slate-900 block">
                      {language === 'mr' ? 'एकूण रक्कम (Total):' : 'Total Amount:'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {language === 'mr' ? 'सर्व कर समाविष्ट' : 'Inclusive of all taxes'}
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#1B5E20]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-900/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform active:scale-95"
              >
                <span>{language === 'mr' ? 'चेकआऊटकडे पुढे जा' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full py-3 px-4 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs text-center transition-all cursor-pointer"
              >
                {language === 'mr' ? '← आणखी उत्पादने जोडा' : '← Continue Shopping'}
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
