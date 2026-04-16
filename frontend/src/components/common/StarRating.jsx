export default function StarRating({ rating, count, size = 'sm' }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  const textSize = size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-sm' : 'text-base'

  return (
    <div className={`flex items-center gap-1.5 ${textSize}`}>
      <span className="text-terracotta tracking-wider">
        {'★'.repeat(full)}{hasHalf ? '½' : ''}{'☆'.repeat(empty)}
      </span>
      {count !== undefined && (
        <span className="text-muted text-[10px]">({count})</span>
      )}
    </div>
  )
}
