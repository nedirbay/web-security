<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm">
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-2xl shadow-xl border bg-white px-5 py-4 flex items-start gap-3"
          :class="variantClass(toast.variant)"
          role="alert"
        >
          <component :is="iconFor(toast.variant)" class="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
          <button
            type="button"
            class="opacity-50 hover:opacity-100 transition-opacity"
            :aria-label="t.common.close"
            @click="ui.dismissToast(toast.id)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useUiStore, type ToastVariant } from '../../stores/ui'
import { t } from '../../strings'

const ui = useUiStore()

const variantClass = (v: ToastVariant) => {
  switch (v) {
    case 'success': return 'border-emerald-100 text-emerald-700'
    case 'error': return 'border-red-100 text-red-700'
    case 'warning': return 'border-amber-100 text-amber-700'
    default: return 'border-blue-100 text-blue-700'
  }
}

const iconFor = (v: ToastVariant) => {
  switch (v) {
    case 'success': return CheckCircle2
    case 'error': return XCircle
    case 'warning': return AlertTriangle
    default: return Info
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.toast-enter-from {
  transform: translateX(110%);
  opacity: 0;
}
.toast-leave-to {
  transform: translateX(110%);
  opacity: 0;
}
</style>
