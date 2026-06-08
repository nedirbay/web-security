import { computed, type WritableComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useRouteQueryState(key: string, defaultValue = ''): WritableComputedRef<string> {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get() {
      const v = route.query[key]
      if (Array.isArray(v)) return v[0] ?? defaultValue
      return (v as string) ?? defaultValue
    },
    set(value: string) {
      const query = { ...route.query }
      if (!value) delete query[key]
      else query[key] = value
      router.replace({ query })
    },
  })
}

export function useRouteQueryNumber(key: string, defaultValue = 1): WritableComputedRef<number> {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get() {
      const v = route.query[key]
      const raw = Array.isArray(v) ? v[0] : v
      const n = Number(raw)
      return Number.isFinite(n) && n > 0 ? n : defaultValue
    },
    set(value: number) {
      const query = { ...route.query }
      if (!value || value === defaultValue) delete query[key]
      else query[key] = String(value)
      router.replace({ query })
    },
  })
}
