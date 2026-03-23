import { test, expect } from '@playwright/test'
import { locatorToLatLon } from '../src/utils/gridToLatLon.util'

test.describe('locatorToLatLon', () => {
  test('converts a 4-character locator to lat/lon center', () => {
    const result = locatorToLatLon('JO45')

    expect(result.lon).toBe(9)
    expect(result.lat).toBe(55.5)
  })

  test('accepts lowercase locator', () => {
    const result = locatorToLatLon('jo45')

    expect(result.lon).toBe(9)
    expect(result.lat).toBe(55.5)
  })

  test('changes coordinates when subsquare changes', () => {
    const a = locatorToLatLon('JO45aa')
    const b = locatorToLatLon('JO45bb')

    expect(b.lon).toBeGreaterThan(a.lon)
    expect(b.lat).toBeGreaterThan(a.lat)
  })

  test('returns numeric lat/lon', () => {
    const result = locatorToLatLon('JN58td')

    expect(typeof result.lat).toBe('number')
    expect(typeof result.lon).toBe('number')
  })
})