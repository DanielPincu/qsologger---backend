import { test, expect } from '@playwright/test'
import { distanceKm } from '../src/utils/distance.util'

test.describe('distanceKm', () => {
  test('returns 0 for identical coordinates', () => {
    const result = distanceKm(55.5, 9, 55.5, 9)

    expect(result).toBe(0)
  })

  test('returns the same distance regardless of direction', () => {
    const a = distanceKm(55.5, 9, 37.5, -97)
    const b = distanceKm(37.5, -97, 55.5, 9)

    expect(a).toBeCloseTo(b, 10)
  })

  test('returns a known approximate distance', () => {
    const result = distanceKm(55.5, 9, 37.5, -97)

    expect(result).toBeCloseTo(7539.05, 1)
  })

  test('returns a number greater than 0 for different coordinates', () => {
    const result = distanceKm(55.5, 9, 56.0, 10.0)

    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThan(0)
  })

  test('increases when points are farther apart', () => {
    const short = distanceKm(55.5, 9, 55.6, 9.1)
    const long = distanceKm(55.5, 9, 37.5, -97)

    expect(long).toBeGreaterThan(short)
  })
})