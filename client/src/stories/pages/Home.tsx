import { Link } from 'react-router-dom';
import Page from './Page';
import Button from '../components/atoms/Button';

export default function Home() {

  return (
    <Page>
      <div className="w-full flex flex-col items-center mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Welcome to <span className="text-yellow-300"><Link to={'/'}>Pokémon Finder</Link></span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 leading-relaxed">
            Search, discover, and learn about all your favorite Pokémon. Register to
            start your journey or log in to continue exploring the world of Pokémon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant='secondary' className="w-full sm:w-auto">
              Login
            </Button>
            <Button className="w-full sm:w-auto">
              Sign Up
            </Button>
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
