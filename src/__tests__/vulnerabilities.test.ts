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

  describe('B) Frontend tip uýgunlygy', () => {
    it('Vulnerability tipi `status` ulanýar; backend `lifecycle_status` gaýtarýar (MEÝDAN ADY UÝGUNSYZ)', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      expect(asList(data)[0], 'frontend `status`, backend `lifecycle_status`').toHaveProperty('status')
    })

    it('Vulnerability tipiniň `severity` bahalary kiçi harp (frontend), backend baş harp ulanýar', async () => {
      // types/api.ts Severity = 'critical' | 'high' | ... (kiçi harp)
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      const v = asList(data)[0]
      const frontendSeverities = ['critical', 'high', 'medium', 'low', 'info']
      expect(
        frontendSeverities,
        `backend severity "${v.severity}" frontend Severity bahalaryna gabat gelmeli`,
      ).toContain(v.severity)
    })

    it('Vulnerability tipi `title` ulanýar; backend `name` gaýtarýar', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      expect(asList(data)[0]).toHaveProperty('title')
    })

    it('Vulnerability tipi `description`, `cwe`, `cvss`, `evidence`, `remediation` ulanýar; backend bermeli', async () => {
      const { data } = await vulnerabilitiesApi.getVulnerabilities()
      expectFields(
        asList(data)[0],
        ['description', 'cwe', 'cvss', 'evidence', 'remediation'],
        'Vulnerability (frontend goşmaça meýdanlary)',
      )
    })

    it("updateLifecycle 'critical'/'resolved' ýaly frontend status bahalary backend tarapyndan kabul edilmeli", async () => {
      // Backend lifecycle allowed: open|reviewed|fixed|closed
      // Frontend VulnStatus: open|in_progress|resolved|closed|false_positive
      const list = asList((await vulnerabilitiesApi.getVulnerabilities()).data)
      const id = list[0].id
      let status = 0
      try {
        const res = await vulnerabilitiesApi.updateLifecycle(id, { status: 'resolved' })
        status = res.status
      } catch (e: any) {
        status = e.response?.status ?? 0
      }
      expect(status, "frontend 'resolved' statusy backend tarapyndan kabul edilmeli (200)").toBe(200)
    })
  })
})
