import { AppProps } from 'next/app'
import { Header2 } from '../components/Header'
import { CartContextProvider } from '../context/CartContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header2 />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
