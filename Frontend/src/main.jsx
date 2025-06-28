import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import EventContext from './context/EventContext.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <AuthContext>
    <EventContext>
      <App />
    </EventContext>
  </AuthContext>
  </BrowserRouter>
  </StrictMode>,
)
