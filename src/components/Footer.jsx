import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Star, 
  Heart, 
  ArrowRight, 
  MessageCircle 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Welcome to The Bread Basket VIP Club! 10% coupon sent to your inbox.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#211410] text-[#E7DCD3] pt-16 pb-10 border-t-4 border-[#D4AF37]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3E2723] flex items-center justify-center text-2xl border-2 border-[#D4AF37]">
                🥐
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                  THE BREAD BASKET
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Vijayawada • Since 2018
                </p>
              </div>
            </div>

            <p className="text-sm text-[#BFB3A8] leading-relaxed">
              Vijayawada's premier artisanal bakery crafting oven-fresh sourdoughs, European pastries, celebration cakes, and cafe delights every single morning with genuine European butter and passion.
            </p>

            {/* Google Rating Badge */}
            <div className="bg-[#2D1B16] border border-[#D4AF37]/30 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span className="font-extrabold text-white text-base">4.3</span>
                  <span className="text-xs text-[#A8988B]">/ 5.0</span>
                </div>
                <p className="text-xs text-[#A8988B] mt-0.5">Based on 960+ Google Reviews</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#E5C07B] px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                  Top Rated
                </span>
                <p className="text-[11px] text-[#A8988B] mt-1">₹200–₹400 / person</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              Explore Our Treats
            </h4>
            <ul className="space-y-2.5 text-sm text-[#BFB3A8]">
              <li>
                <Link to="/menu" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" /> Full Bakery Menu
                </Link>
              </li>
              <li>
                <Link to="/custom-cake" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#F48FB1] font-semibold">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F48FB1]" /> Custom Celebration Cakes
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" /> Reserve a Cafe Table
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" /> Our Baking Story
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" /> Customer Reviews (960+)
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#8D7B68]">
                  <ArrowRight className="w-3.5 h-3.5" /> Bakery Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              Visit The Bakery
            </h4>
            <div className="space-y-3.5 text-sm text-[#BFB3A8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="leading-snug">
                  5th, 57-10-1A, New P&T Colony, Lane, Panta Kaluva Road, Vijayawada, Andhra Pradesh 520008
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="tel:07995435555" className="hover:text-white font-medium">
                  079954 35555
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday – Sunday</p>
                  <p className="text-xs text-[#A8988B]">8:00 AM – 10:30 PM (Daily Fresh Batches)</p>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:07995435555"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3E2723] hover:bg-[#4E342E] text-xs font-bold text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Call Bakery
                </a>
                <a
                  href="https://wa.me/917995435555?text=Hello%20The%20Bread%20Basket,%20I%20would%20like%20to%20place%20an%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B5E20] hover:bg-[#2E7D32] text-xs font-bold text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-green-300" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* VIP Club & Socials */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D4AF37] pl-2.5">
              Bakery VIP Circle
            </h4>
            <p className="text-sm text-[#BFB3A8] mb-4">
              Get secret tasting invites, special birthday cake discounts, and fresh batch alerts right to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#2D1B16] border border-[#4A2E18] text-white text-sm placeholder-[#7E6E60] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#D4AF37] hover:from-[#B3891E] hover:to-[#C59B27] text-[#2D1B16] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Join VIP Club & Get 10% Off
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-[#8D7B68] font-medium">Follow our bakery:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2D1B16] hover:bg-[#D81B60] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2D1B16] hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D7B68]">
          <p>
            © {new Date().getFullYear()} The Bread Basket Vijayawada. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[#A8988B]">
            Baking with <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" /> for Vijayawada food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
