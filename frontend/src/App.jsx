import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AdminProvider, useAdmin } from './context/AdminContext'
import Layout from './components/layout/Layout'

// Public Pages
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CategoryPage from './pages/CategoryPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutUsPage from './pages/AboutUsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import DisclaimerPage from './pages/DisclaimerPage'
import ContactUsPage from './pages/ContactUsPage'
import ReturnsPage from './pages/ReturnsPage'
import FAQsPage from './pages/FAQsPage'
import BulkOrderPage from './pages/BulkOrderPage'

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/products/:slug" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
          <Route path="/categories/:slug" element={<Layout><CategoryPage /></Layout>} />
          
          {/* Static pages */}
          <Route path="/about" element={<Layout><AboutUsPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsConditionsPage /></Layout>} />
          <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactUsPage /></Layout>} />
          <Route path="/returns" element={<Layout><ReturnsPage /></Layout>} />
          <Route path="/faqs" element={<Layout><FAQsPage /></Layout>} />
          <Route path="/bulk-order" element={<Layout><BulkOrderPage /></Layout>} />

          {/* Admin routes (no public layout) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminCategoriesPage /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}
