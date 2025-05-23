import './globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { AppRouter } from './pages/routes'

const queryClient = new QueryClient()
const TOAST_AUTO_CLOSE_TIME_IN_MILLISECONDS = 1000 * 5
const TOAST_LIMIT = 5

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer
        autoClose={TOAST_AUTO_CLOSE_TIME_IN_MILLISECONDS}
        limit={TOAST_LIMIT}
        position='bottom-right'
        theme='colored'
        hideProgressBar
        closeButton={false}
      />
    </QueryClientProvider>
  </StrictMode>,
)
