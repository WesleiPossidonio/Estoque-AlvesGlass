
import { ProductContext } from '@/contexts/ProductContext'
import { useContext } from 'react'


export const useProduct = () => {
  const context = useContext(ProductContext)
  return context
}