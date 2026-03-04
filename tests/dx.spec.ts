import { test, expect } from '@playwright/test'

test('DX statistics and DXCC calculation works', async ({ request }) => {
  const unique = Date.now()

  const op1 = {
    callsign: `YO8TEST${unique}`,
    email: `yo8test+${unique}@mail.com`,
    password: 'password123',
    locator: 'JO45'
  }

  const op2 = {
    callsign: `DL3TEST${unique}`,
    email: `dl3test+${unique}@mail.com`,
    password: 'password123',
    locator: 'EM17'
  }

  // register operators
  await request.post('/auth/register', { data: op1 })
  await request.post('/auth/register', { data: op2 })

  // login
  const login1 = await request.post('/auth/login', {
    data: { email: op1.email, password: op1.password }
  })

  const login2 = await request.post('/auth/login', {
    data: { email: op2.email, password: op2.password }
  })

  const token1 = (await login1.json()).token
  const token2 = (await login2.json()).token

  const qsoPayload = {
    remoteCallsign: op2.callsign,
    band: '40m',
    mode: 'SSB',
    rstSent: '59',
    rstReceived: '59',
    qsoDate: new Date().toISOString()
  }

  const reversedPayload = {
    remoteCallsign: op1.callsign,
    band: '40m',
    mode: 'SSB',
    rstSent: '59',
    rstReceived: '59',
    qsoDate: qsoPayload.qsoDate
  }

  // create QSOs
  await request.post('/qso', {
    data: qsoPayload,
    headers: { Authorization: `Bearer ${token1}` }
  })

  await request.post('/qso', {
    data: reversedPayload,
    headers: { Authorization: `Bearer ${token2}` }
  })

  // check DX stats
  const stats = await request.get('/dx/stats', {
    headers: { Authorization: `Bearer ${token1}` }
  })

  const statsBody = await stats.json()

  expect(statsBody.confirmedQsos).toBe(1)
  expect(statsBody.longestQso).toBeGreaterThan(0)
  expect(statsBody.workedGrids).toBeGreaterThan(0)
  expect(statsBody.workedDXCC).toBeGreaterThan(0)

  // check DXCC
  const dxcc = await request.get('/dx/dxcc', {
    headers: { Authorization: `Bearer ${token1}` }
  })

  const dxccBody = await dxcc.json()

  expect(dxccBody.countriesWorked).toBeGreaterThan(0)
})