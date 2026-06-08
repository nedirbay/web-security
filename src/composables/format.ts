export const formatDate = (s?: string | null) => {
  if (!s) return '-'
  try {
    return new Date(s).toLocaleDateString()
  } catch {
    return '-'
  }
}

export const formatDateTime = (s?: string | null) => {
  if (!s) return '-'
  try {
    return new Date(s).toLocaleString()
  } catch {
    return '-'
  }
}

export const formatInitial = (name?: string | null) => name?.trim().charAt(0)?.toUpperCase() || '?'

export const padId = (id: number | string, len = 4) => String(id).padStart(len, '0')
