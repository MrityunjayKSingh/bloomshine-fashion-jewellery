import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-bark text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 h-12">
              <img src="/logos.png" alt="BloomShine" className="h-full object-contain" />
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-[220px]">
              
            </p>
            <div className="flex gap-3 mt-6">
              {['f', 'in', '▶', '📷'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-xs hover:border-sage hover:text-sage transition-colors">{icon}</a>
              ))}
            </div>
          </div>

          {[
            ['Shop', [['/products', 'All Products'], ['/categories', 'Categories'], ['/products?badge=new', 'New Arrivals'],['/products?badge=bestseller', 'Best Sellers']]],
            ['Company', [['/about', 'About Us'],['/privacy', 'Privacy Policy'],['/terms', 'Terms & Conditions'],['/disclaimer', 'Disclaimer']]],
            ['Support', [['/contact', 'Contact Us'], ['/returns', 'Returns'], ['/faqs', 'FAQs'],['/bulk-order', 'Bulk Order']]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="text-xs tracking-widest uppercase text-sand mb-4">{title}</div>
              <ul className="space-y-2.5">
                {links.map(([href, label]) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link to={href} className="text-l text-white/60 hover:text-cream transition-colors">{label}</Link>
                    ) : (
                      <a href={href} className="text-l text-white/60 hover:text-cream transition-colors">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-white/40 tracking-wider uppercase">
          <span>© 2026 BloomShine .All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}
