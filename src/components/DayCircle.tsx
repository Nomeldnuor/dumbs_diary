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

  const polarToCartesian = (angl
