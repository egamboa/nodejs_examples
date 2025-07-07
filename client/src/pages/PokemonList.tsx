// src/pages/PokemonListPage.tsx
import { useState } from 'react'
import { usePaginatedPokemon } from '../hooks/usePaginatedPokemon'

export default function PokemonListPage() {
  const [page, setPage] = useState(0)
  const limit = 10
  const offset = page * limit

  const { data, isLoading, isError, isFetching } = usePaginatedPokemon(limit, offset)

  if (isLoading) return <p>Loading Pokémon...</p>
  if (isError) return <p>Error fetching data</p>

  return (
    <div className="text-white max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Pokémon Page {page + 1}</h2>
      <ul className="space-y-2">
        {data?.results.map((pokemon) => (
          <li key={pokemon.name} className="capitalize border-b pb-1">
            {pokemon.name}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded disabled:opacity-40"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded disabled:opacity-40"
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.next}
        >
          Next
        </button>
      </div>
      {isFetching && <p className="text-sm text-indigo-300 mt-2">Fetching...</p>}
    </div>
  )
}
