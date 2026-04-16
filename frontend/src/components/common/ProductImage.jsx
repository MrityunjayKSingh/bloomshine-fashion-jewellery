/**
 * Renders either an uploaded product image or the emoji mock-bottle design
 */
export default function ProductImage({ image, name, size = 'md' }) {
  const sizeMap = {
    sm: { bottle: 'w-16 h-24', text: 'text-xs', emoji: 'text-lg' },
    md: { bottle: 'w-[90px] h-[145px]', text: 'text-xs', emoji: 'text-2xl' },
    lg: { bottle: 'w-40 h-64', text: 'text-sm', emoji: 'text-4xl' },
  }
  const s = sizeMap[size] || sizeMap.md

  if (!image) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(145deg,#D4E8D4,#8FB88A)' }}>
        <div className={`${s.bottle} rounded-xl flex flex-col items-center justify-center shadow-2xl text-cream text-center px-2`}
          style={{ background: 'linear-gradient(160deg,#3D5230,#1A2E12)' }}>
          <span className={`${s.emoji} mb-1`}>💎</span>
          <span className="font-display text-xs">InnateHeal</span>
          <span className={`${s.text} tracking-widest uppercase opacity-70 mt-1`}>{name?.split(' ').slice(0,2).join(' ')}</span>
        </div>
      </div>
    )
  }

  // Handle new format: array of full URLs
  if (Array.isArray(image) && image.length > 0 && typeof image[0] === 'string') {
    const imgUrl = image[0]
    return <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
  }

  // Handle old format: single full URL string
  if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('/storage'))) {
    return <img src={image} alt={name} className="w-full h-full object-cover" />
  }

  // Handle old format: object with type and path
  if (image.type === 'upload' && image.path) {
    const imgUrl = `${import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'}/${image.path}`
    return <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
  }

  // Emoji/design based image
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: image.bg || 'linear-gradient(145deg,#D4E8D4,#8FB88A)' }}>
      <div className={`${s.bottle} rounded-xl flex flex-col items-center justify-center shadow-2xl text-cream text-center px-2`}
        style={{ background: image.bottle || 'linear-gradient(160deg,#3D5230,#1A2E12)' }}>
        <span className={`${s.emoji} mb-1`}>{image.emoji || '💎'}</span>
        <span className="font-display text-xs">InnateHeal</span>
        <span className={`${s.text} tracking-widest uppercase opacity-70 mt-1`}>{name?.split(' ').slice(0,2).join(' ')}</span>
      </div>
    </div>
  )
}
