import Page from './Page';
import LinkTo from '../components/atoms/LinkTo';

export default function Home() {

  return (
    <Page>
      <div className="w-full flex flex-col items-center mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Welcome to <span className="text-yellow-300"><LinkTo to={'/'}>Pokémon Finder</LinkTo></span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 leading-relaxed">
            Search, discover, and learn about all your favorite Pokémon. Register to
            start your journey or log in to continue exploring the world of Pokémon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LinkTo to="/login" asButton buttonVariant="secondary" buttonClassName="w-full sm:w-auto">
              Login
            </LinkTo>
            <LinkTo to="/sign-up" asButton buttonClassName="w-full sm:w-auto">
              Sign Up
            </LinkTo>
          </div>
        </div>
        <div className="mt-16">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="w-32 h-32 animate-bounce"
          />
        </div>
      </div>
    </Page>
  );
}
