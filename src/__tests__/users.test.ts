import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { usersApi } from '../api/endpoints'
import apiClient from '../api/axios'
import { CREDENTIALS, expectFields, login, logout } from './helpers/live'

describe('Users API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('admin')
  })
  afterAll(() => logout())

  // ---- A) Backend hakyky kontrakt ----
  describe('A) Backend kontrakt', () => {
    it('POST /users/login/ -> { access, refresh } gaýtarýar', async () => {
      const { data } = await apiClient.post('/users/login/', CREDENTIALS.admin)
      expectFields(data, ['access', 'refresh'], 'login jogaby')
    })

    it('GET /users/me/ -> id, email, username, is_staff, profile', async () => {
      const { data } = await usersApi.getMe()
      expectFields(
        data,
        ['id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'profile'],
        '/users/me/',
      )
    })

    it('GET /users/api-keys/ -> id, name, key, is_active, created_at', async () => {
      const { data } = await usersApi.getApiKeys()
      const list = Array.isArray(data) ? data : (data as any).results
      expect(Array.isArray(list)).toBe(true)
      if (list.length) {
        expectFields(list[0], ['id', 'name', 'key', 'is_active', 'created_at', 'last_used_at'], 'ApiKey')
      }
    })
  })

  // ---- B) Frontend tipiniň çaklamalary (uýgunsyzlyk detektory) ----
  describe('B) Frontend tip uýgunlygy', () => {
    it('login jogaby `user` obýektini öz içine almaly (auth store `response.data.user` okaýar)', async () => {
      // auth.ts -> persistUser(response.data.user). Backend diňe access/refresh gaýtarýar.
      const { data } = await apiClient.post('/users/login/', CREDENTIALS.admin)
      expect(data.user, 'auth store login-de user garaşýar, backend bermeýär').toBeDefined()
    })

    it('GET /users/me/ `role` meýdanyny gaýtarmaly (auth store isAdmin = user.role === "admin")', async () => {
      // auth.ts getter: isAdmin -> state.user?.role === "admin". UserSerializer-de `role` ýok.
      const { data } = await usersApi.getMe()
      expect(data, "User tipi `role` ulanýar emma /users/me/ ony bermeýär").toHaveProperty('role')
    })

    it('User tipi `phone` ulanýar; backend ony serializasiýa etmeli', async () => {
      const { data } = await usersApi.getMe()
      expect(data).toHaveProperty('phone')
    })

    it('register({username,email,password}) — frontend payload backend tarapyndan kabul edilmeli', async () => {
      // usersApi.register diňe username/email/password ugradýar.
      // Backend UserRegistrationSerializer `password_confirm`-y hökmany talap edýär.
      const unique = `ct_${Date.now()}@example.com`
      let status = 0
      try {
        const res = await usersApi.register({
          username: `ct_${Date.now()}`,
          email: unique,
          password: 'StrongPass123!',
        })
        status = res.status
      } catch (e: any) {
        status = e.response?.status ?? 0
      }
      expect(status, 'frontend register payload-y password_confirm-siz 201 bermeli').toBe(201)
    })

    it('ApiKey tipi `prefix` ulanýar; backend ony bermeli', async () => {
      const { data } = await usersApi.getApiKeys()
      const list = Array.isArray(data) ? data : (data as any).results
      if (list.length) expect(list[0]).toHaveProperty('prefix')
    })
  })
})
