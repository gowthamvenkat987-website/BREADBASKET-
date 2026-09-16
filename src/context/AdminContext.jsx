import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  ADMIN_AUTH: 'bread_basket_admin_auth_v1',
  ADMIN_TOKEN: 'bread_basket_admin_token_v1',
};

export const AdminProvider = ({ children }) => {
  const { showToast } = useToast();

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    return isAdminAuthenticated ? { name: 'The Bread Basket Owner', role: 'owner' } : null;
  });

  // Products, Orders, Reservations, Custom Cakes
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

  // Database Reviews State
  const [dbReviews, setDbReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Sync products, orders, reservations, custom cakes to localStorage
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

  // Fetch reviews from SQLite Database via API
  const refreshReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const endpoint = isAdminAuthenticated && adminToken ? '/api/admin/reviews' : '/api/reviews';
      const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};

      const response = await fetch(endpoint, { headers });
      if (response.ok) {
        const data = await response.json();
        if (data && data.reviews) {
          setDbReviews(data.reviews);
          return data.reviews;
        }
      }
      throw new Error('Failed to fetch from API');
    } catch (err) {
      console.warn('Could not fetch from /api/reviews, using fallback:', err);
      // Fallback to initial reviews format if offline or initializing
      setDbReviews(
        INITIAL_REVIEWS.map((r) => ({
          id: r.id,
          customer_name: r.author,
          review_text: r.review,
          rating: r.rating,
          review_date: r.date,
          source: 'Customer Review',
          is_visible: true,
          created_at: new Date().toISOString(),
        }))
      );
    } finally {
      setLoadingReviews(false);
    }
  }, [isAdminAuthenticated, adminToken]);

  useEffect(() => {
    refreshReviews();
  }, [refreshReviews]);

  // Admin Login
  const adminLogin = async ({ username, password, pin }) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, pin }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsAdminAuthenticated(true);
        setAdminToken(data.token);
        setAdminUser(data.user);
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
        showToast('Welcome, Bread Basket Owner! Admin session authenticated.', 'success');
        return { success: true };
      } else {
        showToast(data.error || 'Invalid admin credentials.', 'error');
        return { success: false, error: data.error };
      }
    } catch {
      // Offline fallback: check default credentials
      const valid = (username === 'admin' && password === 'breadbasket123') || pin === '1030';
      if (valid) {
        const fallbackToken = 'breadbasket_admin_secure_token_v1';
        setIsAdminAuthenticated(true);
        setAdminToken(fallbackToken);
        setAdminUser({ name: 'The Bread Basket Owner', role: 'owner' });
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, fallbackToken);
        showToast('Welcome, Bread Basket Owner!', 'success');
        return { success: true };
      } else {
        showToast('Invalid owner credentials. Use admin / breadbasket123 or PIN 1030.', 'error');
        return { success: false, error: 'Invalid credentials' };
      }
    }
  };

  // Admin Logout
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminToken(null);
    setAdminUser(null);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Review Operations via DB API
  const addDbReview = async ({ customer_name, review_text, rating, review_date, is_visible }) => {
    try {
      const endpoint = isAdminAuthenticated && adminToken ? '/api/admin/reviews' : '/api/reviews';
      const headers = {
        'Content-Type': 'application/json',
        ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customer_name,
          review_text,
          rating: rating !== null && rating !== undefined && rating !== '' ? Number(rating) : null,
          review_date: review_date || 'Just now',
          is_visible: is_visible !== undefined ? is_visible : true,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Thank you! Review saved to database.', 'success');
        await refreshReviews();
        return data.review;
      } else {
        throw new Error(data.error || 'Failed to save review');
      }
    } catch (err) {
      console.error('Error adding review to DB:', err);
      showToast('Error saving review to database. Please try again.', 'error');
      throw err;
    }
  };

  const toggleReviewVisibility = async (id, newVisibility) => {
    try {
      const response = await fetch(`/api/admin/reviews/${id}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ is_visible: newVisibility }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast(`Review is now ${newVisibility ? 'visible on site' : 'hidden from site'}`, 'info');
        await refreshReviews();
        return data.review;
      } else {
        throw new Error(data.error || 'Failed to toggle visibility');
      }
    } catch (err) {
      console.error('Error toggling visibility:', err);
      showToast('Failed to update review visibility', 'error');
    }
  };

  const deleteDbReview = async (id) => {
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Review permanently deleted from database.', 'info');
        await refreshReviews();
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      showToast('Failed to delete review', 'error');
    }
  };

  // Backwards compatibility helper for existing legacy reviews
  const reviews = dbReviews.map((r) => ({
    id: r.id,
    author: r.customer_name,
    customer_name: r.customer_name,
    review: r.review_text,
    review_text: r.review_text,
    rating: r.rating,
    date: r.review_date,
    review_date: r.review_date,
    source: r.source || 'Customer Review',
    is_visible: r.is_visible,
    created_at: r.created_at,
    verified: true,
  }));

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

  // Add review facade
  const addReview = (reviewData) => {
    return addDbReview({
      customer_name: reviewData.author || reviewData.customer_name,
      review_text: reviewData.review || reviewData.review_text,
      rating: reviewData.rating,
      review_date: reviewData.date || reviewData.review_date || 'Just now',
    });
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReservations(INITIAL_RESERVATIONS);
    setCustomCakes(INITIAL_CUSTOM_CAKES);
    refreshReviews();
    showToast('Reset data to initial sample data.', 'info');
  };

  return (
    <AdminContext.Provider
      value={{
        // Auth
        isAdminAuthenticated,
        adminUser,
        adminToken,
        adminLogin,
        adminLogout,
        // Reviews DB
        dbReviews,
        reviews,
        loadingReviews,
        refreshReviews,
        addDbReview,
        toggleReviewVisibility,
        deleteDbReview,
        // Orders & Products
        products,
        orders,
        reservations,
        customCakes,
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
