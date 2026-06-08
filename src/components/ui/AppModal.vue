<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeOnBackdrop && close()"></div>
        <div
          ref="panelRef"
          class="relative z-10 w-full bg-white rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          :class="sizeClass"
          tabindex="-1"
        >
          <button
            v-if="showClose"
            type="button"
            class="absolute top-5 right-5 p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50"
            :aria-label="t.common.close"
            @click="close"
          >
            <X class="w-5 h-5" />
          </button>

          <header v-if="title" class="mb-6 pr-10">
            <h3 :id="titleId" class="text-2xl font-bold text-black">{{ title }}</h3>
            <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
          </header>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import { t } from '../../strings'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
  showClose?: boolean
}>(), {
  size: 'md',
  closeOnBackdrop: true,
  showClose: true,
})

const emit = defineEmits<{
  'update:modelValue': [v: boolean]
  close: []
}>()

const panelRef = ref<HTMLElement | null>(null)
const titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    default: return 'max-w-md'
  }
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

onKeyStroke('Escape', () => {
  if (props.modelValue) close()
})

watch(() => props.modelValue, async (open) => {
  if (open) {
    await nextTick()
    panelRef.value?.focus()
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.2s ease;
}
.modal-enter-from > div:last-child {
  transform: scale(0.95);
}
.modal-leave-to > div:last-child {
  transform: scale(0.97);
}
</style>
