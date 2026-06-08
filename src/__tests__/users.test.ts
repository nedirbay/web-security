import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usersApi } from '../api/endpoints'
import apiClient from '../api/axios'
import { useAuthStore } from '../stores/auth'
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

  // ---- B) Frontend ↔ backend laýyklygy (düzedilenden soň) ----
  describe('B) Frontend ↔ backend laýyklygy', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    it('auth store login() ulanyjyny /users/me/ arkaly doldurýar (login `user` gaýtarmaýar)', async () => {
      // Düzediş: auth.ts login() token saklap, soňra fetchMe() çagyrýar.
      const store = useAuthStore()
      const ok = await store.login(CREDENTIALS.admin)
      expect(ok, 'login üstünlikli bolmaly').toBe(true)
      expect(store.user, 'login soňra user doldurylmaly').toBeTruthy()
      expect(store.user).toHaveProperty('id')
      expect(store.user).toHaveProperty('email')
    })

    it('isAdmin `is_staff`-a esaslanýar (role string `admin` däl — role FK)', async () => {
      // Düzediş: isAdmin getter -> user?.is_staff === true.
      const store = useAuthStore()
      await store.login(CREDENTIALS.admin)
      expect(store.user?.is_staff, 'admin ulanyjy is_staff=true').toBe(true)
      expect(store.isAdmin, 'isAdmin is_staff arkaly true').toBe(true)
    })

    it('GET /users/me/ `phone` meýdanyny serializasiýa edýär', async () => {
      const { data } = await usersApi.getMe()
      expect(data, 'UserSerializer indi phone berýär').toHaveProperty('phone')
    })

    it('register({username,email,password,password_confirm}) -> 201', async () => {
      // Düzediş: usersApi.register indi password_confirm ugradýar.
      const unique = `ct_${Date.now()}`
      const res = await usersApi.register({
        username: unique,
        email: `${unique}@example.com`,
        password: 'StrongPass123!',
        password_confirm: 'StrongPass123!',
      })
      expect(res.status, 'password_confirm bilen register 201 bermeli').toBe(201)
    })

    it('ApiKey backend `is_active` berýär (`prefix` ýok)', async () => {
      const { data } = await usersApi.getApiKeys()
      const list = Array.isArray(data) ? data : (data as any).results
      if (list.length) {
        expect(list[0], 'ApiKey is_active ulanýar').toHaveProperty('is_active')
        expect(list[0], 'ApiKey-de prefix ýok').not.toHaveProperty('prefix')
      }
    })
  })
})
