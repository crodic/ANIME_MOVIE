import type { LoginResponse } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useSessionStore = defineStore(
  'session',
  () => {
    const user = ref<LoginResponse['payload']['user'] | null>(null)
    const isAuthenticated = ref(false)

    const token = reactive({
      accessToken: '',
      refreshToken: '',
    })

    const setAccessToken = (accessToken: string) => {
      token.accessToken = accessToken
    }

    const setRefreshToken = (refreshToken: string) => {
      token.refreshToken = refreshToken
    }

    const userLogin = (payload: LoginResponse['payload']) => {
      user.value = payload.user
      isAuthenticated.value = true
      token.accessToken = payload.accessToken
      token.refreshToken = payload.refreshToken
    }

    const userLogout = () => {
      user.value = null
      isAuthenticated.value = false
      token.accessToken = ''
      token.refreshToken = ''
    }

    return { user, isAuthenticated, token, setAccessToken, setRefreshToken, userLogin, userLogout }
  },
  {
    persist: {
      key: 'session',
      storage: localStorage,
    },
  },
)
