import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      phone: null,
      description: null,
      latitude: -3.795195,
      longitude: -38.5487757,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      phone: null,
      description: null,
      latitude: -3.895195,
      longitude: -38.7487757,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.795195,
      userLongitude: -38.5487757,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
