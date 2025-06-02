import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DayPage from './pages/DayPage'
import EditPage from './pages/EditPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/day/2025-06-01" />} />
        <Route path="/day/:date" element={<DayPage />} />
        <Route path="/edit/:date" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
