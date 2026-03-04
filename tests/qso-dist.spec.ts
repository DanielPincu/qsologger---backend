import { test, expect } from '@playwright/test'

test('QSO returns coordinates and distance', async ({ request }) => {
  const unique = Date.now()

  const email1 = `yo8ufo+${unique}@mail.com`
  const email2 = `dl3dll+${unique}@mail.com`

  const callsign1 = `YO8UFO${unique}`
  const callsign2 = `DL3DLL${unique}`

  // register operator 1
  const reg1 = await request.post('/auth/register', {
    data: {
      callsign: callsign1,
      email: email1,
      password: 'password123',
      locator: 'JO45'
    }
  })

  expect(reg1.ok()).toBeTruthy()

  // register operator 2
  const reg2 = await request.post('/auth/register', {
    data: {
      callsign: callsign2,
      email: email2,
      password: 'password123',
      locator: 'EM17'
    }
  })

  expect(reg2.ok()).toBeTruthy()

  // login operator 1
  const login1 = await request.post('/auth/login', {
    data: { email: email1, password: 'password123' }
  })

  const body1 = await login1.json()
  const token1 = body1.token

  // login operator 2
  const login2 = await request.post('/auth/login', {
    data: { email: email2, password: 'password123' }
  })

  const body2 = await login2.json()
  const token2 = body2.token

  const qsoDate = new Date().toISOString()

  // operator 1 logs QSO
  await request.post('/qso', {
    headers: { Authorization: `Bearer ${token1}` },
    data: {
      remoteCallsign: callsign2,
      band: '40m',
      mode: 'SSB',
      rstSent: '59',
      rstReceived: '59',
      qsoDate
    }
  })

  // operator 2 logs reverse QSO (confirms match)
  await request.post('/qso', {
    headers: { Authorization: `Bearer ${token2}` },
    data: {
      remoteCallsign: callsign1,
      band: '40m',
      mode: 'SSB',
      rstSent: '59',
      rstReceived: '59',
      qsoDate
    }
  })

  // fetch QSOs for operator 1
  const qsos = await request.get('/qso', {
    headers: { Authorization: `Bearer ${token1}` }
  })

  expect(qsos.ok()).toBeTruthy()

  const data = await qsos.json()

  const qso = data[0]

  expect(qso.from).toBeTruthy()
  expect(qso.to).toBeTruthy()
  expect(qso.distanceKm).toBeGreaterThan(0)
})