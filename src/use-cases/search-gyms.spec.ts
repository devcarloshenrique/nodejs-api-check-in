import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SeachGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SeachGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SeachGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Fabrica de monstros',
      phone: null,
      description: null,
      latitude: -3.795195,
      longitude: -38.5487757,
    })

    await gymsRepository.create({
      title: 'Fabrica de Frangos',
      phone: null,
      description: null,
      latitude: -4.795195,
      longitude: -39.5487757,
    })

    const { gyms } = await sut.execute({
      query: 'Frangos',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Fabrica de Frangos' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        phone: null,
        description: null,
        latitude: -3.795195,
        longitude: -38.5487757,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
