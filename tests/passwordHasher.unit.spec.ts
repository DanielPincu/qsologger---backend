import { test, expect } from '@playwright/test'
import { hashPassword, comparePassword } from '../src/utils/passwordHasher.util'

test.describe('passwordHasher', () => {
  test('hashPassword returns a hashed value', async () => {
    const password = 'password123'
    const hash = await hashPassword(password)

    expect(hash).toBeTruthy()
    expect(hash).not.toBe(password)
  })

  test('comparePassword returns true for correct password', async () => {
    const password = 'password123'
    const hash = await hashPassword(password)

    const isMatch = await comparePassword(password, hash)

    expect(isMatch).toBe(true)
  })

  test('comparePassword returns false for wrong password', async () => {
    const password = 'password123'
    const hash = await hashPassword(password)

    const isMatch = await comparePassword('wrongpassword', hash)

    expect(isMatch).toBe(false)
  })

  test('hashing the same password twice returns different hashes', async () => {
    const password = 'password123'

    const hash1 = await hashPassword(password)
    const hash2 = await hashPassword(password)

    expect(hash1).not.toBe(hash2)
  })
})