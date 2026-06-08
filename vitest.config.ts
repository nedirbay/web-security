import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

// Bu konfigurasiýa "contract" (model uýgunlyk) testleri üçin.
// Testler göni işläp duran backend-e (VITE_API_BASE_URL) HTTP arkaly baglanýar.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // localStorage / window axios interceptor üçin gerek
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/**/*.test.ts'],
    // Login -> tokeni localStorage-a ýazmak ketdma-yzy bolansoň, faýllar yzygiderli işlesin
    fileParallelism: false,
    testTimeout: 20000,
    hookTimeout: 20000,
    env: {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:8000/api/',
    },
    reporters: ['verbose'],
  },
})
