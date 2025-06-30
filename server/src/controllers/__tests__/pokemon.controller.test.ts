import { Request, Response } from 'express'
import * as PokemonService from '../../services/pokemon.service'
import { getAllPokemons, getPokemon } from '../pokemon.controller'

jest.mock('../../services/pokemon.service') // Automatically mocks all exports

describe('Pokemon Controller', () => {
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllPokemons', () => {
    it('should return a list of pokemons', async () => {
      const mockData = [{ name: 'pikachu' }]
      ;(PokemonService.list as jest.Mock).mockResolvedValue(mockData)

      const req = {
        query: {
          limit: '10',
          offset: '0',
        },
      } as unknown as Request

      const res = mockResponse()

      await getAllPokemons(req, res)

      expect(PokemonService.list).toHaveBeenCalledWith(10, 0)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockData)
    })

    it('should handle errors', async () => {
      const error = { status: 500, message: 'Internal error' }
      ;(PokemonService.list as jest.Mock).mockRejectedValue(error)

      const req = {
        query: {},
      } as unknown as Request

      const res = mockResponse()

      await getAllPokemons(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' })
    })
  })

  describe('getPokemon', () => {
    it('should return a single pokemon', async () => {
      const mockPokemon = { name: 'bulbasaur' }
      ;(PokemonService.findOne as jest.Mock).mockResolvedValue(mockPokemon)

      const req = {
        params: { name: 'Bulbasaur' },
      } as unknown as Request

      const res = mockResponse()

      await getPokemon(req, res)

      expect(PokemonService.findOne).toHaveBeenCalledWith('bulbasaur')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockPokemon)
    })

    it('should return 404 if pokemon not found', async () => {
      ;(PokemonService.findOne as jest.Mock).mockResolvedValue(null)

      const req = {
        params: { name: 'Missingmon' },
      } as unknown as Request

      const res = mockResponse()

      await getPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ error: 'Pokemon not found' })
    })

    it('should handle errors in getPokemon', async () => {
      const error = { status: 500, message: 'Failed to fetch Pokemon data' }
      ;(PokemonService.findOne as jest.Mock).mockRejectedValue(error)

      const req = {
        params: { name: 'pikachu' },
      } as unknown as Request

      const res = mockResponse()

      await getPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch Pokemon data',
      })
    })
  })
})
