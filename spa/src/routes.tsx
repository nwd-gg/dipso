import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/Main'
import { MixPage } from './pages/Mix'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mix" element={<MixPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
