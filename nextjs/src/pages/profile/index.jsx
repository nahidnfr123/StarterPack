import {useSession, signIn, signOut, getSession} from "next-auth/react"

export default function Profile() {
  const {data: session} = useSession()
  if (session) {
    return <>
      Signed in as {session?.user?.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}



// Middle Ware ... Required Auth
export async function getServerSideProps({req}) {
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
  return {
    props: {session}
  }
}
