import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login, loading, error } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form)
    if (ok) navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--linen)' }}>
      <div className="w-full max-w-sm bg-warm-white p-10 shadow-lg">
        <div className="text-center mb-8">
          <div className="font-display text-3xl font-semibold text-bark mb-1"> <img src="/logos.png" alt="BloomShine" className="h-full object-contain" /></div>
          <p className="text-xs tracking-widest uppercase text-muted">Admin Panel</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[['Email', 'email', 'email', 'admin@innateheal.com'], ['Password', 'password', 'password', '••••••••']].map(([label, id, type, ph]) => (
            <div key={id}>
              <label className="block text-[11px] tracking-widest uppercase text-bark mb-2">{label}</label>
              <input type={type} value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                className="w-full border border-linen bg-cream px-4 py-3 text-sm text-bark outline-none focus:border-moss transition-colors"
                placeholder={ph} required />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-bark text-cream text-xs tracking-widest uppercase py-3.5 transition-all hover:bg-terracotta disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
