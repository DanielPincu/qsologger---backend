import { test, expect } from '@playwright/test'

test('operator CRUD flow works', async ({ request }) => {
  const unique = Date.now()

  const email = `operator+${unique}@mail.com`
  const newEmail = `operator+${unique}@newmail.com`
  const callsign = `DL1OP${unique}`
  const password = 'password123'
  const newPassword = 'newpassword123'

  // Register
  const register = await request.post('/auth/register', {
    data: {
      callsign,
      email,
      password,
      locator: 'JO45'
    }
  })

  expect(register.ok()).toBeTruthy()

  // Login
  const login = await request.post('/auth/login', {
    data: { email, password }
  })

  expect(login.ok()).toBeTruthy()

  const loginBody = await login.json()
  const token = loginBody.token
  expect(token).toBeTruthy()

  const authHeaders = {
    Authorization: `Bearer ${token}`
  }

  // Get profile
  const getMe = await request.get('/operator/me', {
    headers: authHeaders
  })

  expect(getMe.ok()).toBeTruthy()

  // Update email
  const updateEmail = await request.put('/operator/me', {
    headers: authHeaders,
    data: { email: newEmail }
  })

  expect(updateEmail.ok()).toBeTruthy()

  const updatedBody = await updateEmail.json()
  expect(updatedBody.email).toBe(newEmail)

  // Update password
  const updatePassword = await request.put('/operator/me', {
    headers: authHeaders,
    data: {
      currentPassword: password,
      password: newPassword
    }
  })

  expect(updatePassword.ok()).toBeTruthy()

  const passwordResponse = await updatePassword.json()
  expect(passwordResponse.message).toBe('Password successfully updated')

  // Login with new password
  const loginNewPassword = await request.post('/auth/login', {
    data: { email: newEmail, password: newPassword }
  })

  expect(loginNewPassword.ok()).toBeTruthy()

  // Delete operator
  const deleteMe = await request.delete('/operator/me', {
    headers: authHeaders
  })

  expect(deleteMe.ok()).toBeTruthy()

  // Login should now fail
  const loginAfterDelete = await request.post('/auth/login', {
    data: { email: newEmail, password: newPassword }
  })

  expect(loginAfterDelete.ok()).toBeFalsy()
})