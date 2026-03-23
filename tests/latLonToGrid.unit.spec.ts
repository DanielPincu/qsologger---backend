import { test, expect } from '@playwright/test'
import { latLonToGrid } from '../src/utils/latLonToGrid.util'

test.describe('latLonToGrid', () => {
  test('converts coordinates to a 4-character Maidenhead grid', () => {
    const result = latLonToGrid(55.5, 9)

    expect(result).toBe('JO45')
  })

  test('returns the correct grid for another known coordinate', () => {
    const result = latLonToGrid(37.5, -97)

    expect(result).toBe('EM17')
  })

  test('returns a 4-character string', () => {
    const result = latLonToGrid(48.137, 11.575)

    expect(result).toHaveLength(4)
  })

  test('returns uppercase letters followed by digits', () => {
    const result = latLonToGrid(55.5, 9)

    expect(result).toMatch(/^[A-Z]{2}[0-9]{2}$/)
  })

  test('changes grid when coordinates move far enough', () => {
    const a = latLonToGrid(55.5, 9)
    const b = latLonToGrid(56.5, 11)

    expect(b).not.toBe(a)
  })
})