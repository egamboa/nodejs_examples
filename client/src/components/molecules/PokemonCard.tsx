import { useEffect, useState } from 'react';
import type { PokemonDetails } from "../../interfaces/Pokemon";
import Card from "../atoms/Card";
import { Heart } from 'lucide-react';

/**
 * Card Molecule
 * Displays a content block.
 */
type PokemonCardProps = PokemonDetails;

export default function PokemonCard(pokemon: PokemonCardProps) {
  const { name, sprites, types, favorite } = pokemon;
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite || false);

  useEffect(() => {
    setIsFavorite(favorite || false);
  }, [favorite]);

  return (
    <Card>
      <div className="relative text-center">
        <button
          aria-pressed={favorite}
          onClick={() => setIsFavorite((s) => !s)}
          className="absolute top-0 right-0 p-1 cursor-pointer hover:text-green-500"
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <Heart color="red" strokeWidth={4} />
          ) : (
            <Heart />
          )}
        </button>

        <img
          src={sprites.front_default}
          alt={name}
          className="w-48 h-48 mx-auto object-contain"
        />
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex justify-center gap-2">
          <span className="bg-yellow-300 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {types[0].type.name}
          </span>
        </div>
      </div>
    </Card>
  );
}
