import { Link } from 'react-router-dom'

export default function AboutUsPage() {
  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>About Us</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">About <em className="italic text-terracotta">BloomShine</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Elegance, affordability, and timeless beauty in every piece.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="prose prose-sm max-w-none">
          <h2 className="font-display text-3xl font-light text-bark mb-4">Our Story</h2>
          <p className="text-sm text-soil leading-relaxed mb-6">
            BloomShine was founded with a passion for making luxury jewellery accessible to everyone. We believe that everyone deserves to sparkle and shine without compromising on quality or budget.
          </p>

          <h2 className="font-display text-3xl font-light text-bark mb-4 mt-8">Our Vision</h2>
          <p className="text-sm text-soil leading-relaxed mb-6">
            To be the leading imitation jewellery brand known for exceptional craftsmanship, stunning designs, and unbeatable prices. We envision a world where style and elegance are accessible to all, regardless of budget.
          </p>

          <h2 className="font-display text-3xl font-light text-bark mb-4 mt-8">Why Choose Us?</h2>
          <ul className="text-sm text-soil leading-relaxed space-y-3 mb-6">
            <li>✓ Meticulously crafted designs with premium materials</li>
            <li>✓ Affordable luxury that doesn't compromise on quality</li>
            <li>✓ Extensive collections from classic to contemporary</li>
            <li>✓ Durable pieces that last and look stunning</li>
            <li>✓ Transparent pricing and honest craftsmanship</li>
            <li>✓ Fast & reliable delivery with excellent customer service</li>
          </ul>

          <h2 className="font-display text-3xl font-light text-bark mb-4 mt-8">Our Commitment</h2>
          <p className="text-sm text-soil leading-relaxed mb-6">
            We are committed to quality, design innovation, and customer satisfaction. Every piece is carefully inspected to ensure it meets our high standards of beauty and durability. Your sparkle is our pride.
          </p>
        </div>
      </div>
    </div>
  )
}
