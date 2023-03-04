// import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {ReactElement} from "react"
import {SessionProvider} from "next-auth/react"


export default function App({Component, pageProps: {session, ...pageProps}}: AppProps): JSX.Element {
  const getLayout = Component?.getLayout || ((page: ReactElement) => page)
  return <>
    <SessionProvider session={session}>
      <ChakraProvider>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SessionProvider>
  </>
}
