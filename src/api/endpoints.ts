import apiClient from './axios'
import type {
  ApiKey,
  AuditLog,
  BlogPost,
  DocsPage,
  ListResponse,
  Paginated,
  Role,
  Scan,
  Schedule,
  Setting,
  Target,
  User,
  Vulnerability,
} from '../types/api'

export const systemApi = {
  getSchema: () => apiClient.get('/schema/'),
  getDocs: () => apiClient.get('/docs/', { responseType: 'text' }),
}

export const adminApi = {
  getDashboard: () => apiClient.get('/admin/dashboard/'),
  getUsers: (params?: Record<string, any>) => apiClient.get<ListResponse<User>>('/admin/users/', { params }),
  getUser: (id: number | string) => apiClient.get<User>(`/admin/users/${id}/`),
  updateUser: (id: number | string, data: Partial<User>) => apiClient.patch<User>(`/admin/users/${id}/`, data),
  deleteUser: (id: number | string) => apiClient.delete(`/admin/users/${id}/`),
  assignTargetToUser: (id: number | string, data: { target_id: number | string }) =>
    apiClient.post(`/admin/users/${id}/assign-target/`, data),
  getRoles: () => apiClient.get<ListResponse<Role>>('/admin/roles/'),
  getSettings: (params?: Record<string, any>) =>
    apiClient.get<ListResponse<Setting>>('/admin/settings/', { params }),
  createSetting: (data: Partial<Setting>) => apiClient.post<Setting>('/admin/settings/', data),
  getSetting: (id: number | string) => apiClient.get<Setting>(`/admin/settings/${id}/`),
  updateSetting: (id: number | string, data: Partial<Setting>) =>
    apiClient.patch<Setting>(`/admin/settings/${id}/`, data),
  deleteSetting: (id: number | string) => apiClient.delete(`/admin/settings/${id}/`),
  getAuditLogs: (params?: Record<string, any>) =>
    apiClient.get<Paginated<AuditLog> | AuditLog[]>('/admin/audit-logs/', { params }),
  getBlogPosts: (params?: Record<string, any>) =>
    apiClient.get<Paginated<BlogPost>>('/admin/blog-posts/', { params }),
  createBlogPost: (data: Partial<BlogPost>) => apiClient.post<BlogPost>('/admin/blog-posts/', data),
  getBlogPost: (id: number | string) => apiClient.get<BlogPost>(`/admin/blog-posts/${id}/`),
  updateBlogPost: (id: number | string, data: Partial<BlogPost>) =>
    apiClient.patch<BlogPost>(`/admin/blog-posts/${id}/`, data),
  deleteBlogPost: (id: number | string) => apiClient.delete(`/admin/blog-posts/${id}/`),
  getDocsPages: (params?: Record<string, any>) =>
    apiClient.get<Paginated<DocsPage> | DocsPage[]>('/admin/docs-pages/', { params }),
  createDocsPage: (data: Partial<DocsPage>) => apiClient.post<DocsPage>('/admin/docs-pages/', data),
  getDocsPage: (id: number | string) => apiClient.get<DocsPage>(`/admin/docs-pages/${id}/`),
  updateDocsPage: (id: number | string, data: Partial<DocsPage>) =>
    apiClient.patch<DocsPage>(`/admin/docs-pages/${id}/`, data),
  deleteDocsPage: (id: number | string) => apiClient.delete(`/admin/docs-pages/${id}/`),
}

export const usersApi = {
  register: (data: { username: string; email: string; password: string; password_confirm: string }) =>
    apiClient.post('/users/register/', data),
  login: (data: { email: string; password: string }) => apiClient.post('/users/login/', data),
  logout: () => apiClient.post('/users/logout/'),
  getUsers: (params?: Record<string, any>) => apiClient.get<ListResponse<User>>('/users/', { params }),
  getMe: () => apiClient.get<User>('/users/me/'),
  getProfile: () => apiClient.get<User>('/users/profile/'),
  updateProfile: (data: Partial<User>) => apiClient.patch<User>('/users/profile/', data),
  requestPasswordReset: (data: { email: string }) => apiClient.post('/users/password/reset/', data),
  confirmPasswordReset: (data: { token: string; password: string }) =>
    apiClient.post('/users/password/reset/confirm/', data),
  getApiKeys: (params?: Record<string, any>) => apiClient.get<ListResponse<ApiKey>>('/users/api-keys/', { params }),
  createApiKey: (data: { name: string }) => apiClient.post<ApiKey>('/users/api-keys/', data),
  getApiKey: (id: number | string) => apiClient.get<ApiKey>(`/users/api-keys/${id}/`),
  deleteApiKey: (id: number | string) => apiClient.delete(`/users/api-keys/${id}/`),
}

