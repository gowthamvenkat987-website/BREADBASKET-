import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  CreditCard, 
  Truck, 
  Store, 
  ShieldCheck, 
  QrCode, 
  ArrowLeft, 
  MessageCircle, 
  Printer, 
  ShoppingBag,
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, deliveryFee, discount, grandTotal, coupon, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const { showToast } = useToast();

  // Order Details Form State
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('520008');
  const [deliverySlot, setDeliverySlot] = useState('Immediate (35-45 mins)');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'upi', 'counter'
  const [instructions, setInstructions] = useState('');

  // Placed Order State
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty and no order placed yet
  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2D1B16]">No Items to Checkout</h2>
        <p className="text-sm text-[#7A6A5D]">Your basket is empty. Please add items from our menu first.</p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2D1B16] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Bakery Menu
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim()) {
      showToast('Please provide your name and contact phone number.', 'error');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      showToast('Please enter your complete delivery address in Vijayawada.', 'error');
      return;
    }

    setIsSubmitting(true);

    const fullAddress = orderType === 'delivery'
      ? `${address}, ${landmark ? `Near ${landmark}, ` : ''}Vijayawada - ${pincode}`
      : 'Store Pickup: The Bread Basket, Panta Kaluva Road, New P&T Colony, Vijayawada';

    const orderPayload = {
      customerName,
      phone,
      email: email || 'Not specified',
      type: orderType,
      address: fullAddress,
      paymentMethod:
        paymentMethod === 'cod'
          ? (orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter')
          : (paymentMethod === 'upi' ? 'UPI (QR / GPay)' : 'Pay at Store'),
      paymentStatus: paymentMethod === 'upi' ? 'Pending Verification' : 'Pending',
      items: cart.map((c) => ({
        id: c.cartItemId,
        name: c.name,
        weight: c.weight,
        quantity: c.quantity,
        price: c.price * c.quantity,
      })),
      subtotal: cartSubtotal,
      deliveryFee: orderType === 'delivery' ? deliveryFee : 0,
      discount,
      total: orderType === 'delivery' ? grandTotal : Math.max(0, cartSubtotal - discount),
      instructions,
      deliverySlot,
    };

    setTimeout(() => {
      const created = addOrder(orderPayload);
      setPlacedOrder(created);
      clearCart();
      setIsSubmitting(false);

      // Launch Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      showToast('Order confirmed! We are preparing your fresh treats.', 'success');
    }, 600);
  };

  // SUCCESS SCREEN
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 space-y-8 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E7DCD3] shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-200">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Fresh from our ovens
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
              Order Confirmed!
            </h1>
            <p className="text-sm text-[#7A6A5D]">
              Thank you, <strong>{placedOrder.customerName}</strong>! Your order <strong>#{placedOrder.id}</strong> has been received by our baking team on Panta Kaluva Road.
            </p>
          </div>

          {/* Status Box */}
          <div className="bg-[#FAF4ED] p-4 sm:p-5 rounded-2xl text-left text-xs space-y-2.5 border border-[#DECBC0]">
            <div className="flex justify-between items-center border-b border-[#EAE0D5] pb-2 font-bold text-sm text-[#2D1B16]">
              <span>Order #{placedOrder.id}</span>
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {placedOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#5C4A3E]">
              <p><strong>Order Type:</strong> <span className="capitalize">{placedOrder.type}</span></p>
              <p><strong>Payment Method:</strong> {placedOrder.paymentMethod}</p>
              <p><strong>Estimated Time:</strong> 35-45 mins</p>
              <p><strong>Contact:</strong> {placedOrder.phone}</p>
            </div>

            <div className="border-t border-[#EAE0D5] pt-2 text-[#5C4A3E]">
              <p><strong>Location:</strong> {placedOrder.address}</p>
            </div>

            {/* Items summary */}
            <div className="border-t border-[#EAE0D5] pt-2 space-y-1">
              <p className="font-bold text-[#2D1B16]">Items Ordered:</p>
              {placedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[#7A6A5D]">
                  <span>{it.quantity}x {it.name} {it.weight ? `(${it.weight})` : ''}</span>
                  <span className="font-semibold text-[#2D1B16]">₹{it.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-[#DECBC0] font-extrabold text-sm text-[#2D1B16]">
                <span>Total Amount:</span>
                <span>₹{placedOrder.total}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/917995435555?text=Hi%20The%20Bread%20Basket,%20I%20just%20placed%20Order%20%23${placedOrder.id}%20for%20₹${placedOrder.total}.%20Please%20confirm!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track / Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6F0] hover:bg-[#EAE0D5] text-[#2D1B16] font-bold text-xs uppercase tracking-wider border border-[#DECBC0] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Explore More</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title Header */}
      <div className="border-b border-[#E7DCD3] pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
          Checkout & Delivery
        </h1>
        <p className="text-xs text-[#7A6A5D] mt-1">
          Complete your details for direct delivery or counter pickup at The Bread Basket Vijayawada.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer Information & Delivery Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Toggle (Delivery vs Pickup) */}
          <div className="bg-white rounded-2xl p-4 border border-[#E7DCD3] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B16] block">
              Choose Order Fulfillment:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  orderType === 'delivery'
                    ? 'bg-[#2D1B16] text-white border-[#2D1B16] shadow-md'
                    : 'bg-[#FAF6F0] text-[#5C4A3E] border-[#DECBC0] hover:bg-[#F2E8DF]'
                }`}
              >
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Express Home Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  orderType === 'pickup'
                    ? 'bg-[#2D1B16] text-white border-[#2D1B16] shadow-md'
                    : 'bg-[#FAF6F0] text-[#5C4A3E] border-[#DECBC0] hover:bg-[#F2E8DF]'
                }`}
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>Store Pickup (Self)</span>
              </button>
            </div>

            {orderType === 'pickup' && (
              <div className="p-3 bg-[#FAF4ED] rounded-xl text-xs text-[#5C381E] border border-[#DECBC0] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Pickup location: <strong>Panta Kaluva Road, New P&T Colony, Vijayawada (Ready in 25 mins)</strong></span>
              </div>
            )}
          </div>

          {/* Customer Details Box */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-2">
              1. Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2D1B16]">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Gowtham Krishna"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2D1B16]">Phone Number (for SMS & Call) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="079954 35555"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#2D1B16]">Email Address (for receipt)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address (only if orderType === 'delivery') */}
          {orderType === 'delivery' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-2">
                2. Vijayawada Delivery Address
              </h2>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D1B16]">Flat / House No. & Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 301, Sri Sai Residency, Panta Kaluva Road, New P&T Colony"
                    className="w-full p-3 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2D1B16]">Nearby Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near PVP Mall / Water Tank"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2D1B16]">Postal Code</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D1B16]">Preferred Delivery Slot</label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none cursor-pointer"
                  >
                    <option value="Immediate (35-45 mins)">Immediate (35-45 mins)</option>
                    <option value="Today Evening (5:00 PM - 7:00 PM)">Today Evening (5:00 PM - 7:00 PM)</option>
                    <option value="Today Night (8:00 PM - 10:00 PM)">Today Night (8:00 PM - 10:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-2">
              {orderType === 'delivery' ? '3. Payment Method' : '2. Payment Method'}
            </h2>

            <div className="space-y-2.5">
              {/* Option 1: Cash on Delivery / Pay at Store */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#2D1B16] bg-[#FAF4ED] ring-1 ring-[#2D1B16]'
                    : 'border-[#E7DCD3] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#2D1B16] cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#2D1B16]">
                      {orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Counter (Cash/Card)'}
                    </p>
                    <p className="text-[11px] text-[#7A6A5D]">Pay in cash or card when you receive your fresh batch.</p>
                  </div>
                </div>
                <CreditCard className="w-4 h-4 text-[#8D7B68]" />
              </label>

              {/* Option 2: UPI */}
              <label
                className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#2D1B16] bg-[#FAF4ED] ring-1 ring-[#2D1B16]'
                    : 'border-[#E7DCD3] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#2D1B16] cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#2D1B16]">
                        Instant UPI (Google Pay, PhonePe, Paytm, QR)
                      </p>
                      <p className="text-[11px] text-[#7A6A5D]">Scan QR code or pay to UPI ID</p>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-[#2D1B16]" />
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-4 pt-3 border-t border-[#DECBC0] bg-white p-3 rounded-xl text-center space-y-2">
                    <p className="text-xs font-bold text-[#2D1B16]">
                      Scan to Pay with Any UPI App
                    </p>
                    {/* Simulated styled QR Code box */}
                    <div className="w-36 h-36 mx-auto bg-[#FAF6F0] p-2 rounded-xl border border-[#DECBC0] flex flex-col items-center justify-center text-center shadow-inner">
                      <QrCode className="w-20 h-20 text-[#2D1B16]" />
                      <span className="text-[9px] font-bold text-[#8D7B68] mt-1">thebreadbasket@icici</span>
                    </div>
                    <p className="text-[11px] text-[#5C4A3E]">
                      UPI ID: <strong className="select-all">thebreadbasket@icici</strong>
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Breakdown & Submission */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-3">
              Order Review
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-[#2D1B16] truncate">{item.name}</p>
                    <p className="text-[#8D7B68]">
                      {item.quantity}x {item.weight ? `(${item.weight})` : ''}
                    </p>
                  </div>
                  <span className="font-semibold text-[#2D1B16]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#F2E8DF] space-y-2 text-xs">
              <div className="flex justify-between text-[#5A493D]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#2D1B16]">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between text-[#5A493D]">
                <span>Delivery Charge</span>
                <span>
                  {orderType === 'pickup' ? (
                    <span className="text-emerald-700 font-bold">FREE (Pickup)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({coupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#F2E8DF] flex justify-between text-base font-black text-[#2D1B16]">
                <span>Total Due</span>
                <span>
                  ₹{orderType === 'pickup' ? Math.max(0, cartSubtotal - discount) : grandTotal}
                </span>
              </div>
            </div>

            {/* Notes textarea */}
            <div className="pt-1">
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Baking/delivery instructions (e.g. extra napkins)..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
              />
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {isSubmitting
                  ? 'Placing Order...'
                  : `Place Order (₹${orderType === 'pickup' ? Math.max(0, cartSubtotal - discount) : grandTotal})`}
              </span>
            </button>

            <p className="text-[11px] text-[#8D7B68] text-center">
              🔒 Safe & Secure Checkout • The Bread Basket Guarantee
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
