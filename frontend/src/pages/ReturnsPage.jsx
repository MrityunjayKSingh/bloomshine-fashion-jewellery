import { Link } from 'react-router-dom'

export default function ReturnsPage() {
  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Returns & Refunds</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Returns & <em className="italic text-terracotta">Refunds</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">We want you to be completely satisfied with your purchase.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="prose prose-sm max-w-none space-y-6">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">30-Day Return Policy</h2>
            <p className="text-sm text-soil leading-relaxed">
              We offer a hassle-free 30-day return policy on all unworn jewellery. If you're not satisfied with your purchase, simply contact us within 30 days of receipt for a full refund or exchange.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Return Eligibility</h2>
            <ul className="text-sm text-soil leading-relaxed space-y-2">
              <li>✓ Jewellery must be unworn and in original condition</li>
              <li>✓ Return request must be made within 30 days of purchase</li>
              <li>✓ All packaging, clasps, and original presentation must be intact</li>
              <li>✓ No visible damage, tarnishing, or wear</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">How to Return</h2>
            <ol className="text-sm text-soil leading-relaxed space-y-2">
              <li>1. Contact us at returns@bloomshine.com with your order number</li>
              <li>2. Provide a reason for the return</li>
              <li>3. We'll provide you with a prepaid return label</li>
              <li>4. Ship the product back to us in original packaging</li>
              <li>5. Once received and verified, we'll process your refund</li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Refund Timeline</h2>
            <p className="text-sm text-soil leading-relaxed">
              Refunds are processed within 7-10 business days after we receive and verify your return. The refund will be credited to your original payment method.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Non-Returnable Items</h2>
            <p className="text-sm text-soil leading-relaxed">
              Worn, damaged, or used jewellery cannot be returned unless the defect existed from the time of purchase. Custom orders and personalized pieces may have different return policies.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">Defective or Damaged Items</h2>
            <p className="text-sm text-soil leading-relaxed">
              If you receive a defective, damaged, or broken piece, please contact us immediately with photos of the damage. We'll arrange a replacement or full refund at no additional cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
