import { ExitPage } from '@/pages'
import { Routes, Route } from 'react-router-dom'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ExitPage />} />
    </Routes>
  )
}