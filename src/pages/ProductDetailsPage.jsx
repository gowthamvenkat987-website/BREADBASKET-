import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Zap, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Check, 
  Truck, 
  Share2 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id);

  const [selectedWeight, setSelectedWeight] = useState(
    product?.availableWeights ? product.availableWeights[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#2D1B16]">Product Not Found</h2>
        <p className="text-sm text-[#7A6A5D]">The bakery treat you are looking for might have sold out.</p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2D1B16] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Menu
        </Link>
      </div>
    );
  }

  // Calculate dynamic price based on weight multiplier
  let currentPrice = product.price;
  if (selectedWeight && product.weightMultiplier && product.weightMultiplier[selectedWeight]) {
    currentPrice = Math.round(product.basePrice * product.weightMultiplier[selectedWeight]);
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at The Bread Basket Vijayawada!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Related items in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between gap-4 text-xs font-semibold text-[#8D7B68]">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#2D1B16]">Home</Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-[#2D1B16]">Menu</Link>
          <span>/</span>
          <Link to={`/menu?category=${product.category}`} className="capitalize hover:text-[#2D1B16]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#2D1B16] truncate max-w-[200px]">{product.name}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7DCD3] hover:bg-white transition-colors cursor-pointer text-[#5C4A3E]"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#F5EFEB] border-2 border-white shadow-xl aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 bg-[#2D1B16] text-[#D4AF37] text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> Best Seller
                </span>
              )}
              <span className="bg-[#FAF4ED]/90 backdrop-blur-md text-[#5C381E] text-xs font-bold px-3 py-1 rounded-full border border-[#D5C2B1] shadow-sm uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Veg / Non-Veg Indicator */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-md flex items-center gap-1.5">
              <div
                className={`w-4 h-4 border flex items-center justify-center ${
                  product.isVeg ? 'border-emerald-600' : 'border-amber-800'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.isVeg ? 'bg-emerald-600' : 'bg-amber-800'
                  }`}
                />
              </div>
              <span className="text-[11px] font-bold text-[#2D1B16]">
                {product.isVeg ? '100% Pure Veg (Eggless)' : 'Contains Egg'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Rating */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="w-4 h-4" />
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                In Stock & Fresh
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16] leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-sans text-3xl sm:text-4xl font-black text-[#2D1B16] tracking-tight">
                ₹{currentPrice}
              </span>
              {selectedWeight && (
                <span className="text-sm font-semibold text-[#8D7B68]">
                  for {selectedWeight}
                </span>
              )}
              <span className="text-xs text-[#2E7D32] font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#5A493D] leading-relaxed border-t border-[#EAE0D5] pt-4">
            {product.description}
          </p>

          {/* Weight / Size Selector (for Cakes) */}
          {product.availableWeights && (
            <div className="space-y-2 bg-[#FAF4ED] p-4 rounded-2xl border border-[#E7DCD3]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                  Select Cake Weight:
                </span>
                <span className="text-xs font-semibold text-[#D81B60]">
                  Pricing updates automatically
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.availableWeights.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      selectedWeight === w
                        ? 'bg-[#2D1B16] text-white shadow-md ring-2 ring-[#D4AF37]/50'
                        : 'bg-white text-[#5C4A3E] hover:bg-[#F2E8DF] border border-[#E0D0C1]'
                    }`}
                  >
                    <span>{w}</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      ₹{Math.round(product.basePrice * (product.weightMultiplier?.[w] || 1))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#DECBC0] rounded-xl bg-white p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#5C4A3E] hover:bg-[#FAF4ED] rounded-lg transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-extrabold text-[#2D1B16]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#5C4A3E] hover:bg-[#FAF4ED] rounded-lg transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Basket */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Basket</span>
              </button>
            </div>

            {/* Buy Now (Direct Checkout) */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B3891E] text-[#2D1B16] font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now with Express Checkout</span>
            </button>
          </div>

          {/* Ingredients & Craft Promise */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#EAE0D5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D1B16]">
                Key Ingredients & Craft
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E7DCD3] text-xs text-[#5C4A3E]"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Delivery and Freshness Assurance Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#E7DCD3] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A493D]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
              <span>
                <strong>Express Delivery</strong>: 35-45 mins across Vijayawada
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D81B60] flex-shrink-0" />
              <span>
                <strong>Preparation</strong>: {product.preparationTime || 'Freshly Prepared'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-[#EAE0D5] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-black text-[#2D1B16]">
              You Might Also Love
            </h2>
            <Link
              to={`/menu?category=${product.category}`}
              className="text-xs font-bold text-[#2D1B16] hover:underline"
            >
              View More in {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
