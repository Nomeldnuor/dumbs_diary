import React, { useEffect, useState } from 'react'

interface Entry {
  time: string
  label: string
  note?: string
}

interface Arc {
  start: number
  end: number
  label: string
  color: string
}

const colorPalette = [
  '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#FB7185', '#4ADE80'
]

export default function DayCircle({ date }: { date: string }) {
  const [arcs, setArcs] = useState<Arc[]>([])

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('dailyLog') || '{}')[date] || []
    const sorted = [...raw].sort((a: Entry, b: Entry) => a.time.localeCompare(b.time))

    const toHour = (t: string) => {
      const [h, m] = t.split(':').map(Number)
      return h + m / 60
    }

    const arcList: Arc[] = []
    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i]
      const next = sorted[i + 1]
      arcList.push({
        start: toHour(current.time),
        end: next ? toHour(next.time) : toHour(current.time) + 1,
        label: current.label,
        color: colorPalette[i % colorPalette.length],
      })
    }

    setArcs(arcList)
  }, [date])

  const radius = 100
  const center = 120
  const strokeWidth = 30

  const polarToCartesian = (angleDeg: number) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    }
  }

  const describeArc = (startHour: number, endHour: number) => {
    const startAngle = (startHour / 24) * 360
    const endAngle = (endHour / 24) * 360
    const largeArc = endAngle - startAngle > 180 ? 1 : 0

    const start = polarToCartesian(startAngle)
    const end = polarToCartesian(endAngle)

    return `M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  return (
    <div className="w-[240px] h-[240px] relative">
      <svg width="240" height="240">
        {arcs.map((activity, idx) => (
          <path
            key={idx}
            d={describeArc(activity.start, activity.end)}
            stroke={activity.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        ))}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth}
          fill="white"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div>
          <p className="text-xl font-bold">{date}</p>
          <p className="text-gray-500 text-sm">기록된 활동 수: {arcs.length}</p>
        </div>
      </div>
    </div>
  )
}
