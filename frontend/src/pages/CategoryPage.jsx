import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryApi } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([categoryApi.getBySlug(slug), categoryApi.getProducts(slug)])
      .then(([catRes, prodsRes]) => {
        setCategory(catRes.data.data || catRes.data)
        setProducts(prodsRes.data.data || [])
      })
      .catch(() => setError('Category not found'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>
  if (error) return <div className="pt-24"><ErrorMessage message={error} /></div>

  return (
    <div className="page-enter min-h-screen">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/categories" className="hover:text-bark">Categories</Link>
            <span className="mx-2">›</span>
            <span>{category?.name}</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            {category?.image && (category.image.startsWith('http') || category.image.startsWith('/storage')) ? (
              <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded" />
            ) : (
              <span className="text-5xl">{category?.image || '💎'}</span>
            )}
            <h1 className="font-display text-5xl md:text-6xl font-light text-bark">
              {category?.name}
            </h1>
          </div>
          <p className="text-sm text-muted">{products.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">💎</div>
            <p className="font-display text-2xl text-bark mb-2">No products in this category yet</p>
            <Link to="/products" className="text-xs tracking-widest uppercase text-moss border-b border-moss">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
          </div>
        )}
      </div>
    </div>
  )
}
