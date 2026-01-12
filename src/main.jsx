import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/darkMode.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { ThemeProvider } from './Contexts/ThemeContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </AuthProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            style: {
              background: 'var(--fallback-b1)',
              color: 'var(--fallback-bc)',
              border: '1px solid var(--fallback-b3)'
            }
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
