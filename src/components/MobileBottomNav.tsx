import React, { useState, useEffect } from 'react';
import { Home, Store, ShoppingBag, Heart, User as UserIcon } from 'lucide-react';
import { Language, CartItem, Product } from '../types';
import { auth } from '../lib/firebase';

interface MobileBottomNavProps {
  language: Language;
  activePage: string;
  onNavigate: (page: string) => void;
  cartItems: CartItem[];
  wishlist: Product[];
  onOpenWishlist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  activePage,
  onNavigate,
  cartItems,
  wishlist,
  onOpenWishlist,
}) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/80 px-3 py-2 shadow-2xl flex items-center justify-around">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all cursor-pointer ${
          activePage === 'home' ? 'text-[#1B5E20] font-black scale-105' : 'text-slate-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>{language === 'mr' ? 'होम' : 'Home'}</span>
      </button>

      <button
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all cursor-pointer ${
          activePage === 'shop' || activePage.startsWith('product-') ? 'text-[#1B5E20] font-black scale-105' : 'text-slate-500'
        }`}
      >
        <Store className="w-5 h-5" />
        <span>{language === 'mr' ? 'दुकान' : 'Shop'}</span>
      </button>

      {/* Cart Center Highlight */}
      <button
        onClick={() => onNavigate('cart')}
        className="relative flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer"
      >
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md -mt-4 border-2 border-white transition-transform ${
          activePage === 'cart' ? 'bg-amber-400 text-slate-950 scale-110' : 'bg-[#1B5E20] text-white'
        }`}>
          <ShoppingBag className="w-5 h-5" />
        </div>
        <span className={`font-extrabold ${activePage === 'cart' ? 'text-[#1B5E20]' : 'text-slate-600'}`}>
          {language === 'mr' ? 'कार्ट' : 'Cart'}
        </span>
        {totalCartCount > 0 && (
          <span className="absolute -top-3 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow">
            {totalCartCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 cursor-pointer"
      >
        <Heart className="w-5 h-5" />
        <span>{language === 'mr' ? 'विशलिस्ट' : 'Wishlist'}</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-extrabold flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      <button
        onClick={() => onNavigate('account')}
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all cursor-pointer ${
          activePage === 'account' ? 'text-[#1B5E20] font-black scale-105' : 'text-slate-500'
        }`}
      >
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt=""
            className="w-5 h-5 rounded-full object-cover border border-emerald-600"
            referrerPolicy="no-referrer"
          />
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
        <span>{language === 'mr' ? 'खाते' : 'Account'}</span>
      </button>
    </div>
  );
};
