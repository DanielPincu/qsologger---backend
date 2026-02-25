import { test, expect } from '@playwright/test'

test('register + login works', async ({ request }) => {
  const unique = Date.now()

  const email = `dl1test+${unique}@mail.com`
  const callsign = `DL1TEST${unique}`

  const register = await request.post('/auth/register', {
    data: {
      callsign,
      email,
      password: 'password123'
    }
  })

  expect(register.ok()).toBeTruthy()

  const login = await request.post('/auth/login', {
    data: {
      email,
      password: 'password123'
    }
  })

  expect(login.ok()).toBeTruthy()

  const body = await login.json()
  expect(body.token).toBeTruthy()
})