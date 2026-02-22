import { test, expect } from '@playwright/test'

test('register + login works', async ({ request }) => {
  const register = await request.post('/user/register', {
    data: {
      callsign: 'DL1TEST',
      email: 'dl1test@mail.com',
      password: 'password123'
    }
  })

  expect(register.ok()).toBeTruthy()

  const login = await request.post('/user/login', {
    data: {
      email: 'dl1test@mail.com',
      password: 'password123'
    }
  })

  const body = await login.json()
  expect(body.token).toBeTruthy()
})