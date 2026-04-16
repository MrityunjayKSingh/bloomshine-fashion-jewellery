import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { categoryApi, productApi } from '../services/api'
import CategoryCard from '../components/category/CategoryCard'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import BannerSlider from '../components/home/BannerSlider'

const MARQUEE_ITEMS = ['Premium Quality Alloy', 'Skin-Friendly Materials', 'Anti-Tarnish Finish', 'Lightweight Design', 'Elegant Craftsmanship', 'Nickel & Lead Free', 'Made in India', 'Trendy Fashion Jewelry']

function FadeSection({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>
}

export default function HomePage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([categoryApi.getAll(), productApi.getAll({ per_page: 6 })])
      .then(([catRes, prodRes]) => {
        setCategories(catRes.data.data || [])
        setProducts((prodRes.data.data || []).slice(0, 6))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-enter">
      {/* BANNER SLIDER */}
      <BannerSlider />

      {/* MARQUEE */}
      <div className="bg-bark text-cream py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-10 text-[11px] tracking-widest uppercase opacity-80">
              <span className="w-1 h-1 rounded-full bg-sand" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-20 px-6 md:px-14 max-w-7xl mx-auto">
        <FadeSection>
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[11px] tracking-widest uppercase text-moss block mb-3">Browse by Need</span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-bark">
                Shop by <em className="italic text-terracotta">Category</em>
              </h2>
            </div>
            <Link to="/categories" className="hidden md:block text-[11px] tracking-widest uppercase text-bark border-b border-bark pb-0.5 hover:text-terracotta hover:border-terracotta transition-colors">
              View All →
            </Link>
          </div>
        </FadeSection>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 md:px-14 max-w-7xl mx-auto">
        <FadeSection>
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[11px] tracking-widest uppercase text-moss block mb-3">Our Collection</span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-bark">
                Featured <em className="italic text-terracotta">Products</em>
              </h2>
            </div>
            <Link to="/products" className="hidden md:block text-[11px] tracking-widest uppercase text-bark border-b border-bark pb-0.5 hover:text-terracotta hover:border-terracotta transition-colors">
              View All →
            </Link>
          </div>
        </FadeSection>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 80} />)}
          </div>
        )}
      </section>


      
    </div>
  )
}
