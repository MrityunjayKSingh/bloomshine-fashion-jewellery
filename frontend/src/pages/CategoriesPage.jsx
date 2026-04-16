import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryApi } from '../services/api'
import CategoryCard from '../components/category/CategoryCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    categoryApi.getAll()
      .then(res => setCategories(res.data.data || []))
      .catch(() => setError('Failed to load categories'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter min-h-screen">
      {/* Hero */}
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Categories</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">
            All <em className="italic text-terracotta">Categories</em>
          </h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">
            Explore our stunning collection of imitation jewellery organized by style and occasion.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
        {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} onRetry={() => window.location.reload()} /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
