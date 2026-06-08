import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { scansApi } from '../api/endpoints'
import { asList, expectFields, login, logout } from './helpers/live'

describe('Schedules API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('user')
  })
  afterAll(() => logout())

  describe('A) Backend kontrakt', () => {
    it('GET /scans/schedules/ -> frequency, custom_interval_minutes, is_enabled, next_run_at...', async () => {
      const { data } = await scansApi.getSchedules()
      const list = asList(data)
      expect(list.length, 'fixture schedule bolmaly').toBeGreaterThan(0)
      expectFields(
        list[0],
        [
          'id',
          'owner',
          'target',
          'scan_type',
          'frequency',
          'custom_interval_minutes',
          'next_run_at',
          'is_enabled',
          'queue_backend',
          'max_retries',
          'created_at',
        ],
        'Schedule (backend)',
      )
    })
  })

  describe('B) Frontend ↔ backend laýyklygy', () => {
    it('Schedule tipi `frequency`+`custom_interval_minutes` ulanýar (öňki `cron` däl)', async () => {
      const { data } = await scansApi.getSchedules()
      const s = asList(data)[0]
      expect(s, 'Schedule indi frequency okaýar').toHaveProperty('frequency')
      expect(s, 'Schedule custom_interval_minutes okaýar').toHaveProperty('custom_interval_minutes')
      expect(s, '`cron` backend meýdany däl').not.toHaveProperty('cron')
    })

    it('Schedule tipi `is_enabled` ulanýar (öňki `is_active` däl)', async () => {
      const { data } = await scansApi.getSchedules()
      const s = asList(data)[0]
      expect(s, 'Schedule indi is_enabled okaýar').toHaveProperty('is_enabled')
      expect(s, '`is_active` backend meýdany däl').not.toHaveProperty('is_active')
    })
  })
})
