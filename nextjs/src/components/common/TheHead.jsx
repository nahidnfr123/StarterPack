import Head from 'next/head'

export default function TheHome({title = 'Starter', description = 'Site description'}) {
  const Title = 'Start Pack | ' + title
  return (
      <>
        <Head>
          <title>{Title}</title>
          <meta name="description" content={description}/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
          <meta name="og:title" content={Title}/>
        </Head>
      </>
  )
}
