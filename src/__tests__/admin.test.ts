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

  describe('B) Frontend ↔ backend laýyklygy', () => {
    it('AuditLog tipi `entity_type`/`entity_id` ulanýar (öňki `target_type`/`target_id` däl)', async () => {
      const { data } = await adminApi.getAuditLogs()
      const log = asList(data)[0]
      expectFields(log, ['entity_type', 'entity_id'], 'AuditLog (frontend)')
      expect(log, '`target_type` backend meýdany däl').not.toHaveProperty('target_type')
    })

    it('createBlogPost `slug` bilen 201 berýär (slug hökmany, unique)', async () => {
      // Düzediş: AdminBlogPostsView indi slug ugradýar; BlogPost tipinde slug bar.
      const stamp = Date.now()
      const res = await adminApi.createBlogPost({
        title: `CT Post ${stamp}`,
        slug: `ct-post-${stamp}`,
        content: 'contract test body',
        tags: 'ct',
        status: 'published',
      })
      expect(res.status, 'slug bilen blog post 201 döreýär').toBe(201)
      // arassalama
      if (res.data?.id) await adminApi.deleteBlogPost(res.data.id)
    })

    it('AdminUser `role` nested obýekt ýa-da null (string `admin` däl)', async () => {
      // Düzediş: isAdmin role-a däl, is_staff-a esaslanýar. role -> { id, name } | null.
      const { data } = await adminApi.getUsers()
      const u: any = asList(data)[0]
      expect(['object'], 'role obýekt ýa-da null bolmaly, string däl').toContain(typeof u.role)
      expect(typeof u.role, 'role string `admin` däl').not.toBe('string')
    })
  })
})
