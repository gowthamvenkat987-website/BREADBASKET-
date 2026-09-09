import React, { useState } from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Calendar, 
  Cake, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Clock, 
  Search, 
  RefreshCw, 
  Eye, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import { CATEGORIES } from '../data/products';

const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Out for Delivery',
  'Completed',
  'Cancelled',
];

export default function AdminDashboard() {
  const { 
    products, 
    orders, 
    reservations, 
    customCakes, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateReservationStatus, 
    updateCustomCakeStatus, 
    resetToDefaults 
  } = useAdmin();

  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'reservations', 'cakes'

  // Product Add / Edit Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'cakes',
    price: '',
    description: '',
    isVeg: true,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  });

  // Filter & Search inside Admin
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Overview metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'cakes',
      price: '',
      description: '',
      isVeg: true,
      isBestSeller: false,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      isVeg: p.isVeg,
      isBestSeller: p.isBestSeller,
      image: p.image,
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast('Please fill in product name and price.', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct(productForm);
    }
    setProductModalOpen(false);
  };

  const filteredOrders = orders.filter((o) => {
    if (!orderSearch) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q)
    );
  });

  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DCD3] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#2D1B16] text-[#D4AF37] px-2.5 py-0.5 rounded-full">
              Bakery Manager
            </span>
            <span className="text-xs text-[#8D7B68]">Live LocalStorage Sync</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16] mt-1">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E7DCD3] hover:bg-[#FAF6F0] text-xs font-bold text-[#5C4A3E] transition-colors cursor-pointer"
            title="Reset to Sample Demo Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenAddProduct}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#8D7B68]">
            <span className="text-xs font-bold uppercase">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-black text-[#2D1B16]">₹{totalRevenue}</p>
          <p className="text-[11px] text-emerald-700 font-semibold">From completed orders</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#8D7B68]">
            <span className="text-xs font-bold uppercase">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#C59B27]" />
          </div>
          <p className="font-serif text-2xl font-black text-[#2D1B16]">{orders.length}</p>
          <p className="text-[11px] text-[#D81B60] font-semibold">{pendingOrders} active / preparing</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#8D7B68]">
            <span className="text-xs font-bold uppercase">Menu Items</span>
            <Package className="w-4 h-4 text-[#1976D2]" />
          </div>
          <p className="font-serif text-2xl font-black text-[#2D1B16]">{products.length}</p>
          <p className="text-[11px] text-[#7A6A5D]">Across 8 categories</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#8D7B68]">
            <span className="text-xs font-bold uppercase">Reservations</span>
            <Calendar className="w-4 h-4 text-[#7B1FA2]" />
          </div>
          <p className="font-serif text-2xl font-black text-[#2D1B16]">{reservations.length}</p>
          <p className="text-[11px] text-[#7A6A5D]">Table bookings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#8D7B68]">
            <span className="text-xs font-bold uppercase">Custom Cakes</span>
            <Cake className="w-4 h-4 text-[#D81B60]" />
          </div>
          <p className="font-serif text-2xl font-black text-[#2D1B16]">{customCakes.length}</p>
          <p className="text-[11px] text-[#7A6A5D]">Inquiries & requests</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7DCD3] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'text-[#5C4A3E] hover:bg-[#FAF4ED]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'text-[#5C4A3E] hover:bg-[#FAF4ED]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Catalog & Pricing ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reservations'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'text-[#5C4A3E] hover:bg-[#FAF4ED]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Table Bookings ({reservations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cakes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'cakes'
              ? 'bg-[#2D1B16] text-white shadow-xs'
              : 'text-[#5C4A3E] hover:bg-[#FAF4ED]'
          }`}
        >
          <Cake className="w-3.5 h-3.5" />
          <span>Custom Cake Requests ({customCakes.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by Order ID or Name..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-white text-[#2D1B16] focus:outline-none"
              />
            </div>
            <p className="text-xs text-[#8D7B68]">
              Tip: Click status dropdown to change order flow in real-time
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DCD3] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF4ED] text-[#5C381E] border-b border-[#E7DCD3] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount & Mode</th>
                    <th className="py-3 px-4">Delivery Address</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E8DF]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-[#2D1B16] block">{order.id}</span>
                        <span className="text-[10px] text-[#8D7B68]">{order.date}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#2D1B16] block">{order.customerName}</span>
                        <span className="text-[10px] text-[#7A6A5D]">{order.phone}</span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-0.5">
                          {order.items.map((it, idx) => (
                            <p key={idx} className="truncate text-[#5C4A3E]">
                              {it.quantity}x {it.name} {it.weight ? `(${it.weight})` : ''}
                            </p>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-black text-sm text-[#2D1B16] block">₹{order.total}</span>
                        <span className="text-[10px] text-[#7A6A5D]">{order.paymentMethod}</span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="line-clamp-2 text-[#7A6A5D] leading-tight">
                          {order.address}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : order.status === 'Preparing'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : order.status === 'Out for Delivery'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'Cancelled'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-[#FAF4ED] text-[#2D1B16] border-[#DECBC0]'
                          }`}
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-white text-[#2D1B16] focus:outline-none"
              />
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D1B16] text-white text-xs font-bold hover:bg-[#4A2E18] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add New Bakery Item</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DCD3] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF4ED] text-[#5C381E] border-b border-[#E7DCD3] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (₹)</th>
                    <th className="py-3 px-4">Dietary</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E8DF]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-[#FAF4ED] border border-[#EBE1D7]"
                        />
                        <div>
                          <span className="font-bold text-[#2D1B16] block">{p.name}</span>
                          <span className="text-[10px] text-[#7A6A5D] line-clamp-1">{p.description}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 capitalize font-semibold text-[#5C4A3E]">
                        {p.category}
                      </td>

                      <td className="py-3 px-4 font-black text-sm text-[#2D1B16]">
                        ₹{p.price}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p.isVeg ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {p.isVeg ? 'Pure Veg' : 'Contains Egg'}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-bold text-[#2D1B16]">
                        ⭐ {p.rating}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 rounded-lg text-[#5C4A3E] hover:bg-[#FAF4ED] transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESERVATIONS MANAGEMENT */}
      {activeTab === 'reservations' && (
        <div className="bg-white rounded-2xl border border-[#E7DCD3] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF4ED] text-[#5C381E] border-b border-[#E7DCD3] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Zone & Occasion</th>
                  <th className="py-3 px-4">Special Requests</th>
                  <th className="py-3 px-4">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E8DF]">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-[#2D1B16]">{res.id}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#2D1B16] block">{res.customerName}</span>
                      <span className="text-[10px] text-[#8D7B68]">{res.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">{res.guests} Persons</td>
                    <td className="py-3.5 px-4 font-medium text-[#2D1B16]">
                      {res.date} at {res.time}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block">{res.zone}</span>
                      <span className="text-[10px] text-[#7A6A5D]">{res.occasion}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-[#7A6A5D]">
                      {res.specialRequest || 'None'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={res.status}
                        onChange={(e) => updateReservationStatus(res.id, e.target.value)}
                        className="p-1 rounded-lg text-xs font-bold border border-[#DECBC0] bg-[#FAF6F0] focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Seated">Seated</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM CAKES MANAGEMENT */}
      {activeTab === 'cakes' && (
        <div className="bg-white rounded-2xl border border-[#E7DCD3] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF4ED] text-[#5C381E] border-b border-[#E7DCD3] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Inquiry ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Flavor & Shape</th>
                  <th className="py-3 px-4">Weight & Est. Price</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Message On Cake</th>
                  <th className="py-3 px-4">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E8DF]">
                {customCakes.map((cake) => (
                  <tr key={cake.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-[#2D1B16]">{cake.id}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#2D1B16] block">{cake.customerName}</span>
                      <span className="text-[10px] text-[#8D7B68]">{cake.phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold block text-[#2D1B16]">{cake.flavor}</span>
                      <span className="text-[10px] text-[#7A6A5D]">Shape: {cake.shape}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block font-bold">{cake.weight}</span>
                      <span className="font-extrabold text-[#D81B60]">₹{cake.estimatedPrice}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#2D1B16]">
                      {cake.preferredDate} ({cake.preferredTime})
                    </td>
                    <td className="py-3.5 px-4 italic text-[#4A3B32]">
                      "{cake.message}"
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={cake.status}
                        onChange={(e) => updateCustomCakeStatus(cake.id, e.target.value)}
                        className="p-1 rounded-lg text-xs font-bold border border-[#DECBC0] bg-[#FAF6F0] focus:outline-none"
                      >
                        <option value="Under Review">Under Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Baking">Baking</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-scale-up border border-[#E7DCD3] relative">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8D7B68] hover:text-[#2D1B16] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-black text-[#2D1B16]">
              {editingProduct ? 'Edit Product' : 'Add New Bakery Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Hazelnut Chocolate Tart"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#2D1B16]">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="250"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Short appetizing summary of ingredients and flavor..."
                  className="w-full p-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E7DCD3]">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D1B16] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isVeg}
                    onChange={(e) => setProductForm({ ...productForm, isVeg: e.target.checked })}
                    className="accent-[#2D1B16]"
                  />
                  <span>100% Pure Veg (Eggless)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#2D1B16] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-[#2D1B16]"
                  />
                  <span>Best Seller Tag</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DECBC0] bg-[#FAF6F0] text-[#2D1B16] font-bold text-xs hover:bg-[#EAE0D5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
