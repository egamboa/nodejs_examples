// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './stories/pages/Home'
import Login from './stories/pages/Login'
import Register from './stories/pages/RegisterPage'
import NotFound from './stories/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App