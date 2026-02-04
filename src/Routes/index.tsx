import { ExitPage, Login } from '@/pages'
import { Routes, Route } from 'react-router-dom'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ExitPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}