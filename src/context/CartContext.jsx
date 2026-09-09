import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'bread_basket_cart_v1';
const COUPON_STORAGE_KEY = 'bread_basket_applied_coupon';

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1, selectedWeight = null) => {
    // Generate unique ID based on product ID + weight variant
    const weight = selectedWeight || (product.availableWeights ? product.availableWeights[0] : null);
    const cartItemId = weight ? `${product.id}-${weight}` : product.id;

    // Calculate actual unit price if weight variant exists
    let unitPrice = product.price;
    if (weight && product.weightMultiplier && product.weightMultiplier[weight]) {
      unitPrice = Math.round(product.basePrice * product.weightMultiplier[weight]);
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: unitPrice,
            basePrice: product.basePrice || product.price,
            image: product.image,
            category: product.category,
            isVeg: product.isVeg,
            weight: weight || null,
            quantity: quantity,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}"${weight ? ` (${weight})` : ''} to basket!`, 'success');
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find((item) => item.cartItemId === cartItemId);
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.name}" from basket.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME50') {
      const c = { code: 'WELCOME50', type: 'flat', amount: 50, description: '₹50 OFF on first order' };
      setCoupon(c);
      showToast('Coupon "WELCOME50" applied! You saved ₹50.', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (cleanCode === 'BREAD10') {
      const c = { code: 'BREAD10', type: 'percentage', rate: 0.1, description: '10% OFF on all bakery orders' };
      setCoupon(c);
      showToast('Coupon "BREAD10" applied! 10% discount added.', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (cleanCode === 'VIJAYAWADA') {
      const c = { code: 'VIJAYAWADA', type: 'free_delivery', description: 'Free Express Vijayawada Delivery' };
      setCoupon(c);
      showToast('Coupon "VIJAYAWADA" applied! Free delivery unlocked.', 'success');
      return { success: true, message: 'Free delivery applied!' };
    } else {
      showToast('Invalid coupon code. Try WELCOME50 or BREAD10.', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Delivery calculation: Free if subtotal >= 499 or coupon free_delivery, else ₹40
  let deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40;
  if (coupon && coupon.type === 'free_delivery') {
    deliveryFee = 0;
  }

  // Discount calculation
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'flat') {
      discount = Math.min(coupon.amount, cartSubtotal);
    } else if (coupon.type === 'percentage') {
      discount = Math.round(cartSubtotal * coupon.rate);
    }
  }

  const grandTotal = Math.max(0, cartSubtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        discount,
        grandTotal,
        coupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
