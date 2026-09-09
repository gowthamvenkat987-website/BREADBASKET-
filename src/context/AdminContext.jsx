import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_ORDERS, INITIAL_RESERVATIONS, INITIAL_CUSTOM_CAKES } from '../data/initialAdminData';
import { INITIAL_REVIEWS } from '../data/reviews';
import { useToast } from './ToastContext';

const AdminContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'bread_basket_products_v1',
  ORDERS: 'bread_basket_orders_v1',
  RESERVATIONS: 'bread_basket_reservations_v1',
  CUSTOM_CAKES: 'bread_basket_custom_cakes_v1',
  REVIEWS: 'bread_basket_reviews_v1',
};

export const AdminProvider = ({ children }) => {
  const { showToast } = useToast();

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [customCakes, setCustomCakes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAKES);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_CAKES;
    } catch {
      return INITIAL_CUSTOM_CAKES;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAKES, JSON.stringify(customCakes));
  }, [customCakes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Order management
  const addOrder = (orderPayload) => {
    const newOrder = {
      id: `BB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Confirmed',
      ...orderPayload,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    showToast(`Order #${orderId} status changed to ${newStatus}`, 'info');
  };

  // Product management
  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      basePrice: Number(productData.price),
      price: Number(productData.price),
      rating: 5.0,
      reviewsCount: 1,
      isVeg: productData.isVeg ?? true,
      tags: productData.tags || ['New Arrival'],
      ...productData,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to menu!`, 'success');
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              ...updatedData,
              price: Number(updatedData.price || p.price),
              basePrice: Number(updatedData.price || p.basePrice),
            }
          : p
      )
    );
    showToast(`Product updated successfully!`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.', 'info');
  };

  // Reservation management
  const addReservation = (resData) => {
    const newRes = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...resData,
    };
    setReservations((prev) => [newRes, ...prev]);
    return newRes;
  };

  const updateReservationStatus = (resId, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation #${resId} marked as ${newStatus}`, 'info');
  };

  // Custom Cakes management
  const addCustomCake = (cakeData) => {
    const newCake = {
      id: `CC-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Under Review',
      createdAt: new Date().toISOString(),
      ...cakeData,
    };
    setCustomCakes((prev) => [newCake, ...prev]);
    return newCake;
  };

  const updateCustomCakeStatus = (cakeId, newStatus) => {
    setCustomCakes((prev) =>
      prev.map((c) => (c.id === cakeId ? { ...c, status: newStatus } : c))
    );
    showToast(`Custom Cake #${cakeId} status changed to ${newStatus}`, 'info');
  };

  // Review management
  const addReview = (reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
      likes: 0,
      ...reviewData,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you for sharing your review!', 'success');
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReservations(INITIAL_RESERVATIONS);
    setCustomCakes(INITIAL_CUSTOM_CAKES);
    setReviews(INITIAL_REVIEWS);
    showToast('Reset data to initial sample data.', 'info');
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        reservations,
        customCakes,
        reviews,
        addOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addReservation,
        updateReservationStatus,
        addCustomCake,
        updateCustomCakeStatus,
        addReview,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
