import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sectionData } from 'lib/sections/sections.data'
import Section from 'components/section'
import Navbar from 'UI/navbar'
import Footer from 'UI/footer'
import { Content } from 'lib/sections/sections.types'


const Home: NextPage = () => {
  const handleSectionRendering = () => {
    return sectionData.map((section: Content, index: number) => {
      return (
        <Section
          key={index}
          content={<section.content />}
          bgImageName={section.bgImageName}
          title={section.title}
        />
      )
    })
  }

  return (
    <div className="flex flex-col items-center bg-black">
      <Head>
        <title>Create Next App</title>
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
