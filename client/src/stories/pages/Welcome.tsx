import Page from './Page';
import Button from '../components/atoms/Button';


export default function Welcome() {

  return (
    <Page>
      <div className="max-w-2xl text-center mt-20">
        <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">
          Welcome, Trainer!
        </h1>
        <p className="text-indigo-100 text-lg mb-8">
          Ready to explore the world of Pokémon? Use the search to catch &apos;em all, or browse the full Pokédex.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">Go to Pokédex</Button>
          <Button variant="secondary">Search Pokémon</Button>
        </div>

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          className="w-24 h-24 mx-auto mt-20 animate-bounce"
        />
      </div>
    </Page>
  );
}
