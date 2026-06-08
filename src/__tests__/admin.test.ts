import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { adminApi } from '../api/endpoints'
import { asList, expectFields, login, logout } from './helpers/live'

describe('Admin API ↔ frontend modelleri', () => {
  beforeAll(async () => {
    await login('admin')
  })
  afterAll(() => logout())

  describe('A) Backend kontrakt', () => {
    it('GET /admin/users/ -> AdminUserSerializer (role nested obýekt)', async () => {
      const { data } = await adminApi.getUsers()
      const list = asList(data)
      expect(list.length).toBeGreaterThan(0)
      expectFields(
        list[0],
        ['id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'role', 'date_joined'],
        'AdminUser',
      )
    })

    it('GET /admin/settings/ -> id, key, value, description', async () => {
      const { data } = await adminApi.getSettings()
      const list = asList(data)
      expect(list.length).toBeGreaterThan(0)
      expectFields(list[0], ['id', 'key', 'value', 'description'], 'Setting')
    })

    it('GET /admin/blog-posts/ -> id, title, content, tags, slug, status', async () => {
      const { data } = await adminApi.getBlogPosts()
      const list = asList(data)
      expect(list.length).toBeGreaterThan(0)
      expectFields(
        list[0],
        ['id', 'author', 'author_email', 'title', 'slug', 'content', 'tags', 'status', 'published_at'],
        'BlogPost (backend)',
      )
    })

    it('GET /admin/docs-pages/ -> id, title, slug, category, content, is_published', async () => {
      const { data } = await adminApi.getDocsPages()
      const list = asList(data)
      expect(list.length).toBeGreaterThan(0)
      expectFields(list[0], ['id', 'title', 'slug', 'category', 'content', 'is_published'], 'DocsPage')
    })

    it('GET /admin/audit-logs/ -> entity_type, entity_id, actor, action, metadata', async () => {
      const { data } = await adminApi.getAuditLogs()
      const list = asList(data)
      expect(list.length).toBeGreaterThan(0)
      expectFields(
        list[0],
        ['id', 'actor', 'actor_email', 'action', 'entity_type', 'entity_id', 'metadata', 'created_at'],
        'AuditLog (backend)',
      )
    })

    it('GET /admin/dashboard/ -> total_scans, active_targets, critical_vulnerabilities, system_health', async () => {
      const { data } = await adminApi.getDashboard()
      expectFields(
        data,
        ['total_scans', 'active_targets', 'critical_vulnerabilities', 'system_health'],
        'Dashboard',
      )
    })
  })

  describe('B) Frontend tip uýgunlygy', () => {
    it('AuditLog tipi `target_type`/`target_id` ulanýar; backend `entity_type`/`entity_id` gaýtarýar', async () => {
      const { data } = await adminApi.getAuditLogs()
      const log = asList(data)[0]
      expectFields(log, ['target_type', 'target_id'], 'AuditLog (frontend)')
    })

    it('BlogPost döretmek üçin frontend `slug` ibermeli (backend hökmany, unique talap edýär)', () => {
      // types/api.ts BlogPost-de `slug` ýok, emma model `slug` (unique, required).
      // Frontend createBlogPost slug-syz iberse backend 400 berer.
      const blogPostTypeFields = ['id', 'title', 'content', 'tags', 'author', 'author_email', 'published_at']
      expect(blogPostTypeFields, 'BlogPost tipinde `slug` bolmaly').toContain('slug')
    })

    it('User tipi (admin) `role`-y string hökmünde ulanýar; backend nested obýekt gaýtarýar', async () => {
      // auth store isAdmin: user.role === "admin" (string). AdminUserSerializer role -> { id, name, ... }
      const { data } = await adminApi.getUsers()
      const u = asList(data)[0]
      expect(typeof u.role, 'frontend role:string garaşýar, backend obýekt berýär').toBe('string')
    })
  })
})
