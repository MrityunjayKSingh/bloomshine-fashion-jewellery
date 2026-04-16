export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-2 border-linen border-t-moss rounded-full animate-spin" />
      <p className="text-xs tracking-widest uppercase text-muted">{message}</p>
    </div>
  )
}
