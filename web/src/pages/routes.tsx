import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './home'
import { NotFound } from './not-found'
import { Redirect } from './redirect'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path=':shortUrl' element={<Redirect />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
