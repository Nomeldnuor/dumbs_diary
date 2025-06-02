import React from 'react'

interface Activity {
  time: string // 예: "08:00"
  label: string
  note?: string
}

const exampleTimeline: Activity[] = [
  { time: "07:00", label: "기상", note: "피곤했음" },
  { time: "08:00", label: "조깅", note: "날씨 좋았음" },
  { time: "10:00", label: "공부", note: "수학 문제 풀이" },
  { time: "13:00", label: "업무", note: "회의 2건" },
  { time: "20:00", label: "자기계발", note: "책 읽기" },
]

export default function Timeline({ date }: { date: string }) {
  return (
    <div className="w-full max-w-xl mt-4">
      <h2 className="text-lg font-semibold mb-3">시간별 활동</h2>
      <ul className="space-y-4">
        {exampleTimeline.map((item, idx) => (
          <li key={idx} className="border-l-4 border-blue-400 pl-4">
            <p className="text-sm text-gray-500">{item.time}</p>
            <p className="text-base font-medium">{item.label}</p>
            {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
