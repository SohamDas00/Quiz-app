import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizList from "./QuizList.jsx";   // <-- Import QuizList directly

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizList />
  </StrictMode>
)
