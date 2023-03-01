import {Inter} from 'next/font/google'
import TheHead from '@/components/common/TheHead'
import TheNavBar from '@/components/common/TheNavBar'

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
      <>
        <TheHead title='Starter Home'/>
        <TheNavBar/>
        <main>
          Nahid
        </main>
      </>
  )
}
