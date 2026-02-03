import axios, { type InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://almoxarifado-app-omega.vercel.app/',
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