import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');
const SITE_SLUG = 'vigo';

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

// In-memory cache: stores { data, expiresAt } per cache key
const cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const cached = async (key, fetcher) => {
  const now = Date.now();
  if (cache[key] && cache[key].expiresAt > now) {
    return cache[key].data;
  }
  const data = await fetcher();
  cache[key] = { data, expiresAt: now + CACHE_TTL };
  return data;
};

export const clearCache = (key) => {
  if (key) delete cache[key];
  else Object.keys(cache).forEach((k) => delete cache[k]);
};

// Sites
export const getSites = () =>
  cached('sites', () => api.get('/sites').then((r) => r.data));

export const getSite = (slug = SITE_SLUG) =>
  cached(`site:${slug}`, () => api.get(`/${slug}`).then((r) => r.data));

// Home Banner
export const getHomeBanner = (slug = SITE_SLUG) =>
  cached(`home-banner:${slug}`, () => api.get(`/${slug}/home-banner`).then((r) => r.data));

// Festival Offers
export const getFestivalOffer = (slug = SITE_SLUG) =>
  cached(`festival-offer:${slug}`, () => api.get(`/${slug}/festival-offer`).then((r) => r.data));

// Categories
export const getCategories = (slug = SITE_SLUG) =>
  cached(`categories:${slug}`, () => api.get(`/${slug}/categories`).then((r) => r.data));

// Products
export const getProducts = (filters = {}, slug = SITE_SLUG) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.per_page) params.append('per_page', filters.per_page);
  const qs = params.toString();
  return cached(`products:${slug}:${qs}`, () =>
    api.get(`/${slug}/products?${qs}`).then((r) => r.data)
  );
};

export const getProduct = (slug, productSlug = '') =>
  cached(`product:${slug}:${productSlug}`, () =>
    api.get(`/${slug}/products/${productSlug}`).then((r) => r.data)
  );

export const getCategoryProducts = (slug = SITE_SLUG, categorySlug = '', filters = {}) => {
  const params = new URLSearchParams();
  if (filters.per_page) params.append('per_page', filters.per_page);
  const qs = params.toString();
  return cached(`cat-products:${slug}:${categorySlug}:${qs}`, () =>
    api.get(`/${slug}/categories/${categorySlug}/products?${qs}`).then((r) => r.data)
  );
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
export const getContact = (slug = SITE_SLUG) =>
  cached(`contact:${slug}`, () => api.get(`/${slug}/contact`).then((r) => r.data));

// Content Pages
export const getContentPages = (slug = SITE_SLUG) =>
  cached(`content:${slug}`, () => api.get(`/${slug}/content`).then((r) => r.data));

export const getContentPage = (slug = SITE_SLUG, key = '') =>
  cached(`content:${slug}:${key}`, () =>
    api.get(`/${slug}/content/${key}`).then((r) => r.data)
  );

// Client Logos
export const getClientLogos = (slug = SITE_SLUG) =>
  cached(`client-logos:${slug}`, () => api.get(`/${slug}/client-logos`).then((r) => r.data));

// Order Steps
export const getOrderSteps = (slug = SITE_SLUG) =>
  cached(`order-steps:${slug}`, () => api.get(`/${slug}/order-steps`).then((r) => r.data));

// Safety Tips
export const getSafetyTips = (slug = SITE_SLUG) =>
  cached(`safety-tips:${slug}`, () => api.get(`/${slug}/safety-tips`).then((r) => r.data));

// Price Lists
export const getPriceLists = (slug = SITE_SLUG) =>
  cached(`price-lists:${slug}`, () => api.get(`/${slug}/price-lists`).then((r) => r.data));

export default api;
