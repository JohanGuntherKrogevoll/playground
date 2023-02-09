import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { enabled: flagEnabled } = useFeatureFlag('flagEnabled');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await fetch('/.auth/me');
        if (res.ok) {
          const json = await res.json()
          setUserId(json[0].user_id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserId();
  }, []);
  return (
    <>
      <Head>
        <title>Welcome to the playground</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            This is where i test stuff🔭
          </p>
          <div>
            <a
              href="https://krogevoll.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Johan Krogevoll
            </a>
          </div>
        </div>

        <p className={inter.className}>Built with</p>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://github.com/JohanGuntherKrogevoll/playground"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              GitHub repo <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              The public repo for this site.
            </p>
          </a>
          {flagEnabled &&
            <a
              href="https://learn.microsoft.com/en-us/azure/azure-app-configuration/overview"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Feature flagged link <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                The flag is managed in an Azure App Configuration
              </p>
            </a>
          }
          {userId &&
            <a
              href="/.auth/logout"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className} data-cy="authHeader">
                Hi {userId} <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Nice to see you 😊 Click here to log out.
              </p>
            </a> 
            ||
            <a
              href="/.auth/login/github"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className} data-cy="authHeader">
                Log in <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Click here to log in with GitHub.
              </p>
            </a>
          }
        </div>
      </main>
    </>
  )
}
