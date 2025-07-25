// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/SignUp'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import Search from './pages/Search'
import Pokedex from './pages/Pokedex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App