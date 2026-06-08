import { defineStore } from 'pinia'
import apiClient from '../api/axios'
import type { User } from '../types/api'

const readStoredUser = (): User | null => {
  const savedUser = localStorage.getItem('user')
  if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
    localStorage.removeItem('user')
    return null
  }
  try {
    return JSON.parse(savedUser) as User
  } catch (error) {
    console.error('Failed to parse user from localStorage', error)
    localStorage.removeItem('user')
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: readStoredUser(),
    token: localStorage.getItem('token') as string | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    // Backend admin barlaglary `is_staff`-a esaslanýar (IsAdminUser permission).
    isAdmin: (state) => state.user?.is_staff === true,
  },

  actions: {
    persistUser(user: User | null) {
      this.user = user
      if (user) localStorage.setItem('user', JSON.stringify(user))
      else localStorage.removeItem('user')
    },

    persistToken(token: string | null) {
      this.token = token
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    },

    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.post('/users/login/', credentials)
        // Backend JWT diňe { access, refresh } gaýtarýar — ulanyjy obýektini
        // aýratyn /users/me/ endpointinden çekýäris.
        this.persistToken(response.data.access)
        await this.fetchMe()
        return true
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Giriş şowsuz tamamlandy.'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(userData: {
      username: string
      email: string
      password: string
      password_confirm: string
    }) {
      this.loading = true
      this.error = null
      try {
        await apiClient.post('/users/register/', userData)
        return true
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Hasap döretmek şowsuz tamamlandy.'
        return false
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      if (!this.token) return
      try {
        const response = await apiClient.get<User>('/users/me/')
        this.persistUser(response.data)
      } catch (err) {
        console.error('Failed to fetch user info', err)
      }
    },

    async updateProfile(profileData: Partial<User>) {
      this.loading = true
      try {
        const response = await apiClient.patch<User>('/users/profile/', profileData)
        this.persistUser({ ...(this.user || ({} as User)), ...response.data })
        return true
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Profil täzelenmedi.'
        return false
      } finally {
        this.loading = false
      }
    },

    updateUser(patch: Partial<User>) {
      this.persistUser({ ...(this.user || ({} as User)), ...patch })
    },

    async logout() {
      try {
        if (this.token) await apiClient.post('/users/logout/')
      } catch (err) {
        console.error('Logout request failed', err)
      } finally {
        this.persistToken(null)
        this.persistUser(null)
      }
    },
  },
})
