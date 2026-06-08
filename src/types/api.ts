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
  role?: string
  phone?: string
  is_active?: boolean
  date_joined?: string
}

export interface ApiKey {
  id: number
  name: string
  key?: string
  prefix?: string
  created_at?: string
  last_used_at?: string
}

export type TargetStatus = 'active' | 'inactive'

export interface Target {
  id: number
  name?: string
  address: string
  is_active: boolean
  is_verified?: boolean
  owner?: number | string
  owner_email?: string
  created_at?: string
  updated_at?: string
}

export type ScanStatus = 'pending' | 'running' | 'in_progress' | 'completed' | 'failed' | 'cancelled'
export type ScanType = 'full' | 'quick' | 'api' | 'port'

export interface Scan {
  id: number
  target: number
  target_name?: string
  target_address?: string
  scan_type: ScanType | string
  status: ScanStatus | string
  progress?: number
  started_at?: string
  finished_at?: string
  created_at?: string
  vulnerabilities_count?: number
}

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'
export type VulnStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'false_positive'

export interface Vulnerability {
  id: number
  scan?: number
  target?: number
  target_address?: string
  title?: string
  name?: string
  description?: string
  severity: Severity | string
  status: VulnStatus | string
  owasp_category?: string
  owasp?: string
  cwe?: string
  cvss?: number
  evidence?: string
  remediation?: string
  url?: string
  created_at?: string
  updated_at?: string
}

export interface Schedule {
  id: number
  target: number
  target_name?: string
  target_address?: string
  cron: string
  scan_type: ScanType | string
  is_active?: boolean
  next_run_at?: string
  created_at?: string
}

export interface BlogPost {
  id: number
  title: string
  content: string
  tags: string
  author?: string
  author_email?: string
  published_at?: string
}

export interface DocsPage {
  id: number
  title: string
  slug: string
  category: string
  content: string
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
  user?: string
  action: string
  target_type?: string
  target_id?: number | string
  object?: string
  details?: any
  metadata?: any
  created_at?: string
  timestamp?: string
}

export interface Role {
  id?: number
  name: string
  description?: string
}

export interface FieldErrors {
  [field: string]: string[] | string
}
