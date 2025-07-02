import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-yellow-300"><Link to={'/'}>Pokémon Finder</Link></span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 leading-relaxed">
          Search, discover, and learn about all your favorite Pokémon. Register to
          start your journey or log in to continue exploring the world of Pokémon.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition duration-200"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white hover:bg-white hover:text-indigo-800 font-bold rounded-xl transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          className="w-32 h-32 animate-bounce"
        />
      </div>
    </main>
  )
}
