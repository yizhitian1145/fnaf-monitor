interface AreaSelectorProps {
  onAreaChange: (index: number) => void
}

export default function AreaSelector({ onAreaChange }: AreaSelectorProps) {
  return (
    <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
      {[0, 1, 2, 3].map((index) => (
        <button
          key={index}
          onClick={() => onAreaChange(index)}
          className="w-16 h-16 bg-gray-800 border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

