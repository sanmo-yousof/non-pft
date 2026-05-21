export default function Spinner({ size = 30 }: { size?: number }) {
  return (
    <div className="h-[30vh] w-full flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-gray-200 border-t-primary-500"
        style={{ width: size, height: size }}
      />
    </div>
  )
}