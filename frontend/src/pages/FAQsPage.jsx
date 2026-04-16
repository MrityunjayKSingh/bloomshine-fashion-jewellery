import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function FAQsPage() {
  const [openId, setOpenId] = useState(null)

  const faqs = [
    {
      id: 1,
      category: 'Orders & Shipping',
      question: 'How long does delivery take?',
      answer: 'We offer two shipping options: Standard (5-7 business days) and Express (2-3 business days). Orders placed before 2 PM are processed same-day.'
    },
    {
      id: 2,
      category: 'Orders & Shipping',
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within India. For international orders, please contact our customer service at support@bloomshine.com for special arrangements.'
    },
    {
      id: 3,
      category: 'Orders & Shipping',
      question: 'Can I track my order?',
      answer: 'Yes! You\'ll receive a tracking number via email once your jewellery ships. Use this to track your package on the courier\'s website.'
    },
    {
      id: 4,
      category: 'Products',
      question: 'What materials are used in your jewellery?',
      answer: 'Our jewellery is made from high-quality imitation materials including brass alloys, crystals, stones, and glass. Check individual product pages for specific material composition and details.'
    },
    {
      id: 5,
      category: 'Products',
      question: 'Is your jewellery nickel-free?',
      answer: 'Most of our pieces are made with nickel-free materials to minimize allergies. However, some pieces may contain trace amounts. Check product descriptions for hypoallergenic options if you have sensitive skin.'
    },
    {
      id: 6,
      category: 'Products',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on unworn jewellery in original condition. See our Returns & Refunds page for complete details and the return process.'
    },
    {
      id: 7,
      category: 'Care & Maintenance',
      question: 'How do I care for my jewellery?',
      answer: 'Store jewellery in a dry place away from moisture, perfume, and chemicals. Clean gently with a soft cloth. Avoid water and harsh soaps. Proper care ensures your pieces last longer and maintain their beauty.'
    },
    {
      id: 8,
      category: 'Care & Maintenance',
      question: 'Can I wear my jewellery while swimming or bathing?',
      answer: 'No, we recommend removing jewellery before swimming, showering, or bathing. Water, chlorine, and other chemicals can damage the finish and cause tarnishing or discoloration.'
    },
    {
      id: 9,
      category: 'Safety & Comfort',
      question: 'Will the jewellery cause skin irritation?',
      answer: 'Our jewellery is made from hypoallergenic materials. However, some individuals may be sensitive to certain metals. If you experience irritation, remove the piece immediately and consult a dermatologist.'
    },
    {
      id: 10,
      category: 'Safety & Comfort',
      question: 'Is your jewellery suitable for everyday wear?',
      answer: 'Yes, our jewellery is designed for everyday wear. The materials are durable and long-lasting. However, we recommend removing delicate pieces during strenuous activities to prevent damage.'
    },
    {
      id: 11,
      category: 'Account',
      question: 'How do I create an account?',
      answer: 'Click on "Sign Up" in the top navigation. Enter your email, create a password, and you\'re ready to start shopping! An account helps you track orders and save favorites.'
    },
    {
      id: 12,
      category: 'Account',
      question: 'Can I reset my password?',
      answer: 'Yes, click "Forgot Password" on the login page and follow the instructions. A reset link will be sent to your registered email address.'
    }
  ]

  const categories = [...new Set(faqs.map(f => f.category))]

  return (
    <div className="page-enter">
      <div className="px-6 md:px-14 py-16 md:py-24" style={{ background: 'linear-gradient(135deg,var(--linen) 0%,var(--cream) 100%)', borderBottom: '1px solid rgba(61,43,31,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] text-muted tracking-wider mb-5">
            <Link to="/" className="hover:text-bark transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>FAQs</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-bark mb-3">Frequently Asked <em className="italic text-terracotta">Questions</em></h1>
          <p className="text-sm text-muted max-w-lg leading-relaxed">Find answers to common questions about our products, orders, and policies.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-14 py-16">
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h2 className="font-display text-2xl font-light text-bark mb-6 pb-3 border-b border-stone-200">{category}</h2>
              <div className="space-y-3">
                {faqs.filter(f => f.category === category).map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full text-left"
                  >
                    <div className="p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors border border-stone-200">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-medium text-sm text-bark">{faq.question}</h3>
                        <span className={`text-xl text-terracotta transition-transform flex-shrink-0 ${openId === faq.id ? 'rotate-180' : ''}`}>
                          ›
                        </span>
                      </div>
                      {openId === faq.id && (
                        <p className="mt-3 text-sm text-soil leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="bg-linen rounded-lg p-8">
            <p className="text-sm text-soil leading-relaxed mb-4">
              Can't find what you're looking for?
            </p>
            <Link to="/contact" className="inline-block px-6 py-2 bg-terracotta text-white text-sm font-medium rounded hover:bg-opacity-90 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
