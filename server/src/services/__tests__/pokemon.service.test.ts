import axios from 'axios'
import { redis } from '../../config/redis'
import * as PokemonService from '../pokemon.service'
import { PokemonDetails, PokemonList } from '../../interfaces/Pokemon'

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedRedis = redis as jest.Mocked<typeof redis>

describe('Pokemon Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne', () => {
    const mockPokemon: PokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
          },
        },
      ],
      types: [
        {
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
      ],
      sprites: {
        front_default: 'front.png',
        back_default: 'back.png',
        other: {
          'official-artwork': {
            front_default: 'art-front.png',
            back_default: 'art-back.png',
          },
        },
      },
    }

    it('should return cached pokemon if exists', async () => {
      mockedRedis.get.mockResolvedValueOnce(JSON.stringify(mockPokemon))

      const result = await PokemonService.findOne('bulbasaur')
      expect(redis.get).toHaveBeenCalledWith('pokemon:bulbasaur')
      expect(result).toEqual(mockPokemon)
    })

    it('should fetch from API and cache if not in redis', async () => {
      mockedRedis.get.mockResolvedValueOnce(null)
      mockedAxios.get.mockResolvedValueOnce({
        data: mockPokemon,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '' },
      })

      const result = await PokemonService.findOne('bulbasaur')

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur',
      )
      expect(redis.set).toHaveBeenCalledWith(
        'pokemon:bulbasaur',
        JSON.stringify(mockPokemon),
        'EX',
        3600,
      )
      expect(result).toEqual(mockPokemon)
    })

    it('should handle error when axios.get fails in findOne', async () => {
      mockedRedis.get.mockResolvedValueOnce(null)
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'))

      await expect(PokemonService.findOne('bulbasaur')).rejects.toEqual({
        status: 500,
        message: 'Server error, please try again later',
      })
    })
  })

  describe('list', () => {
    const listResponse: PokemonList = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    }

    const bulbasaur: PokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
          },
        },
      ],
      types: [
        {
          type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        },
      ],
      sprites: {
        front_default: 'front.png',
        back_default: 'back.png',
        other: {
          'official-artwork': {
            front_default: 'art-front.png',
            back_default: 'art-back.png',
          },
        },
      },
    }

    const ivysaur = { ...bulbasaur, id: 2, name: 'ivysaur' }

    it('should return cached list if exists', async () => {
      const cacheKey = 'pokemon:list:limit=2:offset=0'
      mockedRedis.get.mockResolvedValueOnce(
        JSON.stringify([bulbasaur, ivysaur]),
      )

      const result = await PokemonService.list(2, 0)
      expect(redis.get).toHaveBeenCalledWith(cacheKey)
      expect(result).toEqual([bulbasaur, ivysaur])
    })

    it('should fetch list from API and populate individual cache entries', async () => {
      mockedRedis.get.mockResolvedValueOnce(null) // list cache
      mockedAxios.get.mockResolvedValueOnce({
        data: listResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '' },
      })

      mockedRedis.get
        .mockResolvedValueOnce(null) // bulbasaur not cached
        .mockResolvedValueOnce(null) // ivysaur not cached

      mockedAxios.get
        .mockResolvedValueOnce({
          data: bulbasaur,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: { url: '' },
        })
        .mockResolvedValueOnce({
          data: ivysaur,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: { url: '' },
        })

      const result = await PokemonService.list(2, 0)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=2&offset=0',
      )
      expect(mockedAxios.get).toHaveBeenCalledWith(listResponse.results[0].url)
      expect(mockedAxios.get).toHaveBeenCalledWith(listResponse.results[1].url)

      expect(redis.set).toHaveBeenCalledWith(
        'pokemon:bulbasaur',
        JSON.stringify(bulbasaur),
        'EX',
        3600,
      )
      expect(redis.set).toHaveBeenCalledWith(
        'pokemon:ivysaur',
        JSON.stringify(ivysaur),
        'EX',
        3600,
      )
      expect(result).toEqual({
        count: 2,
        next: false,
        previous: false,
        results: [bulbasaur, ivysaur],
      })
    })

    it('should handle error when axios.get fails in list', async () => {
      mockedRedis.get.mockResolvedValueOnce(null)
      mockedAxios.get.mockRejectedValueOnce(new Error('API failure'))

      await expect(PokemonService.list(2, 0)).rejects.toEqual({
        status: 500,
        message: 'Server error, please try again later',
      })
    })
  })
})
