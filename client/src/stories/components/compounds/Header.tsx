import Button from '../atoms/Button'
import LinkTo from '../atoms/LinkTo'

export interface HeaderProps {
  user?: {
    name: string
  }
  onLogin?: () => void
  onLogout?: () => void
  onCreateAccount?: () => void
}

/**
 * Compact Header Component
 */
export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  return (
    <header className="bg-transparent px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo + Title */}
        <LinkTo to="/" className="flex items-center gap-2 text-yellow-300 hover:opacity-90">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="w-20 h-20"
          />
          <h1 className="text-lg tracking-tight leading-none">Pokémon Finder</h1>
        </LinkTo>

        {/* Right: Auth Actions */}
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-black text-md hidden sm:inline min-w-50">
                Welcome, <b className="text-black font-semibold">{user.name}</b>
              </span>
              <Button onClick={onLogout} variant="secondary" className="text-sm px-3 py-1.5">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onLogin} variant="secondary" className="text-sm px-3 py-1.5">
                Log in
              </Button>
              <Button onClick={onCreateAccount} variant="primary" className="min-w-30 text-sm px-3 py-1.5">
                Sign up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
