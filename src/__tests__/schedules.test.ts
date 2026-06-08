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

  describe('B) Frontend tip uýgunlygy', () => {
    it('Schedule tipi `cron` ulanýar; backend `frequency`+`custom_interval_minutes` gaýtarýar', async () => {
      const { data } = await scansApi.getSchedules()
      expect(asList(data)[0], 'frontend `cron`, backend `frequency`').toHaveProperty('cron')
    })

    it('Schedule tipi `is_active` ulanýar; backend `is_enabled` gaýtarýar', async () => {
      const { data } = await scansApi.getSchedules()
      expect(asList(data)[0], 'frontend `is_active`, backend `is_enabled`').toHaveProperty('is_active')
    })
  })
})
