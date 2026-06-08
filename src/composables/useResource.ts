import { ref, shallowRef, type Ref } from 'vue'
import type { ListResponse } from '../types/api'

export interface ResourceState<T> {
  items: Ref<T[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  totalCount: Ref<number>
  hasNext: Ref<boolean>
  hasPrev: Ref<boolean>
}

export const normalizeList = <T>(payload: ListResponse<T> | undefined | null) => {
  if (!payload) return { items: [] as T[], count: 0, next: null as string | null, prev: null as string | null }
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length, next: null, prev: null }
  }
  return {
    items: payload.results ?? [],
    count: payload.count ?? payload.results?.length ?? 0,
    next: payload.next ?? null,
    prev: payload.previous ?? null,
  }
}

export function useListResource<T>(fetcher: (params?: any) => Promise<{ data: ListResponse<T> }>) {
  const items = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)
  const hasNext = ref(false)
  const hasPrev = ref(false)

  const load = async (params?: any) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetcher(params)
      const norm = normalizeList<T>(res.data)
      items.value = norm.items
      totalCount.value = norm.count
      hasNext.value = !!norm.next
      hasPrev.value = !!norm.prev
    } catch (err: any) {
      error.value = err?.response?.data?.detail || err?.message || 'Ýüklemek başartmady.'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, totalCount, hasNext, hasPrev, load }
}

export function useResource<T>(fetcher: (id: number | string) => Promise<{ data: T }>) {
  const data = shallowRef<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const load = async (id: number | string) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetcher(id)
      data.value = res.data
    } catch (err: any) {
      error.value = err?.response?.data?.detail || err?.message || 'Ýüklemek başartmady.'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, load }
}
