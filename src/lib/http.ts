import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
