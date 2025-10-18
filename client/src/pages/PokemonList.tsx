import { useState } from 'react'
import { usePaginatedPokemon } from '../hooks/usePaginatedPokemon'
import Page from './Page';

export default function PokemonList() {
  const [pageNumber, setPageNumber] = useState(0)
  const limit = 10
  const offset = pageNumber * limit

  const { data, isLoading, isError, isFetching } = usePaginatedPokemon(limit, offset)

  if (isLoading) return (
    <Page>
      <div className="text-center mt-20 text-white">Loading...</div>
    </Page>
  )
  if (isError) return (
    <Page>
      <div className="text-center mt-20 text-white">Error loading Pokémon.</div>
    </Page>
  )

  return (
    <Page>
      <div className="text-white max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Pokémon Page {pageNumber + 1}</h2>
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
            onClick={() => setPageNumber((p) => Math.max(p - 1, 0))}
            disabled={pageNumber === 0}
          >
            Previous
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded disabled:opacity-40"
            onClick={() => setPageNumber((p) => p + 1)}
            disabled={!data?.next}
          >
            Next
          </button>
        </div>
        {isFetching && <p className="text-sm text-indigo-300 mt-2">Fetching...</p>}
      </div>
    </Page>
  );
}
