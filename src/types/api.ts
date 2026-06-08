export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type ListResponse<T> = T[] | Paginated<T>

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  // Backend `role` core.Role-a ForeignKey (string `admin` däl). Admin paneli
  // bukulan obýekt gaýtaryp biler; adaty `/users/me/` ony bermeýär.
  // Admin barlagy üçin `is_staff` ulanylýar.
  role?: number | { id: number; name: string } | null
  is_staff?: boolean
  is_active?: boolean
  date_joined?: string
  profile?: Record<string, any> | null
}

export interface ApiKey {
  id: number
  name: string
  key?: string
  is_active?: boolean
  created_at?: string
  last_used_at?: string
}

export type TargetStatus = 'active' | 'inactive'
export type VerificationStatus = 'pending' | 'verified'

export interface Target {
  id: number
  url: string
  is_active: boolean
  verification_status?: VerificationStatus | string
  verification_method?: string
  verification_token?: string
  verified_at?: string
  owner?: number | string
  owner_email?: string
  created_at?: string
  updated_at?: string
}

export type ScanStatus = 'pending' | 'queued' | 'running' | 'completed' | 'failed'
export type ScanType = 'passive' | 'active' | 'full' | 'api'

export interface Scan {
  id: number
  owner?: number | string
  target: number
  scan_type: ScanType | string
  status: ScanStatus | string
  depth?: string | number
  started_at?: string
  completed_at?: string
  created_at?: string
}

export type Severity = 'High' | 'Medium' | 'Low' | 'Info'
export type LifecycleStatus = 'open' | 'reviewed' | 'fixed' | 'closed'

export interface Vulnerability {
  id: number
  scan?: number
  target?: number
  name: string
  severity: Severity | string
  lifecycle_status?: LifecycleStatus | string
  owasp_category?: string
  url?: string
  is_false_positive?: boolean
  created_at?: string
  updated_at?: string
}

export type ScheduleFrequency = 'daily' | 'weekly' | 'custom'

export interface Schedule {
  id: number
  target: number
  scan_type: ScanType | string
  frequency: ScheduleFrequency | string
  custom_interval_minutes?: number | null
  is_enabled?: boolean
  next_run_at?: string
  created_at?: string
}

export type BlogPostStatus = 'draft' | 'published'

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  tags: string
  status?: BlogPostStatus | string
  author?: string
  author_email?: string
  published_at?: string
  created_at?: string
}

export interface DocsPage {
  id: number
  title: string
  slug: string
  category: string
  content: string
  is_published?: boolean
}

export interface Setting {
  id: number
  key: string
  value: string
  description?: string
}

export interface AuditLog {
  id: number
  actor?: string
  actor_email?: string
  action: string
  entity_type?: string
  entity_id?: number | string
  metadata?: any
  created_at?: string
}

export interface Role {
  id?: number
  name: string
  description?: string
}

export interface FieldErrors {
  [field: string]: string[] | string
}