export const targetsApi = {
  getTargets: (params?: Record<string, any>) =>
    apiClient.get<ListResponse<Target>>('/targets/', { params }),
  createTarget: (data: Partial<Target>) => apiClient.post<Target>('/targets/', data),
  getTarget: (id: number | string) => apiClient.get<Target>(`/targets/${id}/`),
  updateTarget: (id: number | string, data: Partial<Target>) =>
    apiClient.patch<Target>(`/targets/${id}/`, data),
  deleteTarget: (id: number | string) => apiClient.delete(`/targets/${id}/`),
  toggleActive: (id: number | string) => apiClient.post<Target>(`/targets/${id}/toggle-active/`),
  verifyOwnership: (id: number | string, data?: { token?: string }) =>
    apiClient.post(`/targets/${id}/verify-ownership/`, data),
  assignOwner: (id: number | string, data: { user_id: number | string }) =>
    apiClient.post(`/targets/${id}/assign-owner/`, data),
}

export const scansApi = {
  getScans: (params?: Record<string, any>) => apiClient.get<ListResponse<Scan>>('/scans/', { params }),
  createScan: (data: { target: number | string; scan_type: string }) =>
    apiClient.post<Scan>('/scans/', data),
  getScan: (id: number | string) => apiClient.get<Scan>(`/scans/${id}/`),
  runScan: (id: number | string) => apiClient.post<Scan>(`/scans/${id}/run/`),
  getZapConfig: (params?: Record<string, any>) => apiClient.get('/scans/config/zap/', { params }),
  createZapConfig: (data: Record<string, any>) => apiClient.post('/scans/config/zap/', data),
  getSchedules: (params?: Record<string, any>) =>
    apiClient.get<ListResponse<Schedule>>('/scans/schedules/', { params }),
  createSchedule: (data: Partial<Schedule>) => apiClient.post<Schedule>('/scans/schedules/', data),
  enqueueScheduler: (data: { schedule_ids?: number[] }) =>
    apiClient.post('/scans/scheduler/enqueue/', data),
  runSchedulerWorker: (data?: Record<string, any>) =>
    apiClient.post('/scans/scheduler/worker-run/', data),
}

export const vulnerabilitiesApi = {
  getVulnerabilities: (params?: Record<string, any>) =>
    apiClient.get<ListResponse<Vulnerability>>('/scans/vulnerabilities/', { params }),
  getVulnerability: (id: number | string) =>
    apiClient.get<Vulnerability>(`/scans/vulnerabilities/${id}/`),
  getGroupedByOwasp: (params?: Record<string, any>) =>
    apiClient.get('/scans/vulnerabilities/group-by-owasp/', { params }),
  markFalsePositive: (id: number | string, data?: Record<string, any>) =>
    apiClient.post(`/scans/vulnerabilities/${id}/false-positive/`, data),
  updateLifecycle: (id: number | string, data: { status: string; note?: string }) =>
    apiClient.post(`/scans/vulnerabilities/${id}/lifecycle/`, data),
}

export const analyticsApi = {
  getVulnerabilityTrends: (params?: Record<string, any>) =>
    apiClient.get('/scans/analytics/vulnerability-trends/', { params }),
  getCommonIssues: (params?: Record<string, any>) =>
    apiClient.get('/scans/analytics/common-issues/', { params }),
  getScanSuccessRate: (params?: Record<string, any>) =>
    apiClient.get('/scans/analytics/scan-success-rate/', { params }),
  getRiskHeatmap: (params?: Record<string, any>) =>
    apiClient.get('/scans/analytics/risk-heatmap/', { params }),
  getTimeBasedReport: (params?: Record<string, any>) =>
    apiClient.get('/scans/analytics/time-based-report/', { params }),
}

export const advancedApi = {
  apiScan: (data: Record<string, any>) => apiClient.post('/scans/advanced/api-scan/', data),
  jwtCheck: (data: Record<string, any>) => apiClient.post('/scans/advanced/jwt-check/', data),
  graphqlScan: (data: Record<string, any>) => apiClient.post('/scans/advanced/graphql-scan/', data),
  headerAnalysis: (data: Record<string, any>) =>
    apiClient.post('/scans/advanced/header-analysis/', data),
  aiSummary: (data: Record<string, any>) => apiClient.post('/scans/advanced/ai-summary/', data),
}
