export interface UserLoginProps {
  email: string
  password: string
  typeSessions?: string
}

export interface ResponseDataUser {
  id: string
  name: string
  token?: string
  email: string
  role: string
}

export interface CreaterUser {
  name: string
  password: string
  registration: string
  email: string
}

export interface UpdateUser {
  id: string
  name: string
  password: string
  email: string
}

export interface ConfirmMailProps {
  email: string
}

export interface UpdatePasswordProps {
  password: string
  confirmPassword: string
  updateNumber: string
}