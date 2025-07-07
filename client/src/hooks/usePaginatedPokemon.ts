// hooks/usePaginatedPokemon.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

const API_BASE_URL = 'http://localhost:4000/pokemon'

interface PokemonResult {
  name: string
  url: string
}

export interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonResult[]
}

export function usePaginatedPokemon(limit: number, offset: number) {
  const queryClient = useQueryClient()

  const query = useQuery<PaginatedResponse, Error>({
    queryKey: ['pokemon', limit, offset],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}?limit=${limit}&offset=${offset}`)
      return res.data
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data?.next) {
      const nextOffset = offset + limit

      queryClient.prefetchQuery({
        queryKey: ['pokemon', limit, nextOffset],
        queryFn: async () => {
          const res = await axios.get(`${API_BASE_URL}?limit=${limit}&offset=${nextOffset}`)
          return res.data
        },
      })
    }
  }, [query.data, queryClient, limit, offset])

  return query
}
