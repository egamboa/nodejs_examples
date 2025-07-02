import { Link } from 'react-router-dom'
import Button from '../atoms/Button'

export interface HeaderProps {
  user?: {
    name: string
  }
  onLogin?: () => void
  onLogout?: () => void
  onCreateAccount?: () => void
}

/**
 * Header Component
 * Displays the logo/title and user authentication actions.
 */
export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  return (
    <header className="bg-indigo-900/30 p-4 border-b border-indigo-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo + Title */}
        <Link to="/" className="flex items-center gap-3 text-yellow-300 hover:opacity-90">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold tracking-tight">Pokémon Finder</h1>
        </Link>

        {/* Right: Auth Actions */}
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-indigo-200 hidden sm:inline">
                Welcome, <b className="text-white font-medium">{user.name}</b>
              </span>
              <Button onClick={onLogout} variant="secondary">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onLogin} variant="secondary">
                Log in
              </Button>
              <Button onClick={onCreateAccount} variant="primary">
                Sign up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
