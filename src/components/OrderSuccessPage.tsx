import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { Language, Order } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface OrderSuccessPageProps {
  order: Order;
  language: Language;
  onNavigate: (page: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  language,
  onNavigate,
}) => {
  useEffect(() => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const whatsappMessage = encodeURIComponent(
    `नमस्कार मायक्रॉनिक ॲग्री! माझी नवीन ऑर्डर यशस्वीरीत्या नोंदवली गेली आहे.\nऑर्डर नंबर: ${order.orderNumber || order.id}\nरक्कम: ₹${order.total}\nनाव: ${order.shipping.fullName}\nफोन: ${order.shipping.phone}\nपत्ता: ${order.shipping.address}, ${order.shipping.district} - ${order.shipping.pincode}`
  );
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Main Success Hero Card */}
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/90 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center border-2 border-emerald-300 shadow-lg animate-bounce duration-1000">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#1B5E20] font-black text-xs uppercase tracking-wider border border-emerald-300">
              {language === 'mr' ? 'ऑर्डर यशस्वीरीत्या नोंदवली!' : 'Order Confirmed!'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === 'mr' ? 'मायक्रॉनिक ॲग्री निवडल्याबद्दल धन्यवाद!' : 'Thank You for Your Order!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
              {language === 'mr'
                ? `तुमची ऑर्डर क्रमांक ${order.orderNumber || order.id} नोंदवली गेली असून आमच्या पिंपळगाव बसवंत फॅक्टरीतून पॅकिंग सुरू झाले आहे.`
                : `Order #${order.orderNumber || order.id} is confirmed and is being prepped at our Pimpalgaon Baswant facility.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-900/15 flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{language === 'mr' ? 'व्हॉट्सॲपवर ऑर्डर तपशील मिळवा' : 'Receive Updates on WhatsApp'}</span>
            </a>

            <button
              onClick={() => onNavigate('account')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{language === 'mr' ? 'माझ्या खात्यात ट्रॅक करा' : 'Track in My Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tracking Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/80 shadow-lg space-y-6">
          <h2 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
            {language === 'mr' ? 'डिलिव्हरी प्रगती (Delivery Status)' : 'Live Fulfillment Timeline'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
              <div className="flex items-center gap-2 text-[#1B5E20] font-black text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Step 1</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'ऑर्डर नोंदवली' : 'Order Placed'}
              </div>
              <div className="text-[11px] text-slate-500">Just Now</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-black text-xs">
                <Package className="w-4 h-4" />
                <span>Step 2</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'फॅक्टरी पॅकिंग' : 'Factory Packing'}
              </div>
              <div className="text-[11px] text-slate-500">Pimpalgaon Baswant</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 opacity-70">
              <div className="flex items-center gap-2 text-slate-600 font-black text-xs">
                <Truck className="w-4 h-4" />
                <span>Step 3</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'रवाना (Dispatched)' : 'In Transit'}
              </div>
              <div className="text-[11px] text-slate-500">Exp. 24-48 Hours</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 opacity-70">
              <div className="flex items-center gap-2 text-slate-600 font-black text-xs">
                <MapPin className="w-4 h-4" />
                <span>Step 4</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">
                {language === 'mr' ? 'शेतावर डिलिव्हरी' : 'Farm Delivery'}
              </div>
              <div className="text-[11px] text-slate-500">{order.shipping.district}</div>
            </div>

          </div>
        </div>

        {/* Itemized Invoice Summary */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/90 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900">
                {language === 'mr' ? 'ऑर्डर पावती व इनव्हॉइस' : 'Invoice & Itemized Receipt'}
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Order ID: {order.orderNumber || order.id} • Date: {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'mr' ? 'पावती प्रिंट करा' : 'Print Invoice'}</span>
            </button>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-slate-900 block">
                    {language === 'mr' ? item.product.nameMr : item.product.nameEn}
                  </span>
                  <span className="text-slate-500 text-xs">
                    Pack: {item.selectedVariant ? item.selectedVariant.packing : item.product.bagSize} × {item.quantity}
                  </span>
                </div>
                <span className="font-black text-slate-900">
                  ₹{(item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="bg-slate-50/80 p-4 rounded-2xl space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount Applied:</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges:</span>
              <span className="font-bold text-emerald-700">FREE</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <span className="font-bold uppercase text-slate-900">{order.paymentMethod}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
              <span className="font-black text-sm text-slate-900">Total Amount Paid / Payable:</span>
              <span className="text-xl font-black text-[#1B5E20]">₹{order.total}</span>
            </div>
          </div>

          {/* Shipping Recipient Info */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
            <div className="font-extrabold text-slate-900">
              {language === 'mr' ? 'डिलिव्हरी पत्ता:' : 'Shipping Address:'}
            </div>
            <div className="text-slate-700 font-medium">
              {order.shipping.fullName} • {order.shipping.phone}
            </div>
            <div className="text-slate-600">
              {order.shipping.address}, {order.shipping.village ? `${order.shipping.village}, ` : ''}{order.shipping.district} - {order.shipping.pincode}, Maharashtra
            </div>
          </div>

          {/* Continue Shopping Button */}
          <button
            onClick={() => onNavigate('shop')}
            className="w-full py-3.5 rounded-2xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer text-center block"
          >
            {language === 'mr' ? 'खरेदी सुरू ठेवा (Continue Shopping)' : 'Continue Shopping'}
          </button>
        </div>

      </div>
    </div>
  );
};
