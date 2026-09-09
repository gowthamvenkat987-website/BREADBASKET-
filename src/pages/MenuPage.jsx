import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  ArrowUpDown, 
  Cake, 
  Coffee, 
  Utensils, 
  Flame 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/products';

export default function MenuPage() {
  const { products } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'

  // Update selectedCategory if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Synchronize category change with URL
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Dietary filter
        if (dietaryFilter === 'veg' && !p.isVeg) return false;
        if (dietaryFilter === 'non-veg' && p.isVeg) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchIngredients = p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCategory && !matchIngredients) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietaryFilter('all');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2D1B16] via-[#3E2723] to-[#2D1B16] text-[#FAF6F0] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C07B] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Handcrafted In Vijayawada
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Our Bakery Menu
        </h1>
        <p className="text-sm sm:text-base text-[#D7CCC8] max-w-xl mx-auto mt-2">
          Browse through our daily selections of cakes, pastries, sourdoughs, sandwiches, and handcrafted beverages.
        </p>
      </div>

      {/* Search and Sort Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7DCD3] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-[#8D7B68] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chocolate cake, sourdough, cappuccino..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E2D4C7] text-sm text-[#2D1B16] placeholder-[#8D7B68] focus:outline-none focus:border-[#2D1B16] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D7B68] hover:text-[#2D1B16]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dietary and Sort Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Dietary Buttons */}
          <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#E2D4C7] text-xs font-semibold">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                dietaryFilter === 'all' ? 'bg-[#2D1B16] text-white shadow-xs' : 'text-[#6D5D53]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietaryFilter === 'veg' ? 'bg-emerald-700 text-white shadow-xs' : 'text-[#6D5D53]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Eggless
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietaryFilter === 'non-veg' ? 'bg-amber-800 text-white shadow-xs' : 'text-[#6D5D53]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              With Egg
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#E2D4C7] text-xs font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8D7B68]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#2D1B16] focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-[#2D1B16] text-[#FAF6F0] shadow-md -translate-y-0.5 border border-[#D4AF37]/50'
                : 'bg-white text-[#5C4A3E] hover:bg-[#FAF4ED] border border-[#E7DCD3]'
            }`}
          >
            <span>{cat.name}</span>
            {cat.id === 'all' && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                {products.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex items-center justify-between text-xs text-[#7A6A5D] px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> delicious items
          {selectedCategory !== 'all' && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
        </span>

        {(selectedCategory !== 'all' || dietaryFilter !== 'all' || searchQuery) && (
          <button
            onClick={clearFilters}
            className="text-[#D81B60] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E7DCD3] shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF4ED] flex items-center justify-center text-3xl mx-auto">
            🥐
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2D1B16]">
            No Treats Found
          </h3>
          <p className="text-sm text-[#7A6A5D]">
            We couldn't find any bakery items matching "<strong>{searchQuery || selectedCategory}</strong>".
            Try searching for something else or reset your filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 rounded-full bg-[#2D1B16] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A2E18] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
