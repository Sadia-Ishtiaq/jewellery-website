/* ============================================================
   SADIA'S COLLECTION — API Client & Auth Management
   ============================================================ */

const API_BASE = '/api';

const API = {
  // Token & User Management
  getToken: () => localStorage.getItem('sadias_token'),
  setToken: (token) => localStorage.setItem('sadias_token', token),
  removeToken: () => {
    localStorage.removeItem('sadias_token');
    localStorage.removeItem('sadias_user');
  },

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem('sadias_user'));
    } catch (e) {
      return null;
    }
  },

  setUser: (user) => localStorage.setItem('sadias_user', JSON.stringify(user)),

  // Generic Request Helper
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getToken();

    const headers = options.headers || {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.warn(`[API Warning] Request to ${endpoint} failed:`, error.message);
      throw error;
    }
  },

  // Auth Endpoints
  async register(userData) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.user && res.user.token) {
      this.setToken(res.user.token);
      this.setUser(res.user);
    }
    return res;
  },

  async login(email, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.user && res.user.token) {
      this.setToken(res.user.token);
      this.setUser(res.user);
    }
    return res;
  },

  logout() {
    this.removeToken();
  },

  async getMe() {
    return await this.request('/auth/me');
  },

  // Products Endpoints
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/products?${query}`);
  },

  async getProductById(id) {
    return await this.request(`/products/${id}`);
  },

  async saveProduct(formData, productId = null) {
    const method = productId ? 'PUT' : 'POST';
    const endpoint = productId ? `/products/${productId}` : '/products';
    return await this.request(endpoint, {
      method,
      body: formData
    });
  },

  async deleteProduct(productId) {
    return await this.request(`/products/${productId}`, {
      method: 'DELETE'
    });
  },

  // Orders Endpoints
  async createOrder(orderData) {
    return await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async verifySafepayPayment(orderId, trackerToken) {
    return await this.request('/orders/safepay/verify', {
      method: 'POST',
      body: JSON.stringify({ orderId, trackerToken })
    });
  },

  async getMyOrders() {
    return await this.request('/orders/myorders');
  },

  async getAdminOrders() {
    return await this.request('/orders');
  },

  async updateOrderStatus(orderId, status) {
    return await this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Contact Endpoint
  async sendContact(contactData) {
    return await this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  }
};

window.API = API;
