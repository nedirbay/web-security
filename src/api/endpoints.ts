import apiClient from './axios'

export const systemApi = {
  getSchema: () => apiClient.get('/schema/'),
  getDocs: () => apiClient.get('/docs/', { responseType: 'text' }),
}

export const adminApi = {
  getDashboard: () => apiClient.get('/admin/dashboard/'),
  getUsers: (params?: any) => apiClient.get('/admin/users/', { params }),
  getUser: (id: number | string) => apiClient.get(`/admin/users/${id}/`),
  updateUser: (id: number | string, data: any) => apiClient.patch(`/admin/users/${id}/`, data),
  deleteUser: (id: number | string) => apiClient.delete(`/admin/users/${id}/`),
  assignTargetToUser: (id: number | string, data: any) => apiClient.post(`/admin/users/${id}/assign-target/`, data),
  getRoles: () => apiClient.get('/admin/roles/'),
  getSettings: (params?: any) => apiClient.get('/admin/settings/', { params }),
  createSetting: (data: any) => apiClient.post('/admin/settings/', data),
  getSetting: (id: number | string) => apiClient.get(`/admin/settings/${id}/`),
  updateSetting: (id: number | string, data: any) => apiClient.patch(`/admin/settings/${id}/`, data),
  deleteSetting: (id: number | string) => apiClient.delete(`/admin/settings/${id}/`),
  getAuditLogs: (params?: any) => apiClient.get('/admin/audit-logs/', { params }),
  getBlogPosts: (params?: any) => apiClient.get('/admin/blog-posts/', { params }),
  createBlogPost: (data: any) => apiClient.post('/admin/blog-posts/', data),
  getBlogPost: (id: number | string) => apiClient.get(`/admin/blog-posts/${id}/`),
  updateBlogPost: (id: number | string, data: any) => apiClient.patch(`/admin/blog-posts/${id}/`, data),
  deleteBlogPost: (id: number | string) => apiClient.delete(`/admin/blog-posts/${id}/`),
  getDocsPages: (params?: any) => apiClient.get('/admin/docs-pages/', { params }),
  createDocsPage: (data: any) => apiClient.post('/admin/docs-pages/', data),
  getDocsPage: (id: number | string) => apiClient.get(`/admin/docs-pages/${id}/`),
  updateDocsPage: (id: number | string, data: any) => apiClient.patch(`/admin/docs-pages/${id}/`, data),
  deleteDocsPage: (id: number | string) => apiClient.delete(`/admin/docs-pages/${id}/`),
}

export const usersApi = {
  register: (data: any) => apiClient.post('/users/register/', data),
  login: (data: any) => apiClient.post('/users/login/', data),
  logout: () => apiClient.post('/users/logout/'),
  getUsers: (params?: any) => apiClient.get('/users/', { params }),
  getMe: () => apiClient.get('/users/me/'),
  getProfile: () => apiClient.get('/users/profile/'),
  updateProfile: (data: any) => apiClient.patch('/users/profile/', data),
  requestPasswordReset: (data: any) => apiClient.post('/users/password/reset/', data),
  confirmPasswordReset: (data: any) => apiClient.post('/users/password/reset/confirm/', data),
  getApiKeys: (params?: any) => apiClient.get('/users/api-keys/', { params }),
  createApiKey: (data: any) => apiClient.post('/users/api-keys/', data),
  getApiKey: (id: number | string) => apiClient.get(`/users/api-keys/${id}/`),
  deleteApiKey: (id: number | string) => apiClient.delete(`/users/api-keys/${id}/`),
}

export const targetsApi = {
  getTargets: (params?: any) => apiClient.get('/targets/', { params }),
  createTarget: (data: any) => apiClient.post('/targets/', data),
  getTarget: (id: number | string) => apiClient.get(`/targets/${id}/`),
  updateTarget: (id: number | string, data: any) => apiClient.patch(`/targets/${id}/`, data),
  deleteTarget: (id: number | string) => apiClient.delete(`/targets/${id}/`),
  toggleActive: (id: number | string) => apiClient.post(`/targets/${id}/toggle-active/`),
  verifyOwnership: (id: number | string, data?: any) => apiClient.post(`/targets/${id}/verify-ownership/`, data),
  assignOwner: (id: number | string, data: any) => apiClient.post(`/targets/${id}/assign-owner/`, data),
}

export const scansApi = {
  getScans: (params?: any) => apiClient.get('/scans/', { params }),
  createScan: (data: any) => apiClient.post('/scans/', data),
  runScan: (id: number | string) => apiClient.post(`/scans/${id}/run/`),
  getZapConfig: (params?: any) => apiClient.get('/scans/config/zap/', { params }),
  createZapConfig: (data: any) => apiClient.post('/scans/config/zap/', data),
  getSchedules: (params?: any) => apiClient.get('/scans/schedules/', { params }),
  createSchedule: (data: any) => apiClient.post('/scans/schedules/', data),
  enqueueScheduler: (data: any) => apiClient.post('/scans/scheduler/enqueue/', data),
  runSchedulerWorker: (data?: any) => apiClient.post('/scans/scheduler/worker-run/', data),
}

export const vulnerabilitiesApi = {
  getVulnerabilities: (params?: any) => apiClient.get('/scans/vulnerabilities/', { params }),
  getGroupedByOwasp: (params?: any) => apiClient.get('/scans/vulnerabilities/group-by-owasp/', { params }),
  markFalsePositive: (id: number | string, data?: any) => apiClient.post(`/scans/vulnerabilities/${id}/false-positive/`, data),
  updateLifecycle: (id: number | string, data: any) => apiClient.post(`/scans/vulnerabilities/${id}/lifecycle/`, data),
}

export const analyticsApi = {
  getVulnerabilityTrends: (params?: any) => apiClient.get('/scans/analytics/vulnerability-trends/', { params }),
  getCommonIssues: (params?: any) => apiClient.get('/scans/analytics/common-issues/', { params }),
  getScanSuccessRate: (params?: any) => apiClient.get('/scans/analytics/scan-success-rate/', { params }),
  getRiskHeatmap: (params?: any) => apiClient.get('/scans/analytics/risk-heatmap/', { params }),
  getTimeBasedReport: (params?: any) => apiClient.get('/scans/analytics/time-based-report/', { params }),
}

export const advancedApi = {
  apiScan: (data: any) => apiClient.post('/scans/advanced/api-scan/', data),
  jwtCheck: (data: any) => apiClient.post('/scans/advanced/jwt-check/', data),
  graphqlScan: (data: any) => apiClient.post('/scans/advanced/graphql-scan/', data),
  headerAnalysis: (data: any) => apiClient.post('/scans/advanced/header-analysis/', data),
  aiSummary: (data: any) => apiClient.post('/scans/advanced/ai-summary/', data),
}

