import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminCategoryApi } from '../../services/api'

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState(category || { name: '', image: null, status: 'active' })
  const [imagePreview, setImagePreview] = useState(category?.image ? category.image : null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(f => ({ ...f, image: file }))
      const reader = new FileReader()
      reader.onload = (event) => setImagePreview(event.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('status', form.status)
      if (form.image instanceof File) {
        formData.append('image', form.image)
        console.log('File appended:', form.image.name, form.image.type, form.image.size)
      } else {
        console.log('No file to append, image value:', form.image)
      }
      
      // For PUT requests with FormData, Laravel needs _method field
      if (category?.id) {
        formData.append('_method', 'PUT')
        await adminCategoryApi.update(category.id, formData)
      } else {
        await adminCategoryApi.create(formData)
      }
      onSave()
    } catch (err) {
      console.error('Error response:', err.response?.data)
      const errors = err.response?.data?.errors
      if (errors) setError(Object.values(errors).flat().join(', '))
      else setError(err.response?.data?.message || 'Failed to save category')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-warm-white w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-linen">
          <h2 className="font-display text-xl text-bark">{category?.id ? 'Edit Category' : 'New Category'}</h2>
          <button onClick={onClose} className="text-muted hover:text-bark text-xl">×</button>
        </div>
        {error && <div className="mx-6 mt-4 bg-red-50 text-red-600 text-xs px-4 py-3">{error}</div>}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[11px] tracking-widest uppercase text-bark mb-2">Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-linen bg-cream px-4 py-3 text-sm outline-none focus:border-moss" required />
          </div>
          <div>
            <label className="block text-[11px] tracking-widest uppercase text-bark mb-2">Image</label>
            {imagePreview && (
              <div className="mb-3 flex items-center gap-2">
                <img src={imagePreview} alt="preview" className="w-20 h-20 object-cover rounded border border-linen" />
                <button type="button" onClick={() => { setForm(f => ({ ...f, image: null })); setImagePreview(null) }}
                  className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="w-full border border-linen bg-cream px-4 py-3 text-sm outline-none focus:border-moss" />
          </div>
          <div>
            <label className="block text-[11px] tracking-widest uppercase text-bark mb-2">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-linen bg-cream px-4 py-3 text-sm outline-none focus:border-moss">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-linen text-bark text-xs tracking-widest uppercase py-3 hover:bg-linen transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-bark text-cream text-xs tracking-widest uppercase py-3 hover:bg-terracotta transition-all disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'new' | category object
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    adminCategoryApi.getAll().then(r => setCategories(r.data.data || [])).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this category? All products in it will also be deleted.')) return
    setDeleting(id)
    await adminCategoryApi.delete(id).catch(() => {})
    setDeleting(null)
    load()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--warm-white)' }}>
      <nav className="bg-bark text-cream px-8 py-4 flex justify-between items-center">
        <div className="h-8">
          <img src="/logos.png" alt="BloomShine" className="h-full object-contain" />
        </div>
        <Link to="/admin" className="text-xs tracking-wider text-white/70 hover:text-white">← Dashboard</Link>
      </nav>
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-4xl font-light text-bark">Categories</h1>
            <p className="text-sm text-muted mt-1">{categories.length} total</p>
          </div>
          <button onClick={() => setModal('new')} className="bg-bark text-cream text-xs tracking-widest uppercase px-6 py-3 hover:bg-terracotta transition-all">
            + New Category
          </button>
        </div>

        {loading ? <div className="text-center py-16 text-muted text-sm">Loading...</div> : (
          <div className="border border-linen overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_120px_100px_100px] gap-0 bg-cream px-6 py-3 text-[10px] tracking-widest uppercase text-muted border-b border-linen">
              <span>Icon</span><span>Name</span><span>Slug</span><span>Status</span><span className="text-right">Actions</span>
            </div>
            {categories.map((cat, i) => (
              <div key={cat.id} className={`grid grid-cols-[60px_1fr_120px_100px_100px] gap-0 items-center px-6 py-4 ${i < categories.length - 1 ? 'border-b border-linen' : ''} hover:bg-cream/50`}>
                {cat.image && <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />}
                {!cat.image && <div className="w-12 h-12 bg-linen rounded flex items-center justify-center text-xs text-muted">No image</div>}
                <span className="text-sm font-medium text-bark">{cat.name}</span>
                <span className="text-xs text-muted font-mono">{cat.slug}</span>
                <span>
                  <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 ${cat.status === 'active' ? 'bg-moss/10 text-moss' : 'bg-red-50 text-red-500'}`}>
                    {cat.status}
                  </span>
                </span>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setModal(cat)} className="text-xs text-moss hover:underline">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} disabled={deleting === cat.id} className="text-xs text-red-500 hover:underline disabled:opacity-50">
                    {deleting === cat.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && <CategoryModal category={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); load() }} />}
    </div>
  )
}
