import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { adminCategoryApi, adminProductApi } from '../../services/api'

export default function AdminDashboard() {
  const { logout } = useAdmin()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ categories: 0, products: 0, active: 0 })
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    Promise.all([adminCategoryApi.getAll(), adminProductApi.getAll()]).then(([cats, prods]) => {
      const products = prods.data.data || []
      setStats({
        categories: (cats.data.data || []).length,
        products: products.length,
        active: products.filter(p => p.status === 'active').length,
      })
      setRecentProducts(products.slice(0, 5))
    })
  }, [])

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className="min-h-screen" style={{ background: 'var(--warm-white)' }}>
      {/* Admin Nav */}
      <nav className="bg-bark text-cream px-8 py-4 flex justify-between items-center">
        <div className="h-8">
          <img src="/logos.png" alt="BloomShine" className="h-full object-contain" />
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xs tracking-wider text-white/70 hover:text-white">← View Site</Link>
          <button onClick={handleLogout} className="text-xs tracking-widest uppercase text-white/70 hover:text-white">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="font-display text-4xl font-light text-bark mb-2">Dashboard</h1>
        <p className="text-sm text-muted mb-10">Manage your product catalog</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[['Categories', stats.categories, '🏷️'], ['Total Products', stats.products, '📦'], ['Active Products', stats.active, '✅']].map(([label, value, emoji]) => (
            <div key={label} className="bg-cream p-6 border border-linen">
              <div className="text-2xl mb-2">{emoji}</div>
              <div className="font-display text-4xl font-light text-bark">{value}</div>
              <div className="text-xs tracking-widest uppercase text-muted mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <Link to="/admin/categories" className="bg-bark text-cream p-6 hover:bg-soil transition-colors">
            <div className="text-2xl mb-3">🏷️</div>
            <div className="text-sm font-medium mb-1">Manage Categories</div>
            <div className="text-xs text-white/60">Add, edit, or delete categories</div>
          </Link>
          <Link to="/admin/products" className="bg-moss text-cream p-6 hover:bg-sage transition-colors">
            <div className="text-2xl mb-3">📦</div>
            <div className="text-sm font-medium mb-1">Manage Products</div>
            <div className="text-xs text-white/60">Add, edit, or delete products</div>
          </Link>
        </div>

        {/* Recent products */}
        {recentProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-5">Recent Products</h2>
            <div className="border border-linen overflow-hidden">
              {recentProducts.map((p, i) => (
                <div key={p.id} className={`flex items-center justify-between px-6 py-4 ${i < recentProducts.length - 1 ? 'border-b border-linen' : ''}`}>
                  <div>
                    <div className="text-sm font-medium text-bark">{p.name}</div>
                    <div className="text-xs text-muted mt-0.5">{p.category?.name} · ₹{p.price}</div>
                  </div>
                  <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 ${p.status === 'active' ? 'bg-moss/10 text-moss' : 'bg-red-50 text-red-500'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
