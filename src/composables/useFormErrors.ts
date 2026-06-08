import { ref } from 'vue'
import type { FieldErrors } from '../types/api'

export function useFormErrors() {
  const fieldErrors = ref<Record<string, string>>({})
  const formError = ref<string>('')

  const reset = () => {
    fieldErrors.value = {}
    formError.value = ''
  }

  const setFromError = (err: any, fallback = 'Säwlik ýüze çykdy.') => {
    reset()
    const data = err?.response?.data
    if (!data) {
      formError.value = err?.message || fallback
      return
    }
    if (typeof data === 'string') {
      formError.value = data
      return
    }
    if (data.detail) {
      formError.value = String(data.detail)
      return
    }
    if (data.non_field_errors) {
      const v = data.non_field_errors
      formError.value = Array.isArray(v) ? v.join(' ') : String(v)
    }
    const obj = data as FieldErrors
    for (const key of Object.keys(obj)) {
      if (key === 'detail' || key === 'non_field_errors') continue
      const v = obj[key]
      if (Array.isArray(v)) fieldErrors.value[key] = v.join(' ')
      else if (v != null) fieldErrors.value[key] = String(v)
    }
    if (!formError.value && Object.keys(fieldErrors.value).length === 0) {
      formError.value = fallback
    }
  }

  return { fieldErrors, formError, reset, setFromError }
}
