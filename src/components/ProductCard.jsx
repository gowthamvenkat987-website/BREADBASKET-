import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import RatingStars from './RatingStars';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    product.availableWeights ? product.availableWeights[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  // Compute price based on selected weight multiplier
  let currentPrice = product.price;
  if (selectedWeight && product.weightMultiplier && product.weightMultiplier[selectedWeight]) {
    currentPrice = Math.round(product.basePrice * product.weightMultiplier[selectedWeight]);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity, selectedWeight);
    setQuantity(1); // reset quantity back to 1
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#EBE1D7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFEB]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#2D1B16] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <Sparkles className="w-3 h-3" /> Best Seller
            </span>
          )}
          {product.tags && product.tags.length > 0 && !product.isBestSeller && (
            <span className="bg-[#FAF4ED] text-[#704828] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#D5C2B1] shadow-sm">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
          <div
            className={`w-3.5 h-3.5 border flex items-center justify-center ${
              product.isVeg ? 'border-emerald-600' : 'border-amber-800'
            }`}
            title={product.isVeg ? 'Vegetarian (Eggless)' : 'Contains Egg'}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                product.isVeg ? 'bg-emerald-600' : 'bg-amber-800'
              }`}
            />
          </div>
        </div>

        {/* Quick View Overlay on hover */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2D1B16] text-xs font-bold shadow-lg hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </Link>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C7A5B]">
              {product.category}
            </span>
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="w-3.5 h-3.5" />
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#933D20] transition-colors">
            <h3 className="font-serif text-base font-bold text-[#2D1B16] leading-snug line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-[#7A6A5D] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Weights & Options (if applicable) */}
        <div>
          {product.availableWeights && (
            <div className="mb-3">
              <span className="block text-[10px] font-bold uppercase text-[#8D7B68] mb-1">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.availableWeights.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      selectedWeight === weight
                        ? 'bg-[#2D1B16] text-white shadow-sm'
                        : 'bg-[#FAF4ED] text-[#5C4A3E] hover:bg-[#F0E4D8]'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price and Add to Cart Row */}
          <div className="pt-2 border-t border-[#F2E8DF] flex items-center justify-between gap-2">
            <div>
              <span className="text-xs text-[#8D7B68] block leading-none">Price</span>
              <span className="text-lg font-extrabold text-[#2D1B16] tracking-tight">
                ₹{currentPrice}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#DECBC0] rounded-lg bg-[#FAF6F0] p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center text-[#5C4A3E] hover:bg-white rounded transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-[#2D1B16]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center text-[#5C4A3E] hover:bg-white rounded transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Basket CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Add to Basket"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
