import { defineStore } from 'pinia'
import apiClient from '../api/axios'

interface User {
  id: number
  username: string
  email: string
  role?: string
  phone?: string
}

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
  state: () => {
    return {
      user: readStoredUser(),
      token: localStorage.getItem('token') || null,
      loading: false,
      error: null as string | null
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(credentials: { email: string, password: string }) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.post('/users/login/', credentials)
        this.token = response.data.access
        this.user = response.data.user
        
        localStorage.setItem('token', this.token!)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return true
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Giriş şowsuz tamamlandy.'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(userData: any) {
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
        const response = await apiClient.get('/users/me/')
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        console.error('Failed to fetch user info', err)
      }
    },

    async updateProfile(profileData: Partial<User>) {
      this.loading = true
      try {
        const response = await apiClient.patch('/users/profile/', profileData)
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      } catch (err: any) {
        this.error = err.response?.data?.detail || 'Profil täzelenmedi.'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        if (this.token) {
          await apiClient.post('/users/logout/')
        }
      } catch (err) {
        console.error('Logout request failed', err)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }
})
