import type { ReactNode } from "react"
import { ProductContextProvider } from "./ProductContext"
import { UserContextProvider } from "./UserContext"
interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        {children}
      </ProductContextProvider>
    </UserContextProvider>
  )
}

