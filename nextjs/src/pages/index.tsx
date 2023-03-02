import {Inter} from 'next/font/google'
import type {ReactElement} from 'react'
import TheHead from '@/components/common/TheHead'
import DefaultLayout from '@/layouts/default'

const inter = Inter({subsets: ['latin']})

const Home = () => {
  return (
      <>
        <TheHead title='Starter Home'/>
        <main>
          Nahid
        </main>
      </>
  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>
        {page}
      </DefaultLayout>
  )
}

export default Home
