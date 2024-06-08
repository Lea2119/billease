import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    name: '',
    isAuthenticated: false,
    token: ''
  })

  const initializeStore = (): void => {
    if (localStorage.getItem('token')) {
      user.value.token = localStorage.getItem('token') as string
      user.value.isAuthenticated = true
    } else {
      user.value.token = ''
      user.value.isAuthenticated = false
    }
  }

  const setToken = (token: string): void => {
    user.value.token = token
    user.value.isAuthenticated = true
  }

  const removeToken = (): void => {
    user.value.token = ''
    user.value.isAuthenticated = false
  }

  return {
    user,
    initializeStore,
    setToken,
    removeToken
  }
})
