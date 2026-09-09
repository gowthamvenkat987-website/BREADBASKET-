import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CustomCakePage from './pages/CustomCakePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ReservationPage from './pages/ReservationPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2D1B16]">
              <Navbar />

              {/* Main content wrapper */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/custom-cake" element={<CustomCakePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/reservation" element={<ReservationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />

                  {/* 404 fallback */}
                  <Route
                    path="*"
                    element={
                      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
                        <div className="text-5xl">🥐</div>
                        <h1 className="font-serif text-3xl font-black text-[#2D1B16]">
                          Page Not Found
                        </h1>
                        <p className="text-sm text-[#7A6A5D]">
                          The page you are looking for seems to have been freshly baked away!
                        </p>
                        <a
                          href="/"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2D1B16] text-white text-xs font-bold uppercase tracking-wider"
                        >
                          Return to Home
                        </a>
                      </div>
                    }
                  />
                </Routes>
              </main>

              <Footer />
              <ToastContainer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AdminProvider>
    </ToastProvider>
  );
}
