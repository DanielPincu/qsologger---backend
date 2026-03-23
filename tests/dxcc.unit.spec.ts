import { test, expect } from '@playwright/test'
import { getDXCCCountry } from '../src/utils/dxcc.util'

test.describe('getDXCCCountry', () => {
  test('returns Germany for DL prefix', () => {
    expect(getDXCCCountry('DL3DLL')).toBe('Germany')
  })

  test('returns Denmark for OZ prefix', () => {
    expect(getDXCCCountry('OZ1ABC')).toBe('Denmark')
  })

  test('handles portable callsigns', () => {
    expect(getDXCCCountry('DL/YO8UFO')).toBe('Germany')
  })

  test('returns null for unknown prefix', () => {
    expect(getDXCCCountry('ZZ1ABC')).toBeNull()
  })

  test('returns null for empty input', () => {
    expect(getDXCCCountry('')).toBeNull()
  })
})