import Button from '../atoms/Button'
import LinkTo from '../atoms/LinkTo'
import { useAuth } from '../../hooks/useAuth'


export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-transparent px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <LinkTo to="/" className="flex items-center gap-2 text-yellow-300 hover:opacity-90">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="w-20 h-20"
          />
          <h1 className="text-lg tracking-tight leading-none">Pokémon Finder</h1>
        </LinkTo>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-black text-md hidden sm:inline min-w-50">
                Welcome, <b className="text-black font-semibold">{user.name}</b>
              </span>
              <Button onClick={logout} variant="secondary" className="text-sm px-3 py-1.5">
                Log out
              </Button>
            </>
          ) : (
            <>
              <LinkTo to="/login" asButton buttonVariant='secondary' buttonClassName="text-sm px-3 py-1.5">
                Log in
              </LinkTo>
              <LinkTo to="/sign-up" asButton buttonClassName="text-sm px-3 py-1.5">
                Sign up
              </LinkTo>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
