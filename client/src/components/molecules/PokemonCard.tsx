import type { PokemonDetails } from "../../interfaces/Pokemon";
import Card from "../atoms/Card";

/**
 * Card Molecule
 * Displays a content block.
 */
export default function PokemonCard(pokemon: PokemonDetails) {
  const { name, sprites, types } = pokemon;
  return (
    <Card>
      <div className="text-center">
          <img
            src={sprites.front_default}
            alt={name}
            className="w-48 h-48 mx-auto"
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
