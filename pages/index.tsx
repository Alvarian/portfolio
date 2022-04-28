import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sectionData } from 'lib/sections/sections.data'
import Section from 'components/section'
import Border from 'components/border'
import Navbar from 'UI/navbar'
import Footer from 'UI/footer'
import { Content } from 'lib/sections/sections.types'


const Home: NextPage = () => {
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

  return (
    <div className="flex flex-col items-center text-white scroll-smooth">
      <Head>
        <title>Ivan Alvarez</title>
        <link rel="icon" href="/images/favicon-16x16.png" />
      </Head>

      <Navbar />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {handleSectionRendering()}
      </main>

      <Footer />
    </div>
  )
}

export default Home
