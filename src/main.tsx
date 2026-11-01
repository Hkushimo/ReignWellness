import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './landing.css'
import App from './Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
