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

  describe('B) Frontend tip uýgunlygy', () => {
    it('Scan tipi `target_name` ulanýar; backend bermeli', async () => {
      const { data } = await scansApi.getScans()
      expect(asList(data)[0]).toHaveProperty('target_name')
    })

    it('Scan tipi `target_address` ulanýar; backend bermeli', async () => {
      const { data } = await scansApi.getScans()
      expect(asList(data)[0]).toHaveProperty('target_address')
    })

    it('Scan tipi `progress` ulanýar; backend bermeli', async () => {
      const { data } = await scansApi.getScans()
      expect(asList(data)[0]).toHaveProperty('progress')
    })

    it('Scan tipi `finished_at` ulanýar; backend `completed_at` gaýtarýar (AT UÝGUNSYZ)', async () => {
      const { data } = await scansApi.getScans()
      expect(asList(data)[0]).toHaveProperty('finished_at')
    })

    it('Scan tipi `vulnerabilities_count` ulanýar; backend bermeli', async () => {
      const { data } = await scansApi.getScans()
      expect(asList(data)[0]).toHaveProperty('vulnerabilities_count')
    })

    it("frontend ScanType 'quick'/'port' backend tarapyndan goldanmaly", async () => {
      // types/api.ts: ScanType = 'full' | 'quick' | 'api' | 'port'
      // Backend ScanType.choices: passive|active|full|api -> quick/port ÝALŇYŞ
      const backendTypes = ['passive', 'active', 'full', 'api']
      expect(backendTypes, "ScanType 'quick' backend-de ýok").toContain('quick')
      expect(backendTypes, "ScanType 'port' backend-de ýok").toContain('port')
    })
  })
})
