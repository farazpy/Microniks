import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { ShopSection } from './components/ShopSection';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { AccountPage } from './components/AccountPage';
import { AuthModal } from './components/AuthModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CropSchedulesPage } from './components/CropSchedulesPage';
import { DealersPage } from './components/DealersPage';
import { BlogPage } from './components/BlogPage';
import { InstagramPreview } from './components/InstagramPreview';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import { Language, Product, CartItem, Order } from './types';
import { PRODUCTS_DATA } from './data/content';
import { CheckCircle2, Heart, X, Sparkles } from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activePage, setActivePage] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Active product for dedicated page
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Modals & Panels
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Search & Coupons
  const [searchQuery, setSearchQuery] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${language === 'mr' ? 'कार्टमध्ये जोडले:' : 'Added to Cart:'} ${language === 'mr' ? product.nameMr : product.nameEn}`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(language === 'mr' ? 'विशलिस्टामधून काढले' : 'Removed from Wishlist');
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(language === 'mr' ? 'विशलिस्टामध्ये जोडले' : 'Added to Wishlist');
      return [...prev, product];
    });
  };

  const handleApplyCoupon = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'FARMER10') {
      setCouponCode('FARMER10');
      setAppliedDiscount(10);
      showToast(language === 'mr' ? '१०% शेतकरी सवलत लागू झाली!' : '10% Farmer Discount Applied!');
    } else if (formatted === 'OCTOBER20') {
      setCouponCode('OCTOBER20');
      setAppliedDiscount(20);
      showToast(language === 'mr' ? '२०% ऑक्टोबर छाटणी ऑफर लागू झाली!' : '20% October Special Offer Applied!');
    } else {
      showToast(language === 'mr' ? 'अवैध कूपन कोड. FARMER10 वापरून पहा' : 'Invalid Coupon Code. Try FARMER10');
    }
  };

  // Synchronize route and product from URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      if (!rawHash || rawHash === 'home') {
        setActivePage('home');
      } else if (rawHash.startsWith('product/')) {
        const prodId = rawHash.replace('product/', '');
        const matched = products.find((p) => p.id === prodId);
        if (matched) {
          setSelectedProduct(matched);
          setActivePage('product');
        } else {
          setActivePage('shop');
        }
      } else {
        setActivePage(rawHash);
      }
    };

    // Initialize on first mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.location.hash = `/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.location.hash = `/product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    setLastPlacedOrder(order);
    setOrders((prev) => [order, ...prev]);
    setActivePage('order-success');
    window.location.hash = '/order-success';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/30 text-slate-900 font-sans antialiased selection:bg-[#1B5E20] selection:text-white pb-20 md:pb-0 relative overflow-x-hidden">
      
      {/* Background Ambient Glass Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 glass-dark-panel text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/50 font-extrabold text-xs flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Glassmorphic Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        cartItems={cartItems}
        wishlist={wishlist}
        onOpenCart={() => handleNavigate('cart')}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        activePage={activePage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Route View */}
      <main className="min-h-[75vh]">
        {/* Route 1: Home Page */}
        {activePage === 'home' && (
          <>
            <Hero language={language} onNavigate={handleNavigate} />
            <ShopSection
              language={language}
              products={products}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <AboutSection language={language} />
            <InstagramPreview language={language} />
            <ContactSection language={language} />
          </>
        )}

        {/* Route 2: Dedicated Shop Catalog */}
        {activePage === 'shop' && (
          <ShopSection
            language={language}
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Route 3: Dedicated Standalone Product Page */}
        {activePage === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            allProducts={products}
            language={language}
            onBack={() => handleNavigate('shop')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            isWishlisted={wishlist.some((p) => p.id === selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Route 4: Dedicated Full-Page Cart */}
        {activePage === 'cart' && (
          <CartPage
            language={language}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={handleNavigate}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedDiscount={appliedDiscount}
            onApplyCoupon={handleApplyCoupon}
          />
        )}

        {/* Route 5: Dedicated Full-Page Checkout */}
        {activePage === 'checkout' && (
          <CheckoutPage
            language={language}
            cartItems={cartItems}
            appliedDiscount={appliedDiscount}
            couponCode={couponCode}
            onClearCart={() => setCartItems([])}
            onNavigate={handleNavigate}
            onOrderSuccess={handleOrderSuccess}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* Route 6: Order Confirmation & Live Tracking */}
        {activePage === 'order-success' && lastPlacedOrder && (
          <OrderSuccessPage
            order={lastPlacedOrder}
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {/* Route 7: Farmer Account & Orders from Firestore */}
        {activePage === 'account' && (
          <AccountPage
            language={language}
            onNavigate={handleNavigate}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* Route 8: Crop Nutrition & Dosage Schedules */}
        {activePage === 'schedules' && (
          <CropSchedulesPage
            language={language}
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* Route 9: Authorized Dealers & Franchise Portal */}
        {activePage === 'dealers' && (
          <DealersPage
            language={language}
          />
        )}

        {/* Route 10: Agricultural Knowledge & Farming Guides Blog */}
        {activePage === 'blog' && (
          <BlogPage
            language={language}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            products={products}
          />
        )}

        {/* Route 11: About Us */}
        {activePage === 'about' && <AboutSection language={language} />}

        {/* Route 12: Contact */}
        {activePage === 'contact' && <ContactSection language={language} />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        language={language}
        activePage={activePage}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        wishlist={wishlist}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Always-on Floating WhatsApp Crop Advisor */}
      <FloatingWhatsApp language={language} />

      {/* Footer */}
      <Footer language={language} onNavigate={handleNavigate} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Google Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        onSuccess={() => {
          showToast(language === 'mr' ? 'गुगल लॉगिन यशस्वी!' : 'Signed in with Google!');
        }}
      />

      {/* Wishlist Side Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 border-l border-white/90">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <Heart className="w-5 h-5 text-red-600 fill-current" />
                <span>{language === 'mr' ? 'माझी विशलिस्ट' : 'My Saved Products'} ({wishlist.length})</span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center text-slate-400 font-bold text-xs space-y-2">
                  <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>{language === 'mr' ? 'विशलिस्ट रिकामी आहे.' : 'No saved products in wishlist.'}</p>
                </div>
              ) : (
                wishlist.map((prod) => (
                  <div key={prod.id} className="p-3.5 rounded-2xl glass-card border border-white flex items-center justify-between gap-3 text-xs">
                    <img
                      src={prod.image}
                      alt=""
                      className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-slate-900 truncate">{language === 'mr' ? prod.nameMr : prod.nameEn}</div>
                      <div className="font-black text-[#1B5E20]">₹{prod.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(prod, 1);
                        setIsWishlistOpen(false);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-extrabold text-[11px] shadow-sm cursor-pointer"
                    >
                      {language === 'mr' ? 'कार्ट' : 'Add'}
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs cursor-pointer"
            >
              {language === 'mr' ? 'बंद करा' : 'Close Wishlist'}
            </button>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={(prod) => setProducts((prev) => [prod, ...prev])}
        onUpdateProduct={(prod) => setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)))}
        onDeleteProduct={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
        orders={orders}
        onUpdateOrderStatus={(orderId, status) =>
          setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
        }
      />

    </div>
  );
}

export default App;
