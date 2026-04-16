import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import ProductImage from '../common/ProductImage'
import Badge from '../common/Badge'
import StarRating from '../common/StarRating'
import WhatsAppButton from '../common/WhatsAppButton'
import { formatPrice } from '../../utils/format'

export default function ProductCard({ product, delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="fade-up group bg-cream cursor-pointer relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]">
            <ProductImage image={product.image} name={product.name} size="md" />
          </div>
          <Badge type={product.badge} />

          {/* Quick WhatsApp on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <WhatsAppButton product={product} variant="icon" />
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <StarRating rating={product.rating} count={product.review_count} />
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-display text-lg font-normal text-bark mb-1 hover:text-terracotta transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="text-[11px] text-muted leading-relaxed mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Tags */}
        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] tracking-widest uppercase bg-linen text-soil px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex justify-between items-center">
          <div>
            {product.original_price && (
              <span className="text-[11px] text-muted line-through mr-1.5">
                {formatPrice(product.original_price)}
              </span>
            )}
            <span className="text-sm font-medium text-bark">{formatPrice(product.price)}</span>
          </div>
          <Link
            to={`/products/${product.slug}`}
            className="text-[10px] tracking-widest uppercase text-bark border border-bark px-3 py-1.5 hover:bg-bark hover:text-cream transition-all"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
