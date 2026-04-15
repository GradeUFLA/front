import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Hero } from './pages/Hero/Hero'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  )
}