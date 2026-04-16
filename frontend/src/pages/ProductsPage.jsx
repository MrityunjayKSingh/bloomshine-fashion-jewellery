import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { productApi, categoryApi } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    categoryApi.getAll().then(res => setCategories(res.data.data || []))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    const params = activeCategory ? { category: activeCategory } : {}
    productApi.getAll(params)
      .then(res => setProducts(res.data.data || []))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [activeCategory])

  return (
    <div className="page-enter min-h-screen">
      {/* Page Hero */}
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>All Products</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">
            All <em className="italic text-terracotta">Products</em>
          </h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">
            Explore our stunning collection of imitation jewellery — crafted with elegance, quality, and affordability.
          </p>
        </div>
      </div>

      {/* Shop Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:block px-8 py-10 border-r border-linen sticky top-[72px] h-fit">
          <div className="mb-8">
            <div className="text-[11px] tracking-widest uppercase text-bark font-medium mb-4">Categories</div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSearchParams({})}
                className={`text-left text-[13px] py-2 px-3 transition-colors rounded-sm ${!activeCategory ? 'bg-linen text-bark font-medium' : 'text-soil hover:bg-linen/50'}`}>
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams({ category: cat.slug })}
                  className={`text-left text-[13px] py-2 px-3 transition-colors rounded-sm ${activeCategory === cat.slug ? 'bg-linen text-bark font-medium' : 'text-soil hover:bg-linen/50'}`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="px-6 md:px-12 py-10">
          {/* Mobile category filters */}
          <div className="flex gap-2 flex-wrap mb-6 md:hidden">
            <button onClick={() => setSearchParams({})}
              className={`text-[11px] tracking-wider uppercase px-3 py-1.5 border transition-all ${!activeCategory ? 'bg-bark text-cream border-bark' : 'border-linen text-bark hover:border-moss'}`}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSearchParams({ category: cat.slug })}
                className={`text-[11px] tracking-wider uppercase px-3 py-1.5 border transition-all ${activeCategory === cat.slug ? 'bg-bark text-cream border-bark' : 'border-linen text-bark hover:border-moss'}`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex justify-between items-center mb-8 pb-5 border-b border-linen">
            <p className="text-[13px] text-muted">
              Showing <strong className="text-bark">{products.length}</strong> products
              {activeCategory && <span> in <strong className="text-bark">{categories.find(c => c.slug === activeCategory)?.name}</strong></span>}
            </p>
          </div>

          {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} onRetry={() => window.location.reload()} /> : products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">💎</div>
              <p className="font-display text-2xl text-bark mb-2">No products found</p>
              <p className="text-sm text-muted">Try selecting a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
