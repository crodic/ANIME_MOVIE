import { useSessionStore } from '@/stores/session'
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    const sessionStore = useSessionStore()
    config.headers.Authorization = `Bearer ${sessionStore.token.accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const sessionStore = useSessionStore()
    if (error.response.status === 401) {
      sessionStore.userLogout()
      window.location.href = '/dang-nhap'
    }
    return Promise.reject(error)
  },
)

export default request
