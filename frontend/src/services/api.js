import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

// Auth token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Don't set Content-Type for FormData; let the browser set it
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

// Response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// ─── Category API ───────────────────────────────────────────
export const categoryApi = {
  getAll: ()               => api.get('/categories'),
  getBySlug: (slug)        => api.get(`/categories/${slug}`),
  getProducts: (slug)      => api.get(`/categories/${slug}/products`),
}

// ─── Product API ────────────────────────────────────────────
export const productApi = {
  getAll: (params)         => api.get('/products', { params }),
  getBySlug: (slug)        => api.get(`/products/${slug}`),
  getRelated: (slug)       => api.get(`/products/${slug}/related`),
}

// ─── Admin Auth ─────────────────────────────────────────────
export const authApi = {
  login: (credentials)     => api.post('/admin/login', credentials),
}

// ─── Admin Category API ─────────────────────────────────────
export const adminCategoryApi = {
  getAll: ()               => api.get('/admin/categories'),
  create: (data)           => api.post('/admin/categories', data),
  update: (id, data)       => api.put(`/admin/categories/${id}`, data),
  delete: (id)             => api.delete(`/admin/categories/${id}`),
}

// ─── Admin Product API ──────────────────────────────────────
export const adminProductApi = {
  getAll: ()               => api.get('/admin/products'),
  create: (data)           => api.post('/admin/products', data),
  update: (id, data)       => api.put(`/admin/products/${id}`, data),
  delete: (id)             => api.delete(`/admin/products/${id}`),
}

// ─── Form Submissions ────────────────────────────────────────
export const formApi = {
  submitContact: (data)    => api.post('/contact', data),
  submitBulkOrder: (data)  => api.post('/bulk-order', data),
}

export default api
