import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { Language, CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedDiscount: number;
  onApplyCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  language,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  setCouponCode,
  appliedDiscount,
  onApplyCoupon,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState(couponCode || '');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const gstAmount = Math.round(((subtotal - discountAmount) * 0.18) / 1.18); // 18% inclusive GST
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-[#1B5E20] to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-black">
              {language === 'mr' ? 'माझे कार्ट (Shopping Cart)' : 'My Cart'}
            </h3>
            <span className="w-5 h-5 rounded-full bg-[#4CAF50] text-white text-[11px] font-black flex items-center justify-center">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Item List Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">
                {language === 'mr' ? 'तुमचे कार्ट रिकामे आहे.' : 'Your cart is empty.'}
              </h4>
              <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto">
                {language === 'mr'
                  ? 'दुकानातून सिल्कफर्ट, बोरोमिक्स किंवा बेसल डोस किट कार्टमध्ये जोडा.'
                  : 'Add Silkfert, Boromix-5F or the 100 KG Basal Kit to start.'}
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-emerald-900/10 flex items-center justify-between gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.nameEn}
                  className="w-16 h-16 object-cover rounded-xl bg-white p-0.5 shrink-0 border border-slate-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-1">
                  <div className="font-extrabold text-xs text-slate-900 line-clamp-1">
                    {language === 'mr' ? item.product.nameMr : item.product.nameEn}
                  </div>
                  <div className="text-[10px] text-emerald-800 font-bold">{item.product.bagSize}</div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-sm text-[#1B5E20]">₹{item.product.price * item.quantity}</div>
                  <div className="text-[10px] text-slate-400 font-semibold line-through">
                    ₹{item.product.mrp * item.quantity}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
            
            {/* Coupon Code Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Coupon: FARMER10"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold uppercase"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                onClick={() => onApplyCoupon(couponInput)}
                className="px-3 py-1.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold"
              >
                Apply
              </button>
            </div>

            {appliedDiscount > 0 && (
              <div className="text-[11px] text-[#4CAF50] font-extrabold flex items-center justify-between">
                <span>Coupon Discount ({appliedDiscount}% OFF):</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1 text-xs border-t border-slate-200 pt-2 font-bold text-slate-700">
              <div className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 text-[11px]">
                <span>GST (18% Included):</span>
                <span>₹{gstAmount}</span>
              </div>
              <div className="flex items-center justify-between text-base font-black text-[#1B5E20] pt-1 border-t border-slate-300">
                <span>Final Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-[#1B5E20] hover:bg-[#144718] text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'mr' ? 'चेकआउट करा (Checkout Now)' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
