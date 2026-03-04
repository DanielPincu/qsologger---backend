import { test, expect } from '@playwright/test'

test('QSO auto confirmation works', async ({ request }) => {
  const unique = Date.now()

  const op1 = {
    callsign: `YO8UFO${unique}`,
    email: `yo8ufo+${unique}@test.com`,
    password: 'password123',
    locator: 'JO45'
  }

  const op2 = {
    callsign: `DL3DLL${unique}`,
    email: `dl3dll+${unique}@test.com`,
    password: 'password123',
    locator: 'EM17'
  }

  // register operator 1
  await request.post('/auth/register', { data: op1 })

  // register operator 2
  await request.post('/auth/register', { data: op2 })

  // login operator 1
  const login1 = await request.post('/auth/login', {
    data: { email: op1.email, password: op1.password }
  })

  const token1 = (await login1.json()).token

  // login operator 2
  const login2 = await request.post('/auth/login', {
    data: { email: op2.email, password: op2.password }
  })

  const token2 = (await login2.json()).token

  const headers1 = { Authorization: `Bearer ${token1}` }
  const headers2 = { Authorization: `Bearer ${token2}` }

  const qsoDate = new Date().toISOString()

  // operator 1 logs QSO
  const qso1 = await request.post('/qso', {
    headers: headers1,
    data: {
      remoteCallsign: op2.callsign,
      band: '40m',
      mode: 'SSB',
      rstSent: '59',
      rstReceived: '59',
      qsoDate
    }
  })

  expect(qso1.ok()).toBeTruthy()

  const qso1Body = await qso1.json()
  expect(qso1Body.confirmed).toBeFalsy()

  // operator 2 logs reversed QSO
  const qso2 = await request.post('/qso', {
    headers: headers2,
    data: {
      remoteCallsign: op1.callsign,
      band: '40m',
      mode: 'SSB',
      rstSent: '59',
      rstReceived: '59',
      qsoDate
    }
  })

  expect(qso2.ok()).toBeTruthy()

  const qso2Body = await qso2.json()
  expect(qso2Body.confirmed).toBeTruthy()

  // fetch operator1 qsos
  const list = await request.get('/qso', {
    headers: headers1
  })

  const qsos = await list.json()

  expect(qsos[0].confirmed).toBeTruthy()

  const qsoId = qsos[0]._id

  // update should fail
  const update = await request.put(`/qso/${qsoId}`, {
    headers: headers1,
    data: { rstSent: '58' }
  })

  expect(update.status()).toBe(400)

  // delete should fail
  const del = await request.delete(`/qso/${qsoId}`, {
    headers: headers1
  })

  expect(del.status()).toBe(400)
})