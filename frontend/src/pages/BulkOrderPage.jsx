import { Link } from 'react-router-dom'
import { useState } from 'react'
import { formApi } from '../services/api'

export default function BulkOrderPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    products: '',
    quantity: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await formApi.submitBulkOrder(formData)
      setMessage({ type: 'success', text: 'Thank you! We\'ll review your inquiry and contact you within 1 business day.' })
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        products: '',
        quantity: '',
        message: ''
      })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.'
      setMessage({ type: 'error', text: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>Bulk Orders</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Bulk Order <em className="italic text-terracotta">Solutions</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Partner with BloomShine for volume discounts and custom solutions for your business.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-light text-bark mb-3">Why Choose BloomShine for Bulk Orders?</h2>
              <ul className="text-sm text-soil leading-relaxed space-y-3">
                <li className="flex gap-3">
                  <span className="text-terracotta flex-shrink-0 mt-1">✓</span>
                  <span><strong>Competitive Pricing:</strong> Volume discounts starting at 10+ units</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terracotta flex-shrink-0 mt-1">✓</span>
                  <span><strong>Quality Guaranteed:</strong> All products third-party tested and certified</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terracotta flex-shrink-0 mt-1">✓</span>
                  <span><strong>Custom Packaging:</strong> Private label and custom branding available</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terracotta flex-shrink-0 mt-1">✓</span>
                  <span><strong>Dedicated Support:</strong> Personal account manager for your orders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-terracotta flex-shrink-0 mt-1">✓</span>
                  <span><strong>Fast Delivery:</strong> Priority shipping for bulk orders</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-bark mb-3">Who Can Order?</h2>
              <p className="text-sm text-soil leading-relaxed">
                We welcome bulk orders from retailers, gyms, wellness centers, corporate wellness programs, fitness studios, healthcare practitioners, and other B2B partners.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light text-bark mb-3">Bulk Order Process</h2>
              <ol className="text-sm text-soil leading-relaxed space-y-2">
                <li><strong>1. Inquiry:</strong> Fill out the form below with your requirements</li>
                <li><strong>2. Consultation:</strong> Our team will contact you within 1 business day</li>
                <li><strong>3. Quote:</strong> Custom pricing and terms based on your needs</li>
                <li><strong>4. Fulfillment:</strong> We prepare and ship your order</li>
                <li><strong>5. Support:</strong> Ongoing account support and reorder assistance</li>
              </ol>
            </div>
          </div>

          <div className="md:col-span-1 bg-linen rounded-lg p-6">
            <div className="text-xs text-muted tracking-wider uppercase mb-4">Quick Info</div>
            <div className="space-y-4 text-sm text-soil">
              <div>
                <div className="font-medium text-bark mb-1">Minimum Order</div>
                <div>10 units (negotiable)</div>
              </div>
              <div>
                <div className="font-medium text-bark mb-1">Lead Time</div>
                <div>5-7 business days</div>
              </div>
              <div>
                <div className="font-medium text-bark mb-1">Payment Terms</div>
                <div>Net 30 for qualified buyers</div>
              </div>
              <div>
                <div className="font-medium text-bark mb-1">Custom Branding</div>
                <div>Available on request</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message.text && (
                <div className={`text-sm px-4 py-3 border ${message.type === 'success' 
                  ? 'bg-moss/10 text-moss border-moss/20' 
                  : 'bg-red-50 text-red-600 border-red-200'}`}>
                  {message.text}
                </div>
              )}
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Products Interested In</label>
                <input
                  type="text"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  placeholder="e.g., Earrings, Necklaces, Bracelets"
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Quantity Needed</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 100 units"
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase text-bark mb-2">Additional Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows="4"
                  disabled={loading}
                  className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss resize-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-bark text-cream text-sm tracking-widest uppercase px-6 py-3 hover:bg-terracotta transition-all disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-light text-bark mb-3">Bulk Order Support</h3>
              <p className="text-sm text-soil leading-relaxed">
                Our dedicated bulk sales team is ready to help you find the perfect solution for your business needs.
              </p>
            </div>

            <div className="bg-linen rounded-lg p-6 border border-linen">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider mb-1">Email</div>
                  <a href="mailto:bulk@bloomshine.com" className="text-sm text-terracotta hover:text-opacity-80 transition-colors">bulk@bloomshine.com</a>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider mb-1">Phone</div>
                  <a href="tel:+918905551234" className="text-sm text-terracotta hover:text-opacity-80 transition-colors">+91 890 555 1234</a>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider mb-1">Response Time</div>
                  <div className="text-sm text-soil">Within 1 business day</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-light text-bark mb-3">Custom Solutions</h3>
              <p className="text-sm text-soil leading-relaxed">
                Need something special? We offer private label options, custom branding, and specialized packaging. Contact us to discuss your vision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
