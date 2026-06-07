import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');
const SITE_SLUG = 'vigovigo';

export const resolveAssetUrl = (path) => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sites
export const getSites = async () => {
  try {
    const response = await api.get('/sites');
    return response.data;
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw error;
  }
};

export const getSite = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching site:', error);
    throw error;
  }
};

// Home Banner
export const getHomeBanner = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/home-banner`);
    return response.data;
  } catch (error) {
    console.error('Error fetching home banner:', error);
    throw error;
  }
};

// Categories
export const getCategories = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Products
export const getProducts = async (filters = {}, slug = SITE_SLUG) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.per_page) params.append('per_page', filters.per_page);

    const response = await api.get(`/${slug}/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (slug, productSlug = '') => {
  try {
    const response = await api.get(`/${slug}/products/${productSlug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getCategoryProducts = async (slug = SITE_SLUG, categorySlug = '', filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.per_page) params.append('per_page', filters.per_page);

    const response = await api.get(
      `/${slug}/categories/${categorySlug}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

// Orders
export const placeOrder = async (orderData, slug = SITE_SLUG) => {
  try {
    const response = await api.post(`/${slug}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const trackOrders = async (filters = {}, slug = SITE_SLUG) => {
  try {
    const params = new URLSearchParams();
    if (filters.order_number) params.append('order_number', filters.order_number);
    if (filters.customer_email) params.append('customer_email', filters.customer_email);
    if (filters.customer_phone) params.append('customer_phone', filters.customer_phone);

    const response = await api.get(`/${slug}/orders/track?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error tracking orders:', error);
    throw error;
  }
};

export const getOrder = async (slug = SITE_SLUG, orderNumber = '') => {
  try {
    const response = await api.get(`/${slug}/orders/${orderNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Contact Info
export const getContact = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/contact`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    throw error;
  }
};

// Content Pages
export const getContentPages = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content pages:', error);
    throw error;
  }
};

export const getContentPage = async (slug = SITE_SLUG, key = '') => {
  try {
    const response = await api.get(`/${slug}/content/${key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content page:', error);
    throw error;
  }
};

// Client Logos
export const getClientLogos = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/client-logos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client logos:', error);
    throw error;
  }
};

// Order Steps
export const getOrderSteps = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/order-steps`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order steps:', error);
    throw error;
  }
};

// Safety Tips
export const getSafetyTips = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/safety-tips`);
    return response.data;
  } catch (error) {
    console.error('Error fetching safety tips:', error);
    throw error;
  }
};

// Price Lists
export const getPriceLists = async (slug = SITE_SLUG) => {
  try {
    const response = await api.get(`/${slug}/price-lists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching price lists:', error);
    throw error;
  }
};

export default api;
