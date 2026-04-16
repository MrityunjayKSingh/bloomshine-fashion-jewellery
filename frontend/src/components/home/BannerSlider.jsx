import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BANNER_SLIDES = [
  {
    id: 1,
    image: '/rang1.png',
    title: 'Best Imitation',
    titleHighlight: 'Necklace Set',
    description: '',
    stats: [
      { num: '500+', label: 'Happy Customers' },
    ]
  },
  {
    id: 2,
    image: '/rang2.png',
    title: 'Best Imitation',
    titleHighlight: 'Necklace Set',
    description: '',
    stats: [
      { num: '50+', label: 'Products' },
    ]
  },
  {
    id: 3,
    image: '/rang3.png',
   title: 'Best Imitation',
    titleHighlight: 'Necklace Set',
    description: '',
    stats: [
      { num: '4.9★', label: 'Rating' },
    ]
  }
]

export default function BannerSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % BANNER_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const slide = BANNER_SLIDES[current]

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {BANNER_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${s.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            {/*<div className="absolute inset-0 bg-black/40" />*/}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-screen flex flex-col justify-between">
        {/* Main Content */}
        <div className="flex-1 flex items-center px-8 md:px-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-widest uppercase text-cream mb-8 w-fit"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-sand" />
              Best Imitation Jewellery Sets
            </div>
            <h1 className="font-display font-light leading-[1.08] mb-7 text-cream" style={{ fontSize: 'clamp(52px,6vw,80px)' }}>
              {slide.title}<br /><em className="italic text-sand">{slide.titleHighlight}</em>
            </h1>
            <p className="text-sm leading-relaxed mb-12 max-w-md text-cream/90">
              {slide.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/products" className="bg-sand text-bark text-xs tracking-widest uppercase px-9 py-4 transition-all hover:bg-cream hover:-translate-y-0.5">
                Shop Products
              </Link>
              <Link to="/categories" className="bg-sand text-bark text-xs tracking-widest uppercase px-9 py-4 transition-all hover:bg-cream hover:-translate-y-0.5">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-16 px-8 md:px-20 py-12 border-t border-white/20">
          {slide.stats.map((stat, i) => (
            <div key={i} className="flex-1">
              <div className="font-display text-2xl md:text-3xl font-semibold text-cream">{stat.num}</div>
              <div className="text-[11px] tracking-widest uppercase text-cream/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-8 right-8 md:left-20 md:right-20 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2">
          {BANNER_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                setAutoplay(false)
              }}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className={`h-1 transition-all ${i === current ? 'bg-cream w-8' : 'bg-cream/40 w-2'}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-cream text-xs tracking-widest uppercase">
          {String(current + 1).padStart(2, '0')} / {String(BANNER_SLIDES.length).padStart(2, '0')}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 text-cream hover:text-sand transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrent(prev => (prev + 1) % BANNER_SLIDES.length)}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 text-cream hover:text-sand transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
