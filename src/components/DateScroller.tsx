// src/components/DateScroller.tsx
import { useNavigate } from 'react-router-dom'

export default function DateScroller({ selectedDate }: { selectedDate: string }) {
  const navigate = useNavigate()
  const baseDate = new Date(selectedDate)

  const dates = [...Array(11)].map((_, i) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i - 5)
    return d.toISOString().split('T')[0]
  })

  return (
    <div className="flex overflow-x-auto space-x-2 p-2 border-b w-full max-w-xl">
      {dates.map(date => (
        <button
          key={date}
          onClick={() => navigate(`/day/${date}`)}
          className={`px-3 py-1 rounded-full ${
            date === selectedDate ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {date}
        </button>
      ))}
    </div>
  )
}
