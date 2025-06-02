// src/pages/DayPage.tsx
import { useParams } from 'react-router-dom'
import DateScroller from '../components/DateScroller'
import DayCircle from '../components/DayCircle'
import Timeline from '../components/Timeline'

export default function DayPage() {
  const { date } = useParams()

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <DateScroller selectedDate={date!} />
      <DayCircle date={date!} />
      <Timeline date={date!} />
    </div>
  )
}
