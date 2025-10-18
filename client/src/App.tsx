// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/SignUp'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import Search from './pages/Search'
import Pokedex from './pages/Pokedex';
import ProtectedRoute from './components/ProtectedRoute';
import PokemonList from './pages/PokemonList'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* Protected routes */}
        <Route path="/welcome" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        } />
        <Route path="/pokedex" element={
          <ProtectedRoute>
            <Pokedex />
          </ProtectedRoute>
        } />
        <Route path="/list" element={
          <ProtectedRoute>
            <PokemonList />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App