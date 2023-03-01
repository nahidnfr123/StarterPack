import Head from 'next/head'

export default function TheHome({title = 'Starter', description = 'Site description'}) {
  return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description}/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
      </>
  )
}
