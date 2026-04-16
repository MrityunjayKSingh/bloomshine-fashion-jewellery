import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productApi } from '../services/api'
import ProductImage from '../components/common/ProductImage'
import WhatsAppButton from '../components/common/WhatsAppButton'
import StarRating from '../components/common/StarRating'
import Badge from '../components/common/Badge'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { formatPrice } from '../utils/format'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'care', label: 'Care & Storage' },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([productApi.getBySlug(slug), productApi.getRelated(slug)])
      .then(([prodRes, relRes]) => {
        setProduct(prodRes.data.data || prodRes.data)
        setRelated(relRes.data.data || [])
      })
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>
  if (error || !product) return <div className="pt-24"><ErrorMessage message={error || 'Product not found'} /></div>

  const savings = product.original_price ? product.original_price - product.price : 0
  const savingsPct = product.original_price ? Math.round((savings / product.original_price) * 100) : 0

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="px-6 md:px-20 py-5 text-sm text-muted tracking-wider border-b border-linen">
        <Link to="/" className="hover:text-bark">Home</Link>
        <span className="mx-2">›</span>
        {product.category && <><Link to={`/categories/${product.category.slug}`} className="hover:text-bark">{product.category.name}</Link><span className="mx-2">›</span></>}
        <span className="text-bark">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid md:grid-cols-2 gap-16 items-start">
        {/* Gallery */}
        <div className="sticky top-24">
          <div 
            className="aspect-[3/4] relative overflow-hidden mb-4 bg-linen cursor-zoom-in"
            style={{ background: 'var(--linen)' }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              setZoomPosition({ x, y })
            }}
          >
            <Badge type={product.badge} />
            {Array.isArray(product.image) && product.image.length > 0 ? (
              <img 
                src={product.image[selectedImageIndex]} 
                alt={product.name} 
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            ) : (
              <ProductImage image={product.image} name={product.name} size="lg" />
            )}
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2" style={{ width: 'fit-content' }}>
              {Array.isArray(product.image) && product.image.length > 0 ? (
                product.image.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 aspect-square w-20 flex items-center justify-center text-2xl cursor-pointer border-2 transition-all hover:scale-105 ${selectedImageIndex === i ? 'border-moss scale-105' : 'border-transparent hover:border-sand'}`}
                    style={{ background: 'var(--cream)' }}>
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                [0,1,2,3].map(i => (
                  <div key={i} className={`flex-shrink-0 aspect-square w-20 flex items-center justify-center text-2xl cursor-pointer border-2 transition-colors ${i === 0 ? 'border-moss' : 'border-transparent hover:border-sand'}`}
                    style={{ background: 'var(--cream)' }}>
                    {product.image?.emoji || '💎'}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4"
            style={{ background: 'rgba(92,107,69,0.1)', color: 'var(--moss)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-moss" />
            {product.category?.name || 'Jewelry'}
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-light text-bark leading-[1.1] mb-2">
            {product.name}
          </h1>
          {product.short_description && (
            <p className="text-base text-muted mb-4">{product.short_description}</p>
          )}

         {/* <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} count={product.review_count} size="md" />
            <span className="text-xs text-muted">{product.review_count} reviews</span>
          </div>*/}

          {/* Price */}
          <div className="pb-7 mb-7 border-b border-linen">
            <div className="flex items-baseline gap-3">
              {product.original_price && (
                <span className="font-display text-2xl text-muted line-through font-light">
                  {formatPrice(product.original_price)}
                </span>
              )}
              <span className="font-display text-4xl text-bark font-light">
                {formatPrice(product.price)}
              </span>
              {savingsPct > 0 && (
                <span className="text-xs text-moss bg-moss/10 px-3 py-1 rounded-full">
                  Save {savingsPct}%
                </span>
              )}
            </div>
            <p className="text-sm text-muted mt-2">Inclusive of all taxes · Shipping Charges Extra</p>
          </div>

          {/* Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs tracking-widest uppercase bg-linen text-soil px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Qty + WhatsApp CTA */}
          <div className="flex gap-3 items-center mb-4">
            <div className="flex items-center border border-linen">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-12 text-xl text-bark hover:bg-linen transition-colors">−</button>
              <span className="w-10 text-center text-base text-bark">{qty}</span>
              <button onClick={() => setQty(q => Math.min(10, q + 1))}
                className="w-10 h-12 text-xl text-bark hover:bg-linen transition-colors">+</button>
            </div>
            <WhatsAppButton product={product} quantity={qty} className="flex-1" />
          </div>

          

          

       
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 pb-20">
        <div className="flex border-b border-linen overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-7 py-4 text-sm tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeTab === tab.id ? 'text-bark border-terracotta font-medium' : 'text-muted border-transparent hover:text-bark'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === 'overview' && (
            <div className="max-w-3xl">
              <h3 className="font-display text-3xl font-normal mb-4">About this piece</h3>
              {product.description ? (
                product.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base text-soil leading-relaxed mb-4">{para}</p>
                ))
              ) : (
                <p className="text-base text-soil leading-relaxed">Exquisitely crafted imitation jewellery piece made with premium materials and meticulous attention to detail.</p>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div>
              <h3 className="font-display text-3xl font-normal mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const details = typeof product.details === 'string' 
                    ? JSON.parse(product.details) 
                    : product.details;
                  return details && Object.entries(details).length > 0 ? (
                    Object.entries(details).map(([key, value], i) => (
                      <div key={i} className="bg-cream p-6">
                        <div className="text-2xl mb-3">{['💎', '✨', '👑'][i % 3]}</div>
                        <div className="text-base font-medium text-bark mb-2">{key}</div>
                        <p className="text-sm text-muted leading-relaxed">{value}</p>
                      </div>
                    ))
                  ) : (
                    <div className="md:col-span-3 bg-cream p-6">
                      <p className="text-base text-muted">No additional details available.</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl">
              <h3 className="font-display text-3xl font-normal mb-4">Care & Storage Instructions</h3>
              {(() => {
                const instructions = typeof product.care_instructions === 'string' 
                  ? JSON.parse(product.care_instructions) 
                  : product.care_instructions;
                return Array.isArray(instructions) && instructions.length > 0 ? (
                  <div className="space-y-3">
                    {instructions.map((instruction, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-terracotta font-medium flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-terracotta/10 text-xs">
                          {i + 1}
                        </span>
                        <p className="text-base text-soil leading-relaxed mt-0.5">{instruction}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-base text-soil leading-relaxed">To maintain the sparkle and shine of your jewellery, please follow these care guidelines:</p>
                    <p className="text-base text-soil leading-relaxed">• Avoid prolonged exposure to water, perfumes, and harsh chemicals</p>
                    <p className="text-base text-soil leading-relaxed">• Clean gently with a soft, dry cloth</p>
                    <p className="text-base text-soil leading-relaxed">• Store in a cool, dry place away from direct sunlight and moisture</p>
                    <p className="text-base text-soil leading-relaxed">• Keep in the original box or a dedicated jewellery pouch to prevent scratches</p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-20 pb-20 border-t border-linen pt-14">
          <h2 className="font-display text-3xl font-light text-bark mb-8">
            You might also <em className="italic text-moss">love</em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 80} />)}
          </div>
        </div>
      )}
    </div>
  )
}
