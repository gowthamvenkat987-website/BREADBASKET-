import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Flame, 
  Award, 
  Users, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Coffee 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Header Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2D1B16] via-[#3E2723] to-[#2D1B16] text-[#FAF6F0] rounded-3xl p-8 sm:p-14 shadow-xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C07B] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" /> Baking Since 2018 in Vijayawada
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Our Passion For Real Baking
          </h1>
          <p className="text-sm sm:text-base text-[#D7CCC8] max-w-2xl mx-auto mt-3 leading-relaxed">
            The story of how a small artisan kitchen on Panta Kaluva Road became Vijayawada's favorite destination for celebration cakes, crusty sourdoughs, and heartfelt hospitality.
          </p>
        </div>
      </section>

      {/* 2. The Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
              How It All Began
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16] leading-tight">
              Baking With Soul, Not Pre-Mixes
            </h2>
            <p className="text-sm sm:text-base text-[#5A493D] leading-relaxed">
              In 2018, we looked around Vijayawada and noticed that commercial bakeries relied heavily on artificial cake pre-mixes, margarine, and artificial essences. We believed the food lovers of Vijayawada deserved better.
            </p>
            <p className="text-sm sm:text-base text-[#5A493D] leading-relaxed">
              <strong>The Bread Basket</strong> was founded with a single uncompromising rule: <em>everything must be baked from scratch using real dairy butter, stoneground flours, pure cocoa, and natural vanilla.</em>
            </p>
            <p className="text-sm sm:text-base text-[#5A493D] leading-relaxed">
              Every morning at 5:00 AM, our ovens preheat. From 28-hour slow-fermented French sourdough boules to melt-in-the-mouth Belgian chocolate ganache cakes, we put craftsmanship above all else.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <h4 className="font-serif text-3xl font-black text-[#2D1B16]">960+</h4>
                <p className="text-xs text-[#8D7B68]">Google Reviews (4.3★)</p>
              </div>
              <div className="w-px h-10 bg-[#DECBC0]" />
              <div>
                <h4 className="font-serif text-3xl font-black text-[#2D1B16]">100%</h4>
                <p className="text-xs text-[#8D7B68]">Pure Dairy Butter</p>
              </div>
              <div className="w-px h-10 bg-[#DECBC0]" />
              <div>
                <h4 className="font-serif text-3xl font-black text-[#2D1B16]">8 AM</h4>
                <p className="text-xs text-[#8D7B68]">Daily Warm Batches</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                    alt="Artisan Sourdough baking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                    alt="Flaky Croissant preparation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
                    alt="Belgian Truffle Cake finish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
                    alt="Barista brewing espresso"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Pillars of Excellence */}
      <section className="bg-[#FAF4ED] py-16 border-y border-[#EFE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
              Our Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
              The Quality Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#D4AF37] flex items-center justify-center text-xl">
                ✨
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D1B16]">Finest Raw Ingredients</h3>
              <p className="text-xs text-[#7A6A5D] leading-relaxed">
                We source real Belgian Callebaut chocolate, French cultured butter, Madagascar bourbon vanilla, and pesticide-free grains.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#D81B60] flex items-center justify-center text-xl">
                ⏳
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D1B16]">Slow Fermentation</h3>
              <p className="text-xs text-[#7A6A5D] leading-relaxed">
                Our sourdough loaves ferment for 28 hours. This makes our breads naturally digestible, gut-friendly, and brimming with rustic flavor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#2E7D32] flex items-center justify-center text-xl">
                🌿
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D1B16]">Zero Artificial Pre-mixes</h3>
              <p className="text-xs text-[#7A6A5D] leading-relaxed">
                No chemical stabilizers, preservatives, or palm oil. What you feed your family is the exact same food we feed our own children.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7DCD3] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] text-[#1976D2] flex items-center justify-center text-xl">
                🧼
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D1B16]">Hospital-Grade Hygiene</h3>
              <p className="text-xs text-[#7A6A5D] leading-relaxed">
                Our kitchen follows strict temperature controls, sanitized stainless-steel workspaces, and daily audits with FSSAI compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Meet The Bakers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9C7A5B]">
            Crafted By Masters
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D1B16]">
            Meet Our Pastry Chefs
          </h2>
          <p className="text-sm text-[#7A6A5D]">
            The passionate team behind every chocolate rosette and golden bread loaf.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-[#E7DCD3] p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full bg-[#FAF4ED] overflow-hidden mx-auto border-2 border-[#D4AF37]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                alt="Executive Pastry Chef"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D1B16]">Chef K. Ramesh</h4>
              <p className="text-xs text-[#D81B60] font-semibold">Head Pastry & Cake Artist</p>
            </div>
            <p className="text-xs text-[#7A6A5D]">
              Trained in classical French patisserie with over 14 years of experience sculpting tiered celebration cakes and intricate chocolate decor.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DCD3] p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full bg-[#FAF4ED] overflow-hidden mx-auto border-2 border-[#D4AF37]">
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80"
                alt="Master Artisan Baker"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D1B16]">Siddharth Murthy</h4>
              <p className="text-xs text-[#C59B27] font-semibold">Master Artisan Baker</p>
            </div>
            <p className="text-xs text-[#7A6A5D]">
              The sourdough maestro who nurtured our 5-year-old sourdough mother starter. Passionate about slow fermentation and heritage grains.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DCD3] p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full bg-[#FAF4ED] overflow-hidden mx-auto border-2 border-[#D4AF37]">
              <img
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=400&q=80"
                alt="Hospitality and Quality Manager"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D1B16]">Meera Swaminathan</h4>
              <p className="text-xs text-[#5C381E] font-semibold">Quality & Hospitality Lead</p>
            </div>
            <p className="text-xs text-[#7A6A5D]">
              Ensuring every guest is welcomed with warmth and every order delivered with hospital-grade sanitization and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Visit Us CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B16] text-[#FAF6F0] rounded-3xl p-8 sm:p-12 text-center space-y-5 border-2 border-[#D4AF37]/40 shadow-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Taste The Bread Basket Experience
          </h2>
          <p className="text-sm text-[#D7CCC8] max-w-lg mx-auto">
            Whether you want a warm croissant with your morning latte or a custom cake for your anniversary, we are honored to serve you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/menu"
              className="px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#C59B27] text-[#2D1B16] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Order Online Now
            </Link>
            <Link
              to="/reservation"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
