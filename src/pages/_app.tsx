import { AppProps } from "next/app";
import Image from "next/image";
import logo from '../assets/logo.svg'
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
        <Header>
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src={logo} alt="" />
        </Header>
      <Component {...pageProps} />
    </Container>
      )
}
