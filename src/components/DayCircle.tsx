import React from 'react'

interface Activity {
  start: number // 0~24
  end: number   // 0~24
  label: string
  color: string
}

const exampleActivities: Activity[] = [
  { start: 0, end: 7, label: '수면', color: '#60A5FA' },
  { start: 8, end: 9, label: '운동', color: '#34D399' },
  { start: 10, end: 12, label: '공부', color: '#FBBF24' },
  { start: 13, end: 18, label: '업무', color: '#F87171' },
  { start: 20, end: 22, label: '자기계발', color: '#A78BFA' },
]

export default function DayCircle({ date }: { date: string }) {
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
        {exampleActivities.map((activity, idx) => (
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
          <p className="text-gray-500 text-sm">일과 요약</p>
        </div>
      </div>
    </div>
  )
}
