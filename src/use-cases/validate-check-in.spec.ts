import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should be able to validate an inexistent check-in', async () => {
    await expect(() => {
      return sut.execute({
        checkInId: 'inexistent-check-in-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to validate to check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 30))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twenTyOneMinutesInMilliseconds = 1000 * 60 * 21

    vi.advanceTimersByTime(twenTyOneMinutesInMilliseconds)

    await expect(() => {
      return sut.execute({
        checkInId: createdCheckIn.id,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
