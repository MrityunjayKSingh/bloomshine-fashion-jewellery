import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Privacy Policy</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Privacy <em className="italic text-terracotta">Policy</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Your privacy is important to us. Learn how we protect your data.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="prose prose-sm max-w-none space-y-6">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">1. Information We Collect</h2>
            <p className="text-sm text-soil leading-relaxed">
              We collect information you provide directly, such as name, email, phone number, and shipping address when you place an order or contact us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-soil leading-relaxed">
              Your information is used to process jewellery orders, send order confirmations, arrange delivery, and improve our shopping experience. We never sell your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">3. Data Security</h2>
            <p className="text-sm text-soil leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All transactions are encrypted and secure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">4. Cookies</h2>
            <p className="text-sm text-soil leading-relaxed">
              We use cookies to enhance your browsing experience. You can disable cookies in your browser settings if you prefer.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">5. Third-Party Links</h2>
            <p className="text-sm text-soil leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies before sharing information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-3">6. Contact Us</h2>
            <p className="text-sm text-soil leading-relaxed">
              For privacy concerns, please contact us at privacy@bloomshine.com or use our contact form.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
