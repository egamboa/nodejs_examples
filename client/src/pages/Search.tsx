import PokemonList from '../components/compounds/PokemonList';
import Page from './Page';
import { useState } from 'react'
import { usePaginatedPokemon } from '../hooks/usePaginatedPokemon'
import Pagination from '../components/molecules/Pagination';

export default function Search() {
  const [pageNumber, setPageNumber] = useState(0)
    const limit = 20
    const offset = pageNumber * limit
  
    const { data, isLoading, isError, isFetching } = usePaginatedPokemon(limit, offset)

  return (
    <Page>
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">
        Search
      </h1>
      <div className="text-white p-6">
        {isLoading && <p className="text-sm text-indigo-300 mb-2">Loading...</p>}
        {isError && <p className="text-sm text-red-400 mb-2">Error fetching data.</p>}
        {data && <PokemonList pokemons={data.results} />}
        {data && (
          <Pagination
            pageNumber={pageNumber}
            changePage={setPageNumber}
            next={!!data.next}
            count={data.count}
            pageSize={limit}
          />
        )}
        {isFetching && <p className="text-sm text-indigo-300 mt-2">Fetching...</p>}
      </div>
    </Page>
  );
}
