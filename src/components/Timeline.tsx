// src/components/Timeline.tsx
import React, { useEffect, useState } from 'react'

interface Activity {
  time: string
  label: string
  note?: string
}

export default function Timeline({ date }: { date: string }) {
  const [entries, setEntries] = useState<Activity[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dailyLog') || '{}')
    setEntries(saved[date] || [])
  }, [date])

  return (
    <div className="w-full max-w-xl mt-4">
      <h2 className="text-lg font-semibold mb-3">시간별 활동</h2>
      {entries.length === 0 ? (
        <p className="text-gray-400">기록이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {entries
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((item, idx) => (
              <li key={idx} className="border-l-4 border-blue-400 pl-4">
                <p className="text-sm text-gray-500">{item.time}</p>
                <p className="text-base font-medium">{item.label}</p>
                {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
