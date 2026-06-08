import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { scansApi } from '../api/endpoints'
import { asList, expectFields, login, logout } from './helpers/live'

describe('Scans API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('user')
  })
  afterAll(() => logout())

  describe('A) Backend kontrakt', () => {
    it('GET /scans/ -> id, owner, target, scan_type, status, depth, completed_at...', async () => {
      const { data } = await scansApi.getScans()
      const list = asList(data)
      expect(list.length, 'fixture scan bolmaly').toBeGreaterThan(0)
      expectFields(
        list[0],
        [
          'id',
          'owner',
          'target',
          'scan_type',
          'status',
          'depth',
          'attack_strength',
          'queue_backend',
          'max_retries',
          'created_at',
          'updated_at',
          'completed_at',
        ],
        'Scan (backend)',
      )
    })

    it('backend scan_type bahalary: passive|active|full|api (quick/port ÝOK)', async () => {
      const { data } = await scansApi.getScans()
      const allowed = ['passive', 'active', 'full', 'api']
      for (const s of asList(data)) {
        expect(allowed, `garaşylmadyk scan_type: ${s.scan_type}`).toContain(s.scan_type)
      }
    })
  })

  describe('B) Frontend ↔ backend laýyklygy', () => {
    it('Scan tipi `completed_at` ulanýar (öňki `finished_at` däl)', async () => {
      const { data } = await scansApi.getScans()
      const s = asList(data)[0]
      expect(s, 'Scan indi completed_at okaýar').toHaveProperty('completed_at')
      expect(s, '`finished_at` backend meýdany däl').not.toHaveProperty('finished_at')
    })

    it('Scan-de frontendiň öňki ýasama meýdanlary ýok (target_name/target_address/progress/vulnerabilities_count)', async () => {
      const { data } = await scansApi.getScans()
      const s = asList(data)[0]
      for (const f of ['target_name', 'target_address', 'progress', 'vulnerabilities_count']) {
        expect(s, `backend Scan \`${f}\` bermeýär`).not.toHaveProperty(f)
      }
    })

    it("frontend ScanType bahalary backend choices bilen gabat gelýär (passive|active|full|api)", async () => {
      // types/api.ts: ScanType = 'passive' | 'active' | 'full' | 'api'
      const frontendTypes = ['passive', 'active', 'full', 'api']
      const { data } = await scansApi.getScans()
      for (const s of asList(data)) {
        expect(frontendTypes, `scan_type ${s.scan_type} frontend ScanType-da bolmaly`).toContain(s.scan_type)
      }
    })
  })
})
