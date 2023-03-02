import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {ReactElement} from "react";


export default function App({Component, pageProps}: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)
  return <>
    <ChakraProvider>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  </>
}
