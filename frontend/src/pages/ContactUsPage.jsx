import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formApi } from '../services/api'

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await formApi.submitContact(form)
      setMessage({ type: 'success', text: 'Thank you! We\'ve received your message and will get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please try again.'
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
            <span>Contact Us</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Get In <em className="italic text-terracotta">Touch</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-light text-bark mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <div className="text-xs tracking-widest uppercase text-moss mb-2">Email</div>
                <p className="text-sm text-soil">hello@bloomshine.com</p>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-moss mb-2">Phone</div>
                <p className="text-sm text-soil">+91 9876 543 210</p>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-moss mb-2">Address</div>
                <p className="text-sm text-soil">BloomShine Jewellery<br />New Delhi, India</p>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-moss mb-2">Hours</div>
                <p className="text-sm text-soil">Monday - Friday: 9AM - 6PM IST<br />Saturday - Sunday: 10AM - 4PM IST</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {message.text && (
              <div className={`text-sm px-4 py-3 border ${message.type === 'success' 
                ? 'bg-moss/10 text-moss border-moss/20' 
                : 'bg-red-50 text-red-600 border-red-200'}`}>
                {message.text}
              </div>
            )}
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss resize-none"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bark text-cream text-sm tracking-widest uppercase px-6 py-3 hover:bg-terracotta transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
