import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Entry {
  time: string
  label: string
  note: string
}

export default function EditPage() {
  const { date } = useParams()
  const navigate = useNavigate()

  const [entries, setEntries] = useState<Entry[]>([
    { time: '', label: '', note: '' }
  ])

  const handleChange = (index: number, field: keyof Entry, value: string) => {
    const newEntries = [...entries]
    newEntries[index][field] = value
    setEntries(newEntries)
  }

  const addEntry = () => {
    setEntries([...entries, { time: '', label: '', note: '' }])
  }

  const saveEntries = () => {
    const savedData = JSON.parse(localStorage.getItem('dailyLog') || '{}')
    savedData[date!] = entries
    localStorage.setItem('dailyLog', JSON.stringify(savedData))
    navigate(`/day/${date}`)
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{date} 기록하기</h1>

      {entries.map((entry, idx) => (
        <div key={idx} className="border rounded p-3 space-y-2 bg-gray-50">
          <input
            type="time"
            value={entry.time}
            onChange={e => handleChange(idx, 'time', e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="활동명"
            value={entry.label}
            onChange={e => handleChange(idx, 'label', e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="메모"
            value={entry.note}
            onChange={e => handleChange(idx, 'note', e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <div className="flex space-x-2">
        <button onClick={addEntry} className="bg-gray-200 px-4 py-2 rounded">+ 항목 추가</button>
        <button
          onClick={saveEntries}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          저장하고 이동
        </button>
      </div>
    </div>
  )
}
