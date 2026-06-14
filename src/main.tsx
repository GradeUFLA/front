import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'
import { GradeProvider } from './context/GradeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GradeProvider>
      <App />
    </GradeProvider>
  </StrictMode>,
)
