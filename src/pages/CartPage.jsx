import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    deliveryFee, 
    discount, 
    grandTotal, 
    coupon, 
    updateQuantity, 
    removeFromCart, 
    applyCoupon, 
    removeCoupon 
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#FAF4ED] border-2 border-[#E7DCD3] flex items-center justify-center text-4xl mx-auto shadow-inner">
          🥐
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
            Your Bakery Basket is Empty
          </h1>
          <p className="text-sm text-[#7A6A5D] max-w-md mx-auto">
            You haven't added any sweet or savory delights yet. Warm artisanal breads, cakes, and pastries are waiting for you!
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2D1B16] text-[#FAF6F0] font-bold text-sm hover:bg-[#4A2E18] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Browse Fresh Bakery Menu</span>
          </Link>
        </div>

        {/* Quick suggestions */}
        <div className="pt-8 border-t border-[#EAE0D5] text-xs text-[#8D7B68]">
          <p className="font-semibold mb-2 text-[#2D1B16]">Popular suggestions right now:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/product/cake-belgian-truffle" className="px-3 py-1 bg-white rounded-lg border border-[#E7DCD3] hover:border-[#2D1B16]">
              Belgian Truffle Cake
            </Link>
            <Link to="/product/pastry-butter-croissant" className="px-3 py-1 bg-white rounded-lg border border-[#E7DCD3] hover:border-[#2D1B16]">
              Butter Croissant
            </Link>
            <Link to="/product/bread-garlic-herb-focaccia" className="px-3 py-1 bg-white rounded-lg border border-[#E7DCD3] hover:border-[#2D1B16]">
              Garlic Focaccia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DCD3] pb-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
            Your Bakery Basket
          </h1>
          <p className="text-xs text-[#7A6A5D] mt-1">
            Review your selected treats before proceeding to Vijayawada checkout.
          </p>
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5C381E] hover:text-[#2D1B16]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E7DCD3] shadow-xs overflow-hidden divide-y divide-[#F2E8DF]">
            {cart.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-5 flex gap-4 items-center">
                {/* Image */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FAF6F0] flex-shrink-0 border border-[#EBE1D7]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-serif font-bold text-sm sm:text-base text-[#2D1B16] hover:text-[#933D20] line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[#A8988B] hover:text-[#D81B60] p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.weight && (
                    <span className="inline-block text-[11px] font-bold bg-[#FAF4ED] text-[#704828] px-2 py-0.5 rounded border border-[#E7DCD3]">
                      Weight: {item.weight}
                    </span>
                  )}

                  <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DECBC0] rounded-lg bg-[#FAF6F0] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#5C4A3E] hover:bg-white rounded transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#2D1B16]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#5C4A3E] hover:bg-white rounded transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs text-[#8D7B68] block">
                        ₹{item.price} × {item.quantity}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-[#2D1B16]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery threshold bar */}
          <div className="bg-[#FAF4ED] p-4 rounded-2xl border border-[#E7DCD3] flex items-center justify-between text-xs text-[#5C381E]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C59B27]" />
              {cartSubtotal >= 499 ? (
                <span className="font-bold text-emerald-800">
                  🎉 You unlocked FREE Express Vijayawada Delivery!
                </span>
              ) : (
                <span>
                  Add <strong>₹{499 - cartSubtotal}</strong> more to get <strong>FREE delivery</strong> in Vijayawada!
                </span>
              )}
            </div>
            {cartSubtotal < 499 && (
              <Link to="/menu" className="font-bold underline hover:text-[#2D1B16]">
                Add More
              </Link>
            )}
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E7DCD3] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2D1B16] border-b border-[#F2E8DF] pb-3">
              Order Summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#5A493D]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#2D1B16]">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between text-[#5A493D]">
                <span>Vijayawada Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#F2E8DF] flex justify-between text-base font-black text-[#2D1B16]">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
              <p className="text-[10px] text-[#8D7B68] text-right">
                All taxes and packing charges included
              </p>
            </div>

            {/* Coupon Promo Box */}
            <div className="pt-2 border-t border-[#F2E8DF]">
              {coupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{coupon.code} applied ({coupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. WELCOME50)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] uppercase font-bold text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2D1B16] hover:bg-[#4A2E18] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#8D7B68] mt-1.5">
                Tip: Try <strong>WELCOME50</strong> (₹50 off) or <strong>BREAD10</strong> (10% off)
              </p>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
