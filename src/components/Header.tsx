import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Phone, Menu, X, Shield, Globe, User as UserIcon, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { Language, CartItem, Product } from '../types';
import { COMPANY_DETAILS } from '../data/content';
import { auth } from '../lib/firebase';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartItems: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
  activePage: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  cartItems,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onNavigate,
  onOpenAuth,
  activePage,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
    { id: 'shop', labelMr: 'दुकान (Shop)', labelEn: 'Shop Products' },
    { id: 'schedules', labelMr: 'पीक वेळापत्रक (Schedules)', labelEn: 'Crop Schedules' },
    { id: 'dealers', labelMr: 'डीलर नेटवर्क (Dealers)', labelEn: 'Dealers & Franchise' },
    { id: 'blog', labelMr: 'कृषी ज्ञान (Agri Blog)', labelEn: 'Agri Blog' },
    { id: 'about', labelMr: 'आमच्याबद्दल', labelEn: 'About Us' },
    { id: 'contact', labelMr: 'संपर्क (Contact)', labelEn: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm transition-all w-full max-w-full">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#1B5E20] via-emerald-800 to-[#1B5E20] text-white text-[11px] font-semibold py-1.5 px-3 sm:px-4 text-center flex items-center justify-between gap-2 overflow-hidden w-full max-w-full">
        <div className="hidden sm:flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
              Farmer Helpline
            </span>
            <span>{COMPANY_DETAILS.secondaryLineEn}</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <span className="bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider">
              v1.0.1
            </span>
            <a href={`tel:${COMPANY_DETAILS.phonePrimary}`} className="hover:text-amber-300 font-bold flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-300" />
              <span>{COMPANY_DETAILS.phoneFormatted}</span>
            </a>
            <span>•</span>
            <span className="text-amber-300 font-extrabold">GST: {COMPANY_DETAILS.gstNumber}</span>
          </div>
        </div>

        {/* Mobile notice */}
        <div className="sm:hidden w-full flex items-center justify-between text-[10px] xs:text-[11px] font-bold">
          <div className="flex items-center gap-1.5 truncate mr-2">
            <span className="bg-emerald-950/70 border border-emerald-400/30 text-emerald-200 text-[9px] font-extrabold px-1.5 py-0.2 rounded tracking-wider">
              v1.0.1
            </span>
            <span className="text-amber-300 truncate">Helpline: {COMPANY_DETAILS.phonePrimary}</span>
          </div>
          <a href={`tel:${COMPANY_DETAILS.phonePrimary}`} className="underline shrink-0 text-white hover:text-amber-300">Call Now</a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-4 w-full overflow-hidden">
        
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left focus:outline-none focus:ring-2 focus:ring-[#1B5E20] rounded-xl p-0.5 sm:p-1 shrink-0 cursor-pointer"
        >
          <Logo size="md" showTagline={false} />
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'mr' ? 'खत, बोरोमिक्स, सिल्कफर्ट किंवा पीक शोधा...' : 'Search fertilizers, Silkfert, Boromix, crops...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-emerald-200/80 bg-white/70 backdrop-blur-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E20] text-xs font-semibold text-slate-800 transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation & Action Icons */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 shrink-0">
          
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
            className="flex items-center gap-1 px-2 py-1.5 xs:px-2.5 xs:py-2 rounded-xl glass-card hover:bg-white text-slate-800 text-[11px] xs:text-xs font-bold transition-colors shrink-0 cursor-pointer"
            title="Toggle Language / भाषा बदला"
          >
            <Globe className="w-3.5 h-3.5 text-[#1B5E20] shrink-0" />
            <span>{language === 'mr' ? 'ENG' : 'मराठी'}</span>
          </button>

          {/* User Auth Profile / Login Button */}
          {currentUser ? (
            <button
              onClick={() => onNavigate('account')}
              className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                activePage === 'account'
                  ? 'bg-emerald-100 border-emerald-400 text-[#1B5E20]'
                  : 'glass-card hover:bg-white border-slate-200 text-slate-800'
              }`}
              title="My Account"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt=""
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-emerald-600"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="hidden lg:inline text-xs font-black truncate max-w-[100px]">
                {currentUser.displayName?.split(' ')[0] || 'Account'}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-extrabold shadow-sm transition-all shrink-0 cursor-pointer"
              title={language === 'mr' ? 'लॉगिन' : 'Sign In'}
            >
              <UserIcon className="w-3.5 h-3.5 text-[#1B5E20]" />
              <span className="hidden sm:inline">{language === 'mr' ? 'लॉगिन' : 'Sign In'}</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1.5 sm:p-2 rounded-xl glass-card hover:bg-white text-slate-700 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-600 text-white text-[9px] sm:text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate('cart')}
            className={`relative flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shrink-0 cursor-pointer ${
              activePage === 'cart'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-[#1B5E20] hover:bg-[#144718] text-white font-extrabold shadow-md'
            }`}
            title={language === 'mr' ? 'कार्ट' : 'Cart'}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{language === 'mr' ? 'कार्ट' : 'Cart'}</span>
            <span className={`hidden sm:flex w-5 h-5 rounded-full text-[11px] font-black items-center justify-center ${
              activePage === 'cart' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400 text-slate-950'
            }`}>
              {totalCartCount}
            </span>
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex p-2 rounded-xl glass-card hover:bg-white text-slate-500 hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
            title="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl glass-card text-slate-700 hover:bg-white shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Links Bar - Cleanly Centered */}
      <nav className="hidden md:block bg-white/75 backdrop-blur-md border-t border-b border-emerald-900/10 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-emerald-950/5 border border-emerald-900/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-xs font-black transition-all py-1.5 px-4 sm:px-5 rounded-xl whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1B5E20] text-white shadow-md scale-[1.02]'
                      : 'text-slate-700 hover:text-[#1B5E20] hover:bg-white/80'
                  }`}
                >
                  <span>{language === 'mr' ? link.labelMr : link.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-300">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'खते शोधा...' : 'Search products...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white/90 text-xs font-semibold"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-left font-bold text-xs transition-colors cursor-pointer ${
                  activePage === link.id
                    ? 'bg-[#1B5E20] text-white'
                    : 'bg-white/80 text-slate-800 hover:bg-white'
                }`}
              >
                {language === 'mr' ? link.labelMr : link.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-600 flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#1B5E20]" />
              <span>Admin Panel</span>
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phonePrimary}`}
              className="text-xs font-bold text-[#1B5E20] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_DETAILS.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
