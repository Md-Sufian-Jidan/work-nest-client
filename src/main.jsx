import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './layouts/Main.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { router } from './routes/Routes.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider router={router}>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
