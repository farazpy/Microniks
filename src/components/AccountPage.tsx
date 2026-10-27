import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User as UserIcon,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Sparkles,
  ShoppingBag,
  Loader2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Language, Order } from '../types';
import { auth, logOut, fetchUserOrders } from '../lib/firebase';

interface AccountPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onOpenAuthModal: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  language,
  onNavigate,
  onOpenAuthModal,
}) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        setLoadingOrders(true);
        try {
          const userOrders = await fetchUserOrders(user.uid);
          setOrders(userOrders);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingOrders(false);
        }
      } else {
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      onNavigate('home');
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full rounded-3xl glass-panel p-8 sm:p-10 text-center space-y-6 shadow-2xl border border-white/80">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center border border-emerald-300">
            <UserIcon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'mr' ? 'माझे खाते (My Account)' : 'Farmer Account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'mr'
                ? 'तुमच्या सर्व खत ऑर्डर्स, ट्रॅकिंग आणि पत्ते पाहण्यासाठी कृपया गुगल सह साइन इन करा.'
                : 'Sign in with your Google account to track past orders, manage farm addresses, and view invoices.'}
            </p>
          </div>
          <button
            onClick={onOpenAuthModal}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base border border-slate-300 shadow-md flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <span>{language === 'mr' ? 'Google सह लॉगिन करा' : 'Sign In with Google'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Glass Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || ''}
                className="w-16 h-16 rounded-full border-2 border-[#1B5E20] shadow-md object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-black text-2xl shadow-md">
                {(currentUser.displayName || currentUser.email || 'F')[0].toUpperCase()}
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser.displayName || 'Farmer Member'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {currentUser.email}
              </p>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B5E20] text-[11px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Google Account</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="px-5 py-2.5 rounded-xl bg-[#1B5E20] text-white font-extrabold text-xs shadow-md hover:bg-emerald-800 transition-all cursor-pointer"
            >
              {language === 'mr' ? 'खरेदी करा' : 'Shop Products'}
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'बाहेर पडा' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-[#1B5E20]" />
              <span>{language === 'mr' ? 'माझ्या ऑर्डर्स (My Orders)' : 'Order History'}</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">
              {orders.length} {language === 'mr' ? 'नोंदवलेल्या ऑर्डर्स' : 'orders placed'}
            </span>
          </div>

          {loadingOrders ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#1B5E20]" />
              <span className="text-xs font-bold">Loading your order history from Firestore...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl glass-card p-10 text-center space-y-4 border border-white/80">
              <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800">
                  {language === 'mr' ? 'कोणतीही जुनी ऑर्डर नाही' : 'No Past Orders Found'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {language === 'mr'
                    ? 'तुम्ही अद्याप कोणतीही ऑर्डर दिलेली नाही. आमच्या उत्पादनांची माहिती घ्या व ऑर्डर करा.'
                    : 'You have not placed any orders with this Google account yet.'}
                </p>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-2.5 rounded-xl bg-[#1B5E20] text-white font-extrabold text-xs shadow-md"
              >
                {language === 'mr' ? 'आताच खरेदी करा' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-3xl glass-panel p-6 border border-white/90 shadow-md space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 text-xs">
                    <div>
                      <span className="font-mono font-extrabold text-slate-900 text-sm block">
                        Order #{ord.orderNumber || ord.id}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Placed on {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1B5E20] font-black text-xs uppercase">
                        {ord.status || 'Confirmed'}
                      </span>
                      <span className="text-base font-black text-slate-900">
                        ₹{ord.total}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product.image}
                            alt=""
                            className="w-10 h-10 rounded-lg bg-white p-1 border border-slate-200 object-contain"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {language === 'mr' ? it.product.nameMr : it.product.nameEn}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              Qty: {it.quantity} • {it.selectedVariant ? it.selectedVariant.packing : it.product.bagSize}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-800">
                          ₹{(it.selectedVariant ? it.selectedVariant.price : it.product.price) * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location snapshot */}
                  <div className="text-[11px] text-slate-600 bg-slate-50/80 p-3 rounded-xl flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      Shipping to: {ord.shipping?.fullName}, {ord.shipping?.village ? `${ord.shipping.village}, ` : ''}{ord.shipping?.district} - {ord.shipping?.pincode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
