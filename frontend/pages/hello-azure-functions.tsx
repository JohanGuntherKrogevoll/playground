import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function HelloAzureFunctions() {
  const [messageFromAzureFunction, setMessageFromAzureFunction] = useState<string>('');
  const [name, setName] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setName(router.query.name?.toString() || '')
    }
  }, [router.isReady]);

  useEffect(() => {
    async function fetchMessageFromAzureFunction() {
      if (name === undefined) {
        return
      }
      try {
        const res = await fetch(`http://localhost:7071/api/HelloWorld?name=${name || ''}`);
        if (res.ok) {
          setMessageFromAzureFunction(await res.text());
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchMessageFromAzureFunction();
  }, [name]);
  return (
    <>
      <Head>
        <title>Hello Azure Functions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p className={inter.className} data-cy='greeting'>
          {messageFromAzureFunction}
        </p>
      </main>
    </>
  )
}
