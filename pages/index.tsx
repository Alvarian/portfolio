import { useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// const { gsap } = require("gsap/dist/gsap");
// const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
import {
  gsap
} from "gsap"
import {
  ScrollTrigger
} from "gsap/dist/ScrollTrigger"

import Section from 'components/section'
import Border from 'components/border'
import Footer from 'UI/footer'
import Navbar from 'UI/navbar'

import { Content } from 'lib/sections/sections.types'
import { sectionData } from 'lib/sections/sections.data'


const Home: NextPage = () => {
  const beginning = useRef(null)

  useEffect(() => {
    function animateFrom(elem: any, direction: any | null) {
      direction = direction || 1;
      var x = 0,
          y = direction * 100;
      if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
      } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
      }
      elem.style.transform = "translate(" + x + "px, " + y + "px)";
      elem.style.opacity = "0";
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
    }

    function hide(elem: any) {
      gsap.set(elem, {autoAlpha: 0});
    }

    gsap.registerPlugin(ScrollTrigger);
console.log(beginning.current)
  
    // gsap.to("#knowledge", {rotation: 360, duration: 5, ease: "elastic"})
    gsap.from("#knowledge", {
      duration: 1.5, y: 0, delay: 2,
      scrollTrigger: {
        markers: true,
        trigger: "#knowledge",
        once: false,
        // start: "top bottom",
        // end: "top top",
        scrub: true,
      },
    });
  }, [])

  const handleSectionRendering = () => {
    let sectionList = []
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
        position={i}
        setRef={beginning}
        content={section.content}
        bgImageName={section.bgImageName}
        keyIcon={section.keyIcon}
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
        <Navbar />

        {handleSectionRendering()}
      </main>

      <Footer />
    </div>
  )
}

export default Home
