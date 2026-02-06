import axios, { type InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const userData = localStorage.getItem(
    'almoxarifado:userData1.0',
  )
  const token = userData !== null ? JSON.parse(userData).token : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api