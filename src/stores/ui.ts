import { defineStore } from 'pinia'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
  duration: number
}

export interface ConfirmOptions {
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
}

interface ConfirmState extends ConfirmOptions {
  open: boolean
  resolve: ((value: boolean) => void) | null
}

let nextId = 1

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [] as Toast[],
    confirmState: {
      open: false,
      title: '',
      message: '',
      confirmText: '',
      cancelText: '',
      variant: 'primary' as 'danger' | 'primary',
      resolve: null,
    } as ConfirmState,
  }),

  actions: {
    pushToast(message: string, variant: ToastVariant = 'info', duration = 3500) {
      const id = nextId++
      this.toasts.push({ id, message, variant, duration })
      if (duration > 0) {
        setTimeout(() => this.dismissToast(id), duration)
      }
      return id
    },
    success(message: string, duration = 3500) {
      return this.pushToast(message, 'success', duration)
    },
    error(message: string, duration = 5000) {
      return this.pushToast(message, 'error', duration)
    },
    info(message: string, duration = 3500) {
      return this.pushToast(message, 'info', duration)
    },
    warning(message: string, duration = 4000) {
      return this.pushToast(message, 'warning', duration)
    },
    dismissToast(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },

    confirm(options: ConfirmOptions): Promise<boolean> {
      return new Promise((resolve) => {
        this.confirmState = {
          open: true,
          title: options.title,
          message: options.message ?? '',
          confirmText: options.confirmText ?? 'Tassykla',
          cancelText: options.cancelText ?? 'Goý bes et',
          variant: options.variant ?? 'primary',
          resolve,
        }
      })
    },
    resolveConfirm(value: boolean) {
      const resolve = this.confirmState.resolve
      this.confirmState.open = false
      this.confirmState.resolve = null
      if (resolve) resolve(value)
    },
  },
})
