import type { PokemonDetails } from "../../interfaces/Pokemon";
import PokemonCard from "../molecules/PokemonCard";

export default function PokemonList({ pokemons }: { pokemons: PokemonDetails[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
}
