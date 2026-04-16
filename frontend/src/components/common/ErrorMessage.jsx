export default function ErrorMessage({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="text-4xl">💎</div>
      <p className="font-display text-2xl text-bark">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-xs tracking-widest uppercase text-moss border border-moss px-6 py-2.5 hover:bg-moss hover:text-cream transition-all">
          Try Again
        </button>
      )}
    </div>
  )
}
