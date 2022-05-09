import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Section from 'components/section'
import Border from 'components/border'
import Footer from 'UI/footer'
import Navbar from 'UI/navbar'
import { useResize } from 'hooks/'

import { Content } from 'lib/sections/sections.types'
import { sectionData } from 'lib/sections/sections.data'


const Home: NextPage = () => {
  const beginning = useRef<any>(null)
  const [width] = useResize();
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset

    const footer = document.querySelector("#footer") as HTMLElement | null
    // set state based on location info (explained in more detail below)
    footer && setVisible(beginning.current.offsetTop-50 <= currentScrollPos && footer.offsetTop-150 > currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, handleScroll])

  const handleSectionRendering = () => {
    let sectionList = []
    for (const i in sectionData) {
      const section: Content = sectionData[i]
      sectionList.push(<Section
        key={i}
        width={width}
        setRef={parseInt(i) === 1 ? beginning : null}
        content={section.content}
        bgImageName={section.bgImageName}
        keyIcon={section.keyIcon}
        alt={section.alt}
      />)

      sectionList.push(<Border
        key={`${i}_border`}
        width={width}
        thickness="h-40"
        color="bg-black"
      />)
    }

    return sectionList;
  }

  const styles = {
    css: {
      minWidth: '600px'
    },
    tailwind: {
      main: `flex flex-col items-center text-white`,
      content: `flex w-full flex-1 flex-col items-center text-center`
    }
  }

  return (
    <div className={styles.tailwind.main}>
      <Head>
        <title id="title">Ivan Alvarez</title>
        <link rel="icon" href="/images/favicon-16x16.png" />
      </Head>

      <main className={styles.tailwind.content}>
        <Navbar visible={visible} width={width} />

        {handleSectionRendering()}
      </main>

      <Footer width={width} />
    </div>
  )
}

export default Home
