// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DayPage from './pages/DayPage'
import EditPage from './pages/EditPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/day/${getToday()}`} />} />
        <Route path="/day/:date" element={<DayPage />} />
        <Route path="/edit/:date" element={<EditPage />} />
      </Routes>
    </Router>
  )
}

function getToday(): string {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

export default App
