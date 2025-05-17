import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './home'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
