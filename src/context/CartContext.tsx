import { createContext, ReactNode, useState } from 'react'

interface CartProviderProps {
  children: ReactNode
}

interface CartProps {
  id: string
  defaultPrice: string
  description: string
  imageUrl: string
  name: string
  price: string
}

interface CartContextType {
  cart: CartProps[]
  setCart: (value: Object) => void
  addToCart: (value: Object) => void
  amountCart: number
}
export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [amountCart, setAmountCart] = useState(0)
  function addToCart(data) {
    setCart((state) => [...state, data])
    setAmountCart(amountCart + 1)
  }

  console.log('cart', amountCart)
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, amountCart }}>
      {children}
    </CartContext.Provider>
  )
}
