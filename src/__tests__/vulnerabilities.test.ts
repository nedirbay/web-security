import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { vulnerabilitiesApi } from '../api/endpoints'
import { asList, expectFields, login, logout } from './helpers/live'

describe('Vulnerabilities API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('user')
  })
  afterAll(() => logout())

  describe('A) Backend kontrakt', () => {
    it('GET /scans/vulnerabilities/ -> id, name, severity, owasp_category, url, lifecycle_status...', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      const list = asList(data)
      expect(list.length, 'fixture vulnerability bolmaly').toBeGreaterThan(0)
      expectFields(
        list[0],
        [
          'id',
          'scan',
          'target',
          'owner',
          'name',
          'severity',
          'owasp_category',
          'url',
          'is_false_positive',
          'lifecycle_status',
          'created_at',
          'updated_at',
        ],
        'Vulnerability (backend)',
      )
    })

    it('backend severity bahalary baş harply: High|Medium|Low|Info', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      const allowed = ['High', 'Medium', 'Low', 'Info']
      for (const v of asList(data)) {
        expect(allowed, `garaşylmadyk severity: ${v.severity}`).toContain(v.severity)
      }
    })
  })

  describe('B) Frontend ↔ backend laýyklygy', () => {
    it('Vulnerability tipi `lifecycle_status` ulanýar (öňki `status` däl)', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      const v = asList(data)[0]
      expect(v, 'Vuln indi lifecycle_status okaýar').toHaveProperty('lifecycle_status')
      expect(v, '`status` backend meýdany däl').not.toHaveProperty('status')
    })

    it('Vulnerability tipi `name` ulanýar (öňki `title` däl)', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      const v = asList(data)[0]
      expect(v, 'Vuln indi name okaýar').toHaveProperty('name')
      expect(v, '`title` backend meýdany däl').not.toHaveProperty('title')
    })

    it('frontend Severity bahalary backend bilen gabat gelýär (High|Medium|Low|Info)', async () => {
      // types/api.ts Severity = 'High' | 'Medium' | 'Low' | 'Info'
      const frontendSeverities = ['High', 'Medium', 'Low', 'Info']
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      for (const v of asList(data)) {
        expect(frontendSeverities, `severity ${v.severity} frontend Severity-de bolmaly`).toContain(v.severity)
      }
    })

    it("updateLifecycle backend-laýyk status (`fixed`) iberýär -> 200", async () => {
      // Düzediş: lifecycle bahalary indi open|reviewed|fixed|closed.
      const list = asList((await vulnerabilitiesApi.getVulnerabilities()).data)
      const id = list[0].id
      const res = await vulnerabilitiesApi.updateLifecycle(id, { status: 'fixed' })
      expect(res.status, "`fixed` statusy backend tarapyndan kabul edilýär").toBe(200)
    })
  })
})
