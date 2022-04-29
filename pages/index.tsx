import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sectionData } from 'lib/sections/sections.data'
import Section from 'components/section'
import Border from 'components/border'
import Navbar from 'UI/navbar'
import Footer from 'UI/footer'
import Link from 'next/link'
import { Content } from 'lib/sections/sections.types'


const Home: NextPage = () => {
  const handleRenderLinks = () => {
    return sectionData.map((section: Content, index: number) => {
      return (<Link href={"#"+section.alt} key={index}><li><a className="text-2xl round-lg m-2 btn btn-ghost normal-case text-center">{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link>)
    })
  }

  const handleSectionRendering = () => {
    let sectionList = [];
    for (const i in sectionData) {
      if (parseInt(i) % 2 !== 0) {
        sectionList.push(<Border
          key={`${i}_border`}
          thickness="h-40"
          color="bg-black"
        />)
      }

      const section: Content = sectionData[i]
      sectionList.push(<Section
        key={i}
        Content={section.content}
        bgImageName={section.bgImageName}
        alt={section.alt}
      />)
    }

    sectionList.push(<Border
      key="last"
      thickness="h-40"
      color="bg-black"
    />)

    return sectionList;
  }

  const styles = {
    css: {},
    tailwind: {
      main: `flex flex-col items-center text-white scroll-smooth`,
      content: `flex w-full flex-1 flex-col items-center text-center`
    }
  }

  return (
    <div className={styles.tailwind.main}>
      <Head>
        <title>Ivan Alvarez</title>
        <link rel="icon" href="/images/favicon-16x16.png" />
      </Head>

      <Navbar handleRenderLinks={handleRenderLinks} />

      <main className={styles.tailwind.content}>{handleSectionRendering()}</main>

      <Footer handleRenderLinks={handleRenderLinks} />
    </div>
  )
}

export default Home
