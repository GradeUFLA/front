import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Example } from './pages/Example/Example'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
    </BrowserRouter>
  )
}