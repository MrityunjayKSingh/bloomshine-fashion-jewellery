const BADGE_STYLES = {
  bestseller: 'bg-moss text-white',
  new: 'bg-terracotta text-white',
  sale: 'bg-sand text-bark',
}

export default function Badge({ type }) {
  if (!type) return null
  const style = BADGE_STYLES[type] || 'bg-bark text-cream'
  const label = type === 'bestseller' ? 'Bestseller' : type.charAt(0).toUpperCase() + type.slice(1)
  return (
    <span className={`absolute top-3.5 left-3.5 text-[9px] tracking-widest uppercase px-2.5 py-1 font-medium z-10 ${style}`}>
      {label}
    </span>
  )
}
