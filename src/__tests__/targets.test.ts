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

  describe('B) Frontend tip uýgunlygy', () => {
    it('Target tipi `address` ulanýar; backend `url` gaýtarýar (MEÝDAN ADY UÝGUNSYZ)', async () => {
      // types/api.ts Target.address (required). Backend meýdany `url`.
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t, 'Target.address meýdany backend-de ýok (backend `url` ulanýar)').toHaveProperty('address')
    })

    it('Target tipi `is_verified` ulanýar; backend `verification_status` gaýtarýar', async () => {
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t, 'Target.is_verified ýerine backend verification_status berýär').toHaveProperty('is_verified')
    })

    it('Target tipi `name` ulanýar; backend bermeli', async () => {
      const { data } = await targetsApi.getTargets()
      const t = asList(data)[0]
      expect(t).toHaveProperty('name')
    })
  })
})
