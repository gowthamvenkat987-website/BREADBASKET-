import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Flame, 
  Clock, 
  Heart, 
  Cake, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Coffee 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import { CATEGORIES } from '../data/products';

export default function HomePage() {
  const { products, reviews } = useAdmin();

  // Pick top best sellers
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);

  // Pick top 3 reviews
  const topReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4ED] via-[#FAF6F0] to-[#FAF6F0] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EFE5DC]">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FCE4EC]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-[#FFF3E0]/60 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4ED] border border-[#E0D0C1] shadow-xs text-xs font-bold text-[#5C381E]">
                <span className="flex h-2 w-2 rounded-full bg-[#2E7D32] animate-ping" />
                <span className="uppercase tracking-wider">Vijayawada's Premier Bakery</span>
                <span className="text-[#A8988B]">•</span>
                <span className="text-[#C59B27] flex items-center gap-1 font-extrabold">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 4.3 (960+ Reviews)
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D1B16] leading-[1.12] tracking-tight">
                Freshly Baked <br />
                <span className="text-gradient-rose italic font-serif">Happiness</span>, Every Day
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#5A493D] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Welcome to <strong>The Bread Basket Vijayawada</strong> on Panta Kaluva Road. From golden European sourdoughs and velvety celebration cakes to flaky croissants and gourmet pizzas—every bite is crafted with genuine passion and pure butter.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-[#D4AF37]/30"
                >
                  <span>Order Online Now</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>

                <Link
                  to="/custom-cake"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FCE4EC] hover:bg-[#F8BBD0] text-[#880E4F] font-bold text-sm transition-all duration-200 border border-[#F48FB1]/40 shadow-xs"
                >
                  <Cake className="w-4 h-4 text-[#C2185B]" />
                  <span>Design Custom Cake</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#EAE0D5] text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF4ED] flex items-center justify-center text-[#8D7B68] border border-[#DECBC0]">
                    <Flame className="w-4 h-4 text-[#D81B60]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D1B16]">Freshly Baked</h4>
                    <p className="text-[11px] text-[#7A6A5D]">Batches at 8:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF4ED] flex items-center justify-center text-[#8D7B68] border border-[#DECBC0]">
                    <Truck className="w-4 h-4 text-[#C59B27]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D1B16]">Fast Delivery</h4>
                    <p className="text-[11px] text-[#7A6A5D]">Across Vijayawada</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF4ED] flex items-center justify-center text-[#8D7B68] border border-[#DECBC0]">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D1B16]">100% Pure</h4>
                    <p className="text-[11px] text-[#7A6A5D]">European Butter</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF4ED] flex items-center justify-center text-[#8D7B68] border border-[#DECBC0]">
                    <Clock className="w-4 h-4 text-[#2D1B16]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D1B16]">Open Daily</h4>
                    <p className="text-[11px] text-[#7A6A5D]">Till 10:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow behind main image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-[#D81B60]/20 rounded-3xl transform rotate-2 scale-105 filter blur-lg -z-10" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                    alt="Royal Belgian Truffle Cake at The Bread Basket Vijayawada"
                    className="w-full h-[400px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-1">
                      Vijayawada's Signature
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-snug">
                      Royal Belgian Dark Chocolate Truffle Cake
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">
                      Handcrafted with 54% Belgian cocoa ganache and dusted with edible gold.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-[#D4AF37]">From ₹499</span>
                      <Link
                        to="/product/cake-belgian-truffle"
                        className="text-xs font-bold bg-white text-[#2D1B16] px-3.5 py-1.5 rounded-full hover:bg-[#FAF4ED] transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#E7DCD3] flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FAF4ED] flex items-center justify-center text-xl">
                    ⭐
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-black text-sm text-[#2D1B16]">4.3 Stars</span>
                      <span className="text-xs text-[#8D7B68]">(960+ Reviews)</span>
                    </div>
                    <p className="text-[11px] text-[#7A6A5D]">Top-Rated Bakery in Vijayawada</p>
                  </div>
                </div>

                {/* Floating Time Pill */}
                <div className="absolute -top-4 -right-4 bg-[#2D1B16] text-[#FAF6F0] p-3 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold">Open till 10:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
            Explore by Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
            Oven-Fresh Specialties
          </h2>
          <p className="text-sm text-[#7A6A5D]">
            From celebration cakes to warm savories and specialty coffees, discover your daily delight.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((category) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group bg-white rounded-2xl p-4 text-center border border-[#EBE1D7] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] group-hover:bg-[#2D1B16] text-[#5C381E] group-hover:text-[#D4AF37] flex items-center justify-center transition-colors duration-300 mb-2.5 shadow-inner">
                {category.id === 'cakes' && <Cake className="w-6 h-6" />}
                {category.id === 'pastries' && <Sparkles className="w-6 h-6" />}
                {category.id === 'breads' && <span className="text-2xl">🥖</span>}
                {category.id === 'cookies' && <span className="text-2xl">🍪</span>}
                {category.id === 'desserts' && <span className="text-2xl">🍮</span>}
                {category.id === 'sandwiches' && <span className="text-2xl">🥪</span>}
                {category.id === 'pizza' && <span className="text-2xl">🍕</span>}
                {category.id === 'beverages' && <Coffee className="w-6 h-6" />}
              </div>
              <span className="text-xs font-bold text-[#2D1B16] group-hover:text-[#933D20] transition-colors leading-snug">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D81B60] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Vijayawada's Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
              Best Selling Creations
            </h2>
            <p className="text-sm text-[#7A6A5D] mt-1">
              Our most-loved cakes, pastries, and breads ordered daily by local food lovers.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2D1B16] hover:text-[#933D20] group"
          >
            <span>Explore All 20+ Items</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. CUSTOM CAKE DESIGNER TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2D1B16] via-[#3E2723] to-[#2D1B16] text-white p-8 sm:p-12 shadow-2xl border-2 border-[#D4AF37]/40">
          {/* Background sparkles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D81B60]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C07B] text-xs font-bold uppercase tracking-wider">
                <Cake className="w-3.5 h-3.5" /> Made To Order Just For You
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Dreaming of a Special Birthday or Wedding Cake?
              </h2>

              <p className="text-sm sm:text-base text-[#D7CCC8] max-w-xl mx-auto lg:mx-0">
                Pick your flavor, tier weight, personalized icing message, and even upload reference designs. Our master pastry chefs in Vijayawada will bring your vision to life!
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/custom-cake"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B3891E] text-[#2D1B16] font-extrabold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  Launch Interactive Cake Builder
                </Link>
                <a
                  href="https://wa.me/917995435555?text=Hi%20The%20Bread%20Basket,%20I%20want%20to%20discuss%20a%20custom%20cake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all border border-white/20"
                >
                  WhatsApp Cake Inquiry
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=700&q=80"
                  alt="Custom celebration cake by The Bread Basket"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-xl text-center text-xs font-bold text-[#E5C07B]">
                  🎂 100% Handcrafted • Eggless Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
            Our Craft & Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
            Why Vijayawada Loves The Bread Basket
          </h2>
          <p className="text-sm text-[#7A6A5D]">
            We don't cut corners. From 28-hour sourdough fermentation to genuine dairy butter, experience the difference in every crumb.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D7] text-center space-y-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-[#D81B60] flex items-center justify-center mx-auto text-xl">
              🌿
            </div>
            <h3 className="font-serif text-base font-bold text-[#2D1B16]">Fresh Ingredients</h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              Real European butter, fresh dairy cream, organic flour, and zero chemical pre-mixes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D7] text-center space-y-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-[#C59B27] flex items-center justify-center mx-auto text-xl">
              🥖
            </div>
            <h3 className="font-serif text-base font-bold text-[#2D1B16]">Freshly Baked Daily</h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              Baking begins at 5:00 AM every morning so warm loaves hit the shelves by 8:00 AM sharp.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D7] text-center space-y-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-[#C2185B] flex items-center justify-center mx-auto text-xl">
              🎂
            </div>
            <h3 className="font-serif text-base font-bold text-[#2D1B16]">Artisanal Custom Cakes</h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              Bespoke tiered cakes and thematic designs tailored for Vijayawada's grandest celebrations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D7] text-center space-y-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-[#1E88E5] flex items-center justify-center mx-auto text-xl">
              ⚡
            </div>
            <h3 className="font-serif text-base font-bold text-[#2D1B16]">Fast City Delivery</h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              Safe, temperature-insulated cake packaging delivered carefully within 45 minutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EBE1D7] text-center space-y-3 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-emerald-700 flex items-center justify-center mx-auto text-xl">
              ✨
            </div>
            <h3 className="font-serif text-base font-bold text-[#2D1B16]">Hygienic Kitchen</h3>
            <p className="text-xs text-[#7A6A5D] leading-relaxed">
              Open transparent baking studio, sanitized equipment, and strict FSSAI compliance.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="bg-[#FAF4ED] py-16 border-y border-[#EFE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C59B27] uppercase tracking-wider mb-1">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" /> What Customers Say
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
                4.3 Stars on Google • 960+ Reviews
              </h2>
            </div>

            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D1B16] text-[#FAF6F0] text-xs font-bold hover:bg-[#4A2E18] transition-colors"
            >
              <span>View All 960+ Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-[#E7DCD3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <RatingStars rating={rev.rating} showScore={false} size="w-4 h-4" />
                    <span className="text-xs text-[#8D7B68]">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#4A3B32] italic leading-relaxed mb-4">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2E8DF] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2D1B16] flex items-center gap-1">
                      {rev.author}
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </h4>
                    <p className="text-[11px] text-[#8D7B68]">{rev.location}</p>
                  </div>
                  {rev.cakeOrdered && (
                    <span className="text-[10px] bg-[#FAF4ED] text-[#704828] px-2 py-0.5 rounded font-medium max-w-[120px] truncate">
                      {rev.cakeOrdered}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VISIT & CONTACT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-3xl border border-[#E7DCD3] p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
              Drop By Our Bakery Cafe
            </span>
            <h2 className="font-serif text-3xl font-black text-[#2D1B16]">
              Experience The Aroma on Panta Kaluva Road
            </h2>
            <p className="text-sm text-[#7A6A5D] leading-relaxed">
              Step in for the heavenly aroma of freshly pulled espresso and oven-hot pastries. Enjoy comfortable AC seating, friendly hospitality, and freshly packed takeout boxes.
            </p>

            <div className="space-y-2 text-sm text-[#4A3B32] pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>5th, 57-10-1A, New P&T Colony, Lane, Panta Kaluva Road, Vijayawada, 520008</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Open Monday to Sunday: 8:00 AM – 10:30 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Bakery Hotline: <strong>079954 35555</strong></span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/reservation"
                className="px-5 py-2.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Reserve a Table
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl bg-[#FAF4ED] hover:bg-[#F3E8DC] text-[#2D1B16] font-bold text-xs uppercase tracking-wider transition-colors border border-[#DECBC0]"
              >
                View Map & Directions
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E7DCD3] shadow-md h-64 sm:h-72">
              <iframe
                title="The Bread Basket Location"
                src="https://maps.google.com/maps?q=Panta%20Kaluva%20Road,%20Vijayawada,%20Andhra%20Pradesh%20520008&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
