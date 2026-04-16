import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminProductApi, adminCategoryApi } from '../../services/api'
import { formatPrice } from '../../utils/format'

const BADGES = [{ value: '', label: 'None' }, { value: 'bestseller', label: 'Bestseller' }, { value: 'new', label: 'New' }, { value: 'sale', label: 'Sale' }]

function ProductModal({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState(product ? {
    category_id: product.category_id, name: product.name, price: product.price,
    original_price: product.original_price || '', description: product.description || '',
    short_description: product.short_description || '', badge: product.badge || '',
    status: product.status, images: [], newImages: [],
    tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    details: product.details && typeof product.details === 'object' 
      ? Object.entries(product.details).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }],
    care_instructions: Array.isArray(product.care_instructions) ? product.care_instructions : [''],
  } : {
    category_id: categories[0]?.id || '', name: '', price: '', original_price: '',
    description: '', short_description: '', badge: '', status: 'active', images: [], newImages: [],
    tags: '',
    details: [{ key: '', value: '' }],
    care_instructions: [''],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Initialize existing images
  useEffect(() => {
    if (product?.image && Array.isArray(product.image)) {
      setForm(f => ({ ...f, images: product.image }))
    }
  }, [product])

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files || [])
    setForm(f => ({ ...f, newImages: [...f.newImages, ...files] }))
  }

  const handleRemoveImage = (path) => {
    setForm(f => ({ ...f, images: f.images.filter(img => img !== path) }))
  }

  const handleRemoveNewImage = (idx) => {
    setForm(f => ({ ...f, newImages: f.newImages.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const data = new FormData()
      
      // Add form fields
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'images' || k === 'newImages' || k === 'details' || k === 'care_instructions') return
        if (v !== '' && v !== null && v !== undefined) data.append(k, v)
      })
      
      // Add old images that weren't deleted (image URLs from API)
      form.images.forEach((img, i) => {
        // Only add if it's a URL (not a File object)
        if (typeof img === 'string') {
          data.append(`existing_images[${i}]`, img)
        }
      })
      
      // Add new images (File objects from input)
      form.newImages.forEach((img, i) => {
        data.append(`images[${i}]`, img)
      })
      
      // Convert tags string to array items
      if (form.tags) {
        const tagArray = form.tags.split(',').map(t => t.trim()).filter(Boolean)
        data.delete('tags')
        tagArray.forEach((t, i) => data.append(`tags[${i}]`, t))
      }
      
      // Convert details to JSON object
      const detailsObj = {}
      form.details.forEach(d => {
        if (d.key?.trim()) {
          detailsObj[d.key.trim()] = d.value
        }
      })
      data.append('details', JSON.stringify(detailsObj))
      
      // Convert care instructions to JSON array
      const careArray = form.care_instructions.filter(c => c?.trim())
      data.append('care_instructions', JSON.stringify(careArray))
      
      // For PUT requests with FormData, Laravel needs _method field
      if (product?.id) {
        data.append('_method', 'PUT')
        await adminProductApi.update(product.id, data)
      } else {
        await adminProductApi.create(data)
      }
      onSave()
    } catch (err) {
      console.error('Product error response:', err.response?.data)
      const errors = err.response?.data?.errors
      if (errors) setError(Object.values(errors).flat().join(', '))
      else setError(err.response?.data?.message || 'Failed to save product')
    } finally { setLoading(false) }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-warm-white w-full max-w-2xl shadow-2xl my-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-linen sticky top-0 bg-warm-white">
          <h2 className="font-display text-2xl text-bark">{product?.id ? 'Edit Product' : 'New Product'}</h2>
          <button onClick={onClose} className="text-muted hover:text-bark text-2xl leading-none">×</button>
        </div>
        {error && <div className="mx-6 mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 border border-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Category *</label>
              <select value={form.category_id} onChange={e => set('category_id', e.target.value)}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss" required>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm tracking-widest uppercase text-bark mb-2">Product Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss" required />
          </div>
          <div>
            <label className="block text-sm tracking-widest uppercase text-bark mb-2">Short Description</label>
            <input value={form.short_description} onChange={e => set('short_description', e.target.value)}
              className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss"
              placeholder="e.g. Milk Thistle · Dandelion Root · 60 Caps" />
          </div>
          <div>
            <label className="block text-sm tracking-widest uppercase text-bark mb-2">Full Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
              className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} min="0" step="0.01"
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss" required />
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Original Price (₹)</label>
              <input type="number" value={form.original_price} onChange={e => set('original_price', e.target.value)} min="0" step="0.01"
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Badge</label>
              <select value={form.badge} onChange={e => set('badge', e.target.value)}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss">
                {BADGES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm tracking-widest uppercase text-bark mb-2">Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)}
                className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss"
                placeholder="Liver Health, Detox" />
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-linen pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm tracking-widest uppercase text-bark font-medium">Product Details</label>
              <button type="button" onClick={() => set('details', [...form.details, { key: '', value: '' }])}
                className="text-xs tracking-widest uppercase text-moss hover:text-bark px-2 py-1 border border-moss hover:border-bark">+ Add Detail</button>
            </div>
            <div className="space-y-3">
              {form.details.map((detail, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input type="text" value={detail.key} onChange={e => {
                    const newDetails = [...form.details]
                    newDetails[i].key = e.target.value
                    set('details', newDetails)
                  }}
                    placeholder="Key (e.g., Material Quality)" className="flex-1 border border-linen bg-cream px-3 py-2 text-sm outline-none focus:border-moss" />
                  <input type="text" value={detail.value} onChange={e => {
                    const newDetails = [...form.details]
                    newDetails[i].value = e.target.value
                    set('details', newDetails)
                  }}
                    placeholder="Value (e.g., Premium Alloy)" className="flex-1 border border-linen bg-cream px-3 py-2 text-sm outline-none focus:border-moss" />
                  <button type="button" onClick={() => set('details', form.details.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-2">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="border-t border-linen pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm tracking-widest uppercase text-bark font-medium">Care & Storage Instructions</label>
              <button type="button" onClick={() => set('care_instructions', [...form.care_instructions, ''])}
                className="text-xs tracking-widest uppercase text-moss hover:text-bark px-2 py-1 border border-moss hover:border-bark">+ Add Instruction</button>
            </div>
            <div className="space-y-2">
              {form.care_instructions.map((instruction, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-xs text-muted flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-linen mt-2">{i + 1}</span>
                  <input type="text" value={instruction} onChange={e => {
                    const newInstructions = [...form.care_instructions]
                    newInstructions[i] = e.target.value
                    set('care_instructions', newInstructions)
                  }}
                    placeholder="e.g., Avoid prolonged water exposure" className="flex-1 border border-linen bg-cream px-3 py-2 text-sm outline-none focus:border-moss" />
                  <button type="button" onClick={() => set('care_instructions', form.care_instructions.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-2">×</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm tracking-widest uppercase text-bark mb-2">Product Images</label>
            
            {/* Existing Images */}
            {form.images.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted mb-2">Current Images ({form.images.length})</p>
                <div className="flex gap-2 flex-wrap">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} alt="current" className="w-20 h-20 object-cover rounded border border-linen" />
                      <button type="button" onClick={() => handleRemoveImage(img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Images */}
            {form.newImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted mb-2">New Images ({form.newImages.length})</p>
                <div className="flex gap-2 flex-wrap">
                  {form.newImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={URL.createObjectURL(img)} alt="new" className="w-20 h-20 object-cover rounded border border-linen border-dashed" />
                      <button type="button" onClick={() => handleRemoveNewImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <input type="file" multiple accept="image/*" onChange={handleImageAdd}
              className="w-full border border-linen bg-cream px-4 py-3 text-base outline-none focus:border-moss" />
            <p className="text-sm text-muted mt-1">Upload multiple images (JPEG, PNG, WebP, max 2MB each)</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-linen text-bark text-sm tracking-widest uppercase py-3 hover:bg-linen">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-bark text-cream text-sm tracking-widest uppercase py-3 hover:bg-terracotta disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    Promise.all([adminProductApi.getAll(), adminCategoryApi.getAll()])
      .then(([p, c]) => { setProducts(p.data.data || []); setCategories(c.data.data || []) })
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    setDeleting(id)
    await adminProductApi.delete(id).catch(() => {})
    setDeleting(null); load()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--warm-white)' }}>
      <nav className="bg-bark text-cream px-8 py-4 flex justify-between items-center">
        <div className="h-8">
          <img src="/logos.png" alt="BloomShine" className="h-full object-contain" />
        </div>
        <Link to="/admin" className="text-xs tracking-wider text-white/70 hover:text-white">← Dashboard</Link>
      </nav>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-4xl font-light text-bark">Products</h1>
            <p className="text-sm text-muted mt-1">{products.length} total</p>
          </div>
          <button onClick={() => setModal('new')} className="bg-bark text-cream text-xs tracking-widest uppercase px-6 py-3 hover:bg-terracotta transition-all">
            + New Product
          </button>
        </div>

        {loading ? <div className="text-center py-16 text-muted">Loading...</div> : (
          <div className="border border-linen overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-linen">
                <tr>
                  {['Product', 'Category', 'Price', 'Badge', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-[10px] tracking-widest uppercase text-muted px-5 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={`border-b border-linen hover:bg-cream/50 ${i === products.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {Array.isArray(p.image) && p.image.length > 0 && typeof p.image[0] === 'string' ? (
                          <img src={p.image[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
                        ) : typeof p.image === 'string' && (p.image.startsWith('http') || p.image.startsWith('/storage')) ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                        ) : (
                          <span className="text-xl">{p.image?.emoji || '💎'}</span>
                        )}
                        <div>
                          <div className="text-sm font-medium text-bark">{p.name}</div>
                          <div className="text-[11px] text-muted mt-0.5">{p.short_description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-soil">{p.category?.name || '—'}</td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-bark">{formatPrice(p.price)}</div>
                      {p.original_price && <div className="text-[11px] text-muted line-through">{formatPrice(p.original_price)}</div>}
                    </td>
                    <td className="px-5 py-4">
                      {p.badge && <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-linen text-bark">{p.badge}</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 ${p.status === 'active' ? 'bg-moss/10 text-moss' : 'bg-red-50 text-red-500'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-4">
                        <button onClick={() => setModal(p)} className="text-xs text-moss hover:underline">Edit</button>
                        <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="text-xs text-red-500 hover:underline disabled:opacity-50">
                          {deleting === p.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <ProductModal product={modal === 'new' ? null : modal} categories={categories} onClose={() => setModal(null)} onSave={() => { setModal(null); load() }} />}
    </div>
  )
}
