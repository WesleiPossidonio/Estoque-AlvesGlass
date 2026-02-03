/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react'

import type {
  ConfirmMailProps,
  CreaterUser,
  ResponseDataUser,
  UpdatePasswordProps,
  UpdateUser, UserLoginProps
} from '@/types/UserTypes'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '@/services/api'
import { decodeToken } from '@/utils/DecodeToken'

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateUser: (data: UpdateUser) => Promise<void>
  userDataLogin: ResponseDataUser
  setUserDataLogin: (data: ResponseDataUser) => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate()

  const [userDataLogin, setUserDataLogin] = useState<ResponseDataUser>(
    {} as ResponseDataUser
  )

  //  LOGIN LOCAL
  const handleLoginUser = useCallback(
    async (data: UserLoginProps) => {
      const { email, password } = data

      try {
        const response = await toast.promise(
          api.post('/sessions', { email, password }),
          {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)!',
            error: 'Verifique o nome do usuário e senha 🤯',
          }
        )
        const dataUser = response.data
        const decodeUserId = decodeToken(dataUser.token)

        await localStorage.setItem(
          'Almoxarifado:userData1.0',
          JSON.stringify({ ...dataUser, id: decodeUserId?.id })
        )

        setUserDataLogin({ ...dataUser, id: decodeUserId?.id })

        void (response.data.role === 'admin'
          ? navigate('/dashboard')
          : navigate('/'))
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  //  CARREGAR USUÁRIO LOGADO AO RECARREGAR PÁGINA
  useEffect(() => {
    const LoadDataUser = async () => {
      const dataUserLogin = await localStorage.getItem('Almoxarifado:userData1.0')

      if (dataUserLogin) {
        const { token, email, name, role }: ResponseDataUser =
          JSON.parse(dataUserLogin)
        const decodeUserId = decodeToken(token)
        if (decodeUserId !== null) {
          setUserDataLogin({
            name: decodeUserId.name || name,
            email: decodeUserId.email || email,
            id: decodeUserId.id,
            token: token,
            role: role
          })
        }
      }
    }

    LoadDataUser()
  }, [])

  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, name, registration, email } = data

    try {
      await toast.promise(
        api.post('/auth/register', {
          password,
          name,
          registration,
          email,
        }),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  const confirmMail = useCallback(async (data: ConfirmMailProps) => {
    const { email } = data

    try {
      const response = await toast.promise(api.post('confirmMail', { email }), {
        pending: 'Verificando seus dados',
        success: 'Email Encontrado! verifique seu email para atualizar a senha.',
        error: 'E-mail não encontrado digite novamente 🤯',
      })
      const { data } = response
      await localStorage.setItem(
        'Emam:DataConfirmEmail',
        JSON.stringify(data)
      )

      setUserDataLogin(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, id, name, password } = data

    const updatedData = {
      email,
      name,
      password,
    }

    try {
      await toast.promise(api.put(`users/${id}`, updatedData), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmailId = localStorage.getItem('Avero:DataConfirmEmail')
    const idUser = decodeToken(confirmEmailId)

    const { password, updateNumber } = data

    if (idUser) {
      const updateData = { password, updateNumber }

      try {
        await toast.promise(
          api.patch(`updatePassword/${idUser.id}`, updateData),
          {
            pending: 'Verificando seus dados',
            success: 'Senha Atualizada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        handleLoginUser,
        userDataLogin,
        handleCreateUser,
        confirmMail,
        updatePassword,
        handleUpdateUser,
        setUserDataLogin
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
