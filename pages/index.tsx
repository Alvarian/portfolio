import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
  SectionOne,
  SectionTwo,
  SectionThree
} from 'sections'


const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SectionOne />
        <SectionTwo />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t bg-no-repeat bg-cover bg-center bg-fixed relative" style={styles.footer}>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

const styles = {
  footer: {
    backgroundImage: "url(./images/library-min.jpg)",
  }
}

export default Home
