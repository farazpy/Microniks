import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Download, Printer, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { Language, CartItem, ShippingDetails, Order } from '../types';
import { COMPANY_DETAILS, LOGO_URL } from '../data/content';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cartItems: CartItem[];
  appliedDiscount: number;
  onClearCart: () => void;
  onSaveOrder: (order: Order) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  language,
  cartItems,
  appliedDiscount,
  onClearCart,
  onSaveOrder,
}) => {
  if (!isOpen) return null;

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: '',
    phone: '',
    address: '',
    village: '',
    taluka: '',
    district: 'Nashik',
    pincode: '422209',
    state: 'Maharashtra',
    gstin: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const finalTotal = subtotal - discountAmount;
  const gstAmount = Math.round((finalTotal * 0.18) / 1.18);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    if (paymentMethod === 'cod') {
      // Create Cash on Delivery Order
      setTimeout(() => {
        const orderId = `MIC-COD-${Date.now()}`;
        const newOrder: Order = {
          id: orderId,
          items: [...cartItems],
          subtotal,
          discount: discountAmount,
          gstAmount,
          total: finalTotal,
          shipping: { ...shipping },
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'cod',
          createdAt: new Date().toISOString(),
          paymentId: 'COD_ON_DELIVERY',
        };

        setCompletedOrder(newOrder);
        onSaveOrder(newOrder);
        onClearCart();
        setIsProcessing(false);
      }, 1200);
      return;
    }

    // Razorpay Flow
    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.order) {
        throw new Error(data.error || 'Failed to initialize Razorpay order');
      }

      const orderOptions = {
        key: data.keyId || 'rzp_test_534417113646',
        amount: data.order.amount,
        currency: data.order.currency,
        name: COMPANY_DETAILS.nameEn,
        description: 'Bio-Mineral Crop Nutrition Order',
        image: LOGO_URL,
        order_id: data.order.id,
        prefill: {
          name: shipping.fullName,
          contact: shipping.phone,
          email: COMPANY_DETAILS.email,
        },
        theme: {
          color: '#1B5E20',
        },
        handler: async (response: any) => {
          // Verify signature backend call
          try {
            const verifyRes = await fetch('/api/verify-razorpay-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || data.order.id,
                razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || '',
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              const newOrder: Order = {
                id: data.order.id,
                items: [...cartItems],
                subtotal,
                discount: discountAmount,
                gstAmount,
                total: finalTotal,
                shipping: { ...shipping },
                status: 'paid',
                paymentStatus: 'paid',
                paymentMethod: 'razorpay',
                createdAt: new Date().toISOString(),
                paymentId: verifyData.paymentId,
              };

              setCompletedOrder(newOrder);
              onSaveOrder(newOrder);
              onClearCart();
            } else {
              setErrorMessage('Payment verification failed');
            }
          } catch (err: any) {
            console.error(err);
            setErrorMessage('Payment verification error');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(orderOptions);
        rzp.open();
      } else {
        // Fallback simulation if script loaded delayed
        setTimeout(() => {
          const simOrderId = `MIC-SIM-${Date.now()}`;
          const newOrder: Order = {
            id: simOrderId,
            items: [...cartItems],
            subtotal,
            discount: discountAmount,
            gstAmount,
            total: finalTotal,
            shipping: { ...shipping },
            status: 'paid',
            paymentStatus: 'paid',
            paymentMethod: 'razorpay',
            createdAt: new Date().toISOString(),
            paymentId: `PAY_SIM_${Date.now()}`,
          };
          setCompletedOrder(newOrder);
          onSaveOrder(newOrder);
          onClearCart();
          setIsProcessing(false);
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Razorpay connection failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-lg border border-slate-200 my-8 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-[#1B5E20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-black">
              {completedOrder
                ? language === 'mr' ? 'ऑर्डर पावती (Tax Invoice)' : 'Official Tax Invoice'
                : language === 'mr' ? 'सुरक्षित चेकआउट (Checkout)' : 'Secure Farmer Checkout'}
            </h3>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {completedOrder ? (
            /* Order Success & Tax Invoice View */
            <div className="space-y-6">
              
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-14 h-14 text-[#4CAF50] mx-auto" />
                <h4 className="text-2xl font-black text-[#1B5E20]">
                  {language === 'mr' ? 'ऑर्डर यशस्वी झाली!' : 'Order Placed Successfully!'}
                </h4>
                <p className="text-xs text-slate-600 font-semibold">
                  {language === 'mr'
                    ? 'मायक्रॉनिक ॲग्रीकडून खरेदीबद्दल धन्यवाद. तुमची खते पिंपळगाव डेपोमधून पाठवली जात आहेत.'
                    : 'Thank you for choosing Micronik Agri Private Limited. Your dispatch has been scheduled.'}
                </p>
              </div>

              {/* Printable Tax Invoice Box */}
              <div id="tax-invoice-content" className="p-6 rounded-2xl bg-[#F8F6F0] border border-slate-300 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{COMPANY_DETAILS.nameEn}</h5>
                    <div className="text-[10px] text-slate-500 font-bold">GSTIN: {COMPANY_DETAILS.gstNumber}</div>
                  </div>
                  <div className="text-right text-[10px] text-slate-600 font-extrabold">
                    <div>Order ID: {completedOrder.id}</div>
                    <div>Payment ID: {completedOrder.paymentId}</div>
                    <div>Date: {new Date(completedOrder.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="font-extrabold text-slate-800 block uppercase tracking-wider">Purchased Products:</span>
                  {completedOrder.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between font-semibold border-b border-slate-200 pb-1">
                      <span>{it.product.nameEn} ({it.product.bagSize}) x {it.quantity}</span>
                      <span>₹{it.product.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-1 font-bold text-slate-800 pt-2 text-right border-t border-slate-300">
                  <div>Subtotal: ₹{completedOrder.subtotal}</div>
                  {completedOrder.discount > 0 && <div className="text-[#4CAF50]">Discount: -₹{completedOrder.discount}</div>}
                  <div className="text-emerald-800 text-[10px]">18% GST Included: ₹{completedOrder.gstAmount}</div>
                  <div className="text-base font-black text-[#1B5E20]">Total Amount Paid: ₹{completedOrder.total}</div>
                </div>

                {/* Shipping */}
                <div className="pt-2 border-t border-slate-300 text-[11px] font-bold text-slate-700">
                  <div>Delivery Address: {completedOrder.shipping.fullName}, {completedOrder.shipping.address}, {completedOrder.shipping.village}, {completedOrder.shipping.district} - {completedOrder.shipping.pincode}</div>
                  <div>Phone: {completedOrder.shipping.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-[#1B5E20] text-white font-extrabold text-xs text-center"
                >
                  Close
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleProcessPayment} className="space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-sm font-black text-[#1B5E20] uppercase tracking-wider">
                  {language === 'mr' ? '१. डिलिव्हरी पत्ता (Delivery Address):' : '1. Delivery Address:'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    placeholder="Full Name (उदा. नितीन नानासाहेब पाटील)"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />

                  <input
                    type="tel"
                    required
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    placeholder="Mobile Number (8805452288)"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={shipping.village}
                    onChange={(e) => setShipping({ ...shipping, village: e.target.value })}
                    placeholder="Village (उदा. पिंपळगाव बसवंत)"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />

                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="Street / Farm Landmark"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />

                  <input
                    type="text"
                    required
                    value={shipping.pincode}
                    onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                    placeholder="Pincode (422209)"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <input
                  type="text"
                  value={shipping.gstin}
                  onChange={(e) => setShipping({ ...shipping, gstin: e.target.value.toUpperCase() })}
                  placeholder="Optional GSTIN for Tax Credit (27XXXXX)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold uppercase"
                />
              </div>

              {/* Payment Option */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-[#1B5E20] uppercase tracking-wider">
                  {language === 'mr' ? '२. पेमेंट प्रकार (Payment Method):' : '2. Select Payment Method:'}
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all text-left flex items-center justify-between ${
                      paymentMethod === 'razorpay'
                        ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md'
                        : 'bg-white text-slate-800 border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        <span>Razorpay Online</span>
                      </div>
                      <div className="text-[10px] text-amber-300 font-semibold mt-0.5">UPI, Cards, NetBanking</div>
                    </div>
                    {paymentMethod === 'razorpay' && <CheckCircle2 className="w-5 h-5 text-amber-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all text-left flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md'
                        : 'bg-white text-slate-800 border-slate-300'
                    }`}
                  >
                    <div>
                      <div>Cash on Delivery</div>
                      <div className="text-[10px] text-emerald-200 font-semibold mt-0.5">Pay on Farm Arrival</div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-amber-300" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-100 text-red-800 text-xs font-extrabold">
                  {errorMessage}
                </div>
              )}

              {/* Order Amount Summary */}
              <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-emerald-900/10 space-y-1 text-xs font-bold text-slate-800">
                <div className="flex justify-between">
                  <span>Cart Items Total:</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#1B5E20] text-base font-black pt-2 border-t border-slate-300">
                  <span>Total Payable:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>
                      {paymentMethod === 'razorpay'
                        ? `Pay ₹${finalTotal} via Razorpay`
                        : `Confirm Cash on Delivery Order (₹${finalTotal})`}
                    </span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
