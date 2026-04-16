import { Link } from 'react-router-dom'

export default function TermsConditionsPage() {
  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Terms & Conditions</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Terms & <em className="italic text-terracotta">Conditions</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Please read our terms and conditions carefully before using our website.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="prose prose-sm max-w-none space-y-6">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-soil leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms of this agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">2. Use License</h2>
            <p className="text-sm text-soil leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on BloomShine's website for personal, non-commercial transitory viewing only. You may not reproduce, duplicate, copy, sell, resell, or exploit any material for commercial purposes without our explicit permission.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">3. Product Information</h2>
            <p className="text-sm text-soil leading-relaxed">
              All jewellery products are described as accurately as possible. However, colours may vary slightly due to different screen displays. BloomShine makes no warranty that the photographs, descriptions, pricing, or other product information are accurate, complete, or current.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">4. Limitations of Liability</h2>
            <p className="text-sm text-soil leading-relaxed">
              In no event shall BloomShine or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BloomShine's website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">5. Orders and Payment</h2>
            <p className="text-sm text-soil leading-relaxed">
              By placing an order, you agree to provide accurate billing and shipping information. BloomShine reserves the right to refuse any order. Payment must be received in full before shipment. All prices are subject to change without notice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">6. Modifications</h2>
            <p className="text-sm text-soil leading-relaxed">
              BloomShine may revise these terms and conditions for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
