import React, { useState } from 'react';
import { X, Shield, Plus, Edit2, Trash2, Package, ShoppingBag, CheckCircle2, RefreshCw } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [newProd, setNewProd] = useState<Partial<Product>>({
    nameMr: '',
    nameEn: '',
    taglineMr: '',
    taglineEn: '',
    category: 'micronutrient',
    price: 990,
    mrp: 1200,
    bagSize: '10 KG Bag',
    stock: 50,
    image: 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498078/IMG-20260522-WA0002_2.jpg',
    shortDescMr: '',
    shortDescEn: '',
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `prod_${Date.now()}`;
    const productToAdd: Product = {
      id,
      nameMr: newProd.nameMr || 'नवीन खत',
      nameEn: newProd.nameEn || 'New Agri Product',
      taglineMr: newProd.taglineMr || 'दर्जेदार पोषण',
      taglineEn: newProd.taglineEn || 'High Quality Micronutrient',
      category: newProd.category as any || 'micronutrient',
      price: Number(newProd.price) || 1000,
      mrp: Number(newProd.mrp) || 1300,
      bagSize: newProd.bagSize || '10 KG Bag',
      stock: Number(newProd.stock) || 50,
      inStock: true,
      rating: 4.9,
      reviewsCount: 1,
      sku: `MIC-NEW-${Math.floor(Math.random() * 900 + 100)}`,
      image: newProd.image || 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498078/IMG-20260522-WA0002_2.jpg',
      gallery: [newProd.image || 'https://res.cloudinary.com/fxqqfzhm/image/upload/v1789498078/IMG-20260522-WA0002_2.jpg'],
      shortDescMr: newProd.shortDescMr || 'सविस्तर माहिती',
      shortDescEn: newProd.shortDescEn || 'Product overview details',
      descriptionMr: newProd.shortDescMr || '',
      descriptionEn: newProd.shortDescEn || '',
      benefitsMr: ['उत्पादनात वाढ', 'मुळांची ताकद'],
      benefitsEn: ['Yield boost', 'Root mass'],
      recommendedCropsMr: ['द्राक्ष', 'टोमॅटो'],
      recommendedCropsEn: ['Grapes', 'Tomato'],
      compositionMr: 'Balanced Minerals',
      compositionEn: 'Balanced Minerals',
      dosageMr: '१० किलो प्रति एकर',
      dosageEn: '10 KG per acre',
    };

    onAddProduct(productToAdd);
    setActiveTab('products');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-lg border border-slate-200 my-8 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black">Micronik E-Commerce Admin Portal</h3>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-100 p-3 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'products' ? 'bg-[#1B5E20] text-white shadow-md' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'orders' ? 'bg-[#1B5E20] text-white shadow-md' : 'text-slate-700 hover:bg-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'add' ? 'bg-[#1B5E20] text-white shadow-md' : 'text-slate-700 hover:bg-white'
            }`}
          >
            + Add New Product
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Manage Live Products:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-2xl bg-[#F8F6F0] border border-slate-300 space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt="" className="w-12 h-12 object-cover rounded-xl bg-white p-0.5" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-extrabold text-slate-900">{prod.nameEn}</div>
                        <div className="text-[10px] text-emerald-800 font-bold">{prod.bagSize}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-extrabold border-t border-slate-200 pt-2">
                      <div>Price: ₹{prod.price} <span className="text-slate-400 line-through">₹{prod.mrp}</span></div>
                      <div className="text-emerald-700">Stock: {prod.stock}</div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 text-[10px] font-bold hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Recent Farmer Purchases & Dispatches:
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  No orders placed yet. Place a test order via Checkout!
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-black">
                        <span className="text-[#1B5E20]">Order #{ord.id}</span>
                        <span className="text-slate-500">{new Date(ord.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="font-bold text-slate-800">
                        Customer: {ord.shipping.fullName} ({ord.shipping.phone}) - {ord.shipping.village}, {ord.shipping.district}
                      </div>

                      <div className="text-[11px] text-slate-600">
                        Items: {ord.items.map(i => `${i.product.nameEn} x${i.quantity}`).join(', ')}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-2 font-extrabold">
                        <span className="text-amber-800">Total: ₹{ord.total} ({ord.paymentMethod.toUpperCase()})</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px]">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e: any) => onUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-white border border-slate-300 rounded px-2 py-0.5 text-[10px] font-bold"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Product Name (English)"
                  value={newProd.nameEn}
                  onChange={(e) => setNewProd({ ...newProd, nameEn: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
                <input
                  type="text"
                  required
                  placeholder="Product Name (मराठी)"
                  value={newProd.nameMr}
                  onChange={(e) => setNewProd({ ...newProd, nameMr: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  required
                  placeholder="Price (₹)"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
                <input
                  type="number"
                  required
                  placeholder="MRP (₹)"
                  value={newProd.mrp}
                  onChange={(e) => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
                <input
                  type="text"
                  required
                  placeholder="Bag Size (40 KG Bag)"
                  value={newProd.bagSize}
                  onChange={(e) => setNewProd({ ...newProd, bagSize: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <input
                type="text"
                placeholder="Image Cloudinary URL"
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1B5E20] text-white font-black text-xs"
              >
                Save & Publish Product
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
