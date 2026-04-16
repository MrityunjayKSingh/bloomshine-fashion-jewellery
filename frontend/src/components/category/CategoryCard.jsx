import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const CATEGORY_COLORS = [
  'linear-gradient(145deg,#D4E8D4,#8FB88A)',
  'linear-gradient(145deg,#EDE3D3,#D6C1A0)',
  'linear-gradient(145deg,#DCE4D4,#A3B88C)',
  'linear-gradient(145deg,#F5E8D8,#E0B88A)',
  'linear-gradient(145deg,#E4DFF0,#B8A9D8)',
  'linear-gradient(145deg,#D8EAD3,#9AC48A)',
  'linear-gradient(145deg,#D8E8F0,#90B8D0)',
  'linear-gradient(145deg,#F5E0E8,#E8A8B8)',
]

export default function CategoryCard({ category, index = 0 }) {
  const ref = useRef(null)
  const bg = CATEGORY_COLORS[index % CATEGORY_COLORS.length]

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
    <Link
      to={`/categories/${category.slug}`}
      ref={ref}
      className="fade-up group block relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-square flex flex-col items-center justify-center relative overflow-hidden bg-linen">
        {category.image && (category.image.startsWith('http') || category.image.startsWith('/storage')) ? (
          <>
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay from transparent to dark at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-all duration-300" />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: bg }} />
            <span className="relative text-5xl transition-transform duration-300 group-hover:scale-110 z-10">
              {category.image || '💎'}
            </span>
          </>
        )}
        
        {/* Text content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center justify-center z-20 bg-gradient-to-t from-black/70 to-black/30">
          <h3 className="font-display text-lg md:text-xl font-normal text-cream text-center leading-tight tracking-wide">
            {category.name}
          </h3>
          {category.active_products_count !== undefined && (
            <p className="text-[10px] tracking-widest uppercase text-cream/90 mt-2 font-medium">
              {category.active_products_count} Product{category.active_products_count !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {/* Border on hover */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-sand transition-all duration-300 pointer-events-none z-30" />
      </div>
    </Link>
  )
}
