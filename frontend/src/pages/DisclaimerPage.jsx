import { Link } from 'react-router-dom'

export default function DisclaimerPage() {
  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Disclaimer</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3"><em className="italic text-terracotta">Disclaimer</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Important information about our imitation jewellery products and care.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="prose prose-sm max-w-none space-y-6">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">About Our Jewellery</h2>
            <p className="text-sm text-soil leading-relaxed bg-amber-50 p-4 border-l-4 border-terracotta">
              Our jewellery is made from imitation materials including brass, alloys, crystals, and stones. These are not precious metals or genuine gemstones. Our pieces are designed to be beautiful, affordable, and fashionable alternatives to fine jewellery. Please review the product details for specific material composition.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Care and Maintenance</h2>
            <p className="text-sm text-soil leading-relaxed">
              While our jewellery is durable and of high quality, imitation materials require proper care. Avoid exposure to water, perfume, and harsh chemicals. Store in a dry place. Clean gently with a soft cloth. Improper care may affect appearance or longevity.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Color and Photo Disclaimer</h2>
            <p className="text-sm text-soil leading-relaxed">
              Product photographs are as accurate as possible, but colors may appear different due to display settings and lighting conditions. We cannot guarantee exact color match across all devices. Slight variations are normal in handcrafted pieces.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Skin Sensitivity</h2>
            <p className="text-sm text-soil leading-relaxed">
              Some individuals may have sensitivity to certain metals or materials. If you experience skin irritation, stop wearing the piece and consult a dermatologist. Our jewellery is not hypoallergenic unless specifically noted.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Limitation of Liability</h2>
            <p className="text-sm text-soil leading-relaxed">
              BloomShine shall not be liable for any damages resulting from wear, misuse, improper care, or normal wear and tear of our jewellery products. Our liability is limited to the purchase price of the item.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
