import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Cake 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll for subtle navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Custom Cakes', path: '/custom-cake', highlight: true },
    { name: 'Reservations', path: '/reservation' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#2D1B16] text-[#F5EFEB] py-1.5 px-4 text-xs font-medium border-b border-[#3E2723]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-[#2D1B16]">
              VIJAYAWADA
            </span>
            <span className="hidden md:inline text-white/70">•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Freshly Baked Batches Daily from 8:00 AM • Panta Kaluva Road
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-white/80">
            <span className="hidden lg:flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D4AF37]" /> Open until 10:30 PM
            </span>
            <a
              href="tel:07995435555"
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-semibold text-white">079954 35555</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-[#FFFDF9]/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-[#E7DCD3] shadow-md py-2.5' : 'border-[#EFE5DC] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#2D1B16] to-[#4A2E18] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-[#D4AF37]/50">
              <span className="text-xl">🥐</span>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#2D1B16] leading-none">
                THE BREAD BASKET
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8D7B68] mt-0.5">
                Vijayawada • Bakery & Cakes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2D1B16] text-[#FAF6F0] shadow-sm'
                      : link.highlight
                      ? 'text-[#C2185B] bg-[#FCE4EC] hover:bg-[#F8BBD0] font-semibold'
                      : 'text-[#4A3B32] hover:text-[#2D1B16] hover:bg-[#F5EFEB]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin shortcut */}
            <Link
              to="/admin"
              className="p-2 text-[#6D5D53] hover:text-[#2D1B16] hover:bg-[#F5EFEB] rounded-full transition-colors relative"
              title="Bakery Admin Dashboard"
            >
              <ShieldCheck className="w-5 h-5 text-[#8D7B68]" />
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#FAF4ED] hover:bg-[#F3E8DC] text-[#2D1B16] border border-[#E7DCD3] transition-all duration-200 group"
              aria-label="Shopping Basket"
            >
              <ShoppingBag className="w-5 h-5 text-[#2D1B16] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#D81B60] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Quick Order Now Button */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs md:text-sm font-bold bg-[#2D1B16] text-[#FAF6F0] hover:bg-[#4A2E18] shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border border-[#D4AF37]/30"
            >
              Order Online
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2D1B16] hover:bg-[#F5EFEB] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[96px] bg-[#FFFDF9] border-b border-[#E7DCD3] shadow-2xl px-6 py-6 transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#2D1B16] text-white'
                      : link.highlight
                      ? 'bg-[#FCE4EC] text-[#C2185B]'
                      : 'text-[#4A3B32] hover:bg-[#FAF4ED]'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="text-xs bg-[#D81B60] text-white px-2 py-0.5 rounded-full font-bold">
                    Custom 🎂
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-[#8D7B68] hover:bg-[#FAF4ED]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </Link>

            <div className="pt-4 mt-2 border-t border-[#EFE5DC] flex flex-col gap-3">
              <Link
                to="/menu"
                className="w-full text-center py-3 rounded-xl font-bold bg-[#2D1B16] text-white shadow-md hover:bg-[#4A2E18]"
              >
                Order Online Now
              </Link>
              <div className="bg-[#FAF4ED] p-3 rounded-xl text-xs text-[#6D5D53] flex flex-col gap-1.5">
                <div className="flex items-center gap-2 font-bold text-[#2D1B16]">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Panta Kaluva Road, Vijayawada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <a href="tel:07995435555" className="font-semibold text-[#2D1B16]">079954 35555</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
