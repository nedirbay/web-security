import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { targetsApi } from '../api/endpoints'
import { asList, expectFields, login, logout } from './helpers/live'

describe('Targets API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('user') // user@guardly.com fixture target-iň eýesi
  })
  afterAll(() => logout())

  describe('A) Backend kontrakt', () => {
    it('GET /targets/ -> id, url, is_active, verification_status, owner', async () => {
      const { data } = await targetsApi.getTargets()
      const list = asList(data)
      expect(list.length, 'fixture target bolmaly').toBeGreaterThan(0)
      expectFields(
        list[0],
        [
          'id',
          'url',
          'is_active',
          'verification_method',
          'verification_token',
          'verification_status',
          'verified_at',
          'owner',
          'owner_email',
          'created_at',
          'updated_at',
        ],
        'Target (backend)',
      )
    })

    it('POST /targets/ täze target döredýär ({ url })', async () => {
      const { data, status } = await targetsApi.createTarget({
        url: `https://ct-${Date.now()}.example.com`,
      } as any)
      expect(status).toBe(201)
      expect(data).toHaveProperty('url')
    })
  })

  describe('B) Frontend ↔ backend laýyklygy', () => {
    it('Target tipi `url` ulanýar (öňki `address` däl)', async () => {
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t, 'Target indi `url` okaýar').toHaveProperty('url')
      expect(t, '`address` backend meýdany däl').not.toHaveProperty('address')
    })

    it('Target tipi `verification_status` ulanýar (öňki `is_verified` däl)', async () => {
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t, 'Target indi verification_status okaýar').toHaveProperty('verification_status')
      expect(t, '`is_verified` backend meýdany däl').not.toHaveProperty('is_verified')
    })

    it('Target-de `name` meýdany ýok (frontend tipinden aýryldy)', async () => {
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t, 'backend Target `name` bermeýär').not.toHaveProperty('name')
    })
  })
})
