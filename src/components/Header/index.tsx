import { Header } from '../../styles/pages/app'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import logo from '../../assets/logo.svg'
import { CartContext } from '../../context/CartContext'
import styles from '../../styles/pages/header.module.css'
import Link from 'next/link'
import axios from 'axios'

export function Header2() {
  const { amountCart, cart } = useContext(CartContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cart,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <>
      <Header>
        <Link href={'/'}>
          <Image src={logo} alt="" />
        </Link>
        <div className={styles.cartButton}>
          {cart?.length !== 0 ? (
            <div className={styles.counter}>{amountCart.toString()}</div>
          ) : (
            ''
          )}
          <Handbag
            size={32}
            onClick={() =>
              (document.getElementById('toggle').style.right = '0')
            }
          />
        </div>
      </Header>
      <aside id="toggle" className={styles.toggleMenu}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <h1 className={styles.h1}>Sacola de compras</h1>
          <X
            size={32}
            style={{ margin: '20px', cursor: 'pointer' }}
            onClick={() =>
              (document.getElementById('toggle').style.right = '-550px')
            }
          />
        </div>

        {cart.map((product) => (
          <div className={styles.div} key={product.id}>
            <Image
              className={styles.divImagem}
              src={product.imageUrl}
              width={94.79}
              height={94.79}
              alt=""
            />
            <div className={styles.divText}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>{product.price}</p>
              <button className={styles.button}>Remover</button>
            </div>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 70, width: '90%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '1.5rem' }}>Quantidade</p>
            <p style={{ fontSize: '1.5rem' }}>{cart.length} itens</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <p style={{ fontSize: '1.5rem' }}>
              <strong>Valor Total</strong>
            </p>
            <p style={{ fontSize: '1.5rem' }}>{cart.length} itens</p>
          </div>
          <button
            disabled={!!isCreatingCheckoutSession}
            onClick={handleBuyProduct}
            className={styles.buttonFinish}
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  )
}
