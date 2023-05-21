import React, { useEffect, useRef, useState } from 'react'
React.useLayoutEffect = React.useEffect 
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

import Section from 'shared/section'
import Border from 'sections/Border'
import Footer from 'sections/Footer'
import { useResize } from 'hooks/useResize'

import { Content, dataOptions } from 'lib/sections/sections.types'
import { defaultVariants, localMockData, sectionData } from 'lib/sections/sections.data'
import { rateLimiters } from 'lib/sections/sections.methods'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Admissions {
  [key: string]: {
    position: number,
    isPermitted: boolean | null
  }
}

async function getData() {
  const payload = await (await fetch("/api/cache/getAllContentOnly")).json()

  return payload
}

const Home: NextPage = () => {
  const beginning = useRef<HTMLElement>(null)
  const [width] = useResize()
  const [scrollMethodAdmissions, setAdmissions] = useState<Admissions>({})
  const [areEventsLoaded, setAreLoaded] = useState<boolean>(false)
  const [propData, setPropData] = useState<dataOptions>({setting: "local", data: {}})
  const [currentSection, setCurrentSection] = useState<string>("")

  useEffect(() => {
    getData().then((data) => {
      if (data.setting === "local") {
        setPropData(localMockData)
      } else {
        setPropData(data)
      }
    })
  }, [])
  
  const handleAutoRoutingOnScroll = (list: Admissions) => {
    for (let key in list) {
      if (list[key].isPermitted) {
        window.scrollTo(0, list[key].position)

        break
      }
    }
  }

  const handlePermissionsOnScroll = () => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset

    for (let key in scrollMethodAdmissions) {
      switch (key) {
        case "navbar":
          const footer = document.querySelector("#footer") as HTMLElement | null
          const isNavbarPermitted = footer && beginning.current && beginning.current.offsetTop-50 <= currentScrollPos && footer.offsetTop-150 > currentScrollPos
      
          if (isNavbarPermitted && !scrollMethodAdmissions[key].isPermitted) {
            scrollMethodAdmissions[key].isPermitted = isNavbarPermitted
            
            setAdmissions({...scrollMethodAdmissions})
          } else if (!isNavbarPermitted && scrollMethodAdmissions[key].isPermitted) {
            scrollMethodAdmissions[key].isPermitted = isNavbarPermitted
            
            setAdmissions({...scrollMethodAdmissions})
          }

          break
  
        default:
          const isSectionPermitted = scrollMethodAdmissions[key].position-600 < currentScrollPos && scrollMethodAdmissions[key].position+500 > currentScrollPos
          
          if (isSectionPermitted && !scrollMethodAdmissions[key].isPermitted) {
            scrollMethodAdmissions[key].isPermitted = isSectionPermitted
            
            setAdmissions({...scrollMethodAdmissions})
          } else if (!isSectionPermitted && scrollMethodAdmissions[key].isPermitted) {
            scrollMethodAdmissions[key].isPermitted = isSectionPermitted
            
            setAdmissions({...scrollMethodAdmissions})
          }

          break
      }
    }
  }
  
  useEffect(() => {
    if (!Object.keys(scrollMethodAdmissions).length) {
      const currentScrollPos = window.pageYOffset
      
      let admissions: dataOptions = {}

      const footer = document.querySelector("#footer") as HTMLElement | null
      admissions['navbar'] = {
        position: footer && footer.offsetTop,
        isPermitted: footer && beginning.current && beginning.current.offsetTop-50 <= currentScrollPos && footer.offsetTop-150 > currentScrollPos
      }
  
      for (let section of sectionData) {
        const element = document.querySelector(`#${section.alt}`) as HTMLElement | null
        
        admissions[section.alt] = { 
          position: element && element.offsetTop, 
          isPermitted: element && element.offsetTop-600 < currentScrollPos && element.offsetTop+500 > currentScrollPos 
        }
      }

      setAdmissions(admissions)
    } else if (!areEventsLoaded) {
      const navbarlessAdmissionsList = {...scrollMethodAdmissions}
      delete navbarlessAdmissionsList.navbar

      window.addEventListener('scroll', rateLimiters.debounce(5000, handleAutoRoutingOnScroll.bind(this, navbarlessAdmissionsList)))
      window.addEventListener('scroll', rateLimiters.throttle(300, handlePermissionsOnScroll))
      
      setAreLoaded(!areEventsLoaded)
    }
  }, [scrollMethodAdmissions, handlePermissionsOnScroll, handleAutoRoutingOnScroll]);

  const handleSectionRendering = () => {
    let sectionList = []
    for (const i in sectionData) {
      const section: Content = sectionData[i]

      sectionList.push(<Section
        key={i}
        serverProps={propData['data'][section.alt]}
        width={width}
        setRef={parseInt(i) === 1 ? beginning : null}
        setCurrentSection={setCurrentSection}
        content={section.content}
        isSectionPermitted={scrollMethodAdmissions[section.alt]?.isPermitted}
        bgImageName={section.bgImageName}
        keyIcon={section.keyIcon}
        alt={section.alt}
      />)

      const nextNextSection: Content = sectionData[parseInt(i)+2]
      const nextSection: Content = sectionData[parseInt(i)+1]
      const prevSection: Content = sectionData[parseInt(i)-1]
      
      sectionList.push(<Border
        key={`${i}_border`}
        slotFields={[
          {name: prevSection?.alt || "", admissions: scrollMethodAdmissions[prevSection?.alt]},
          {name: section.alt, admissions: scrollMethodAdmissions[section.alt]},
          {name: nextSection?.alt || "Outro", admissions: scrollMethodAdmissions[nextSection?.alt]},
          {name: nextNextSection?.alt, admissions: scrollMethodAdmissions[nextNextSection?.alt]},
        ]}
        // width={width}
        // thickness="h-40"
        // color="bg-black"
      />)
    }
    
    return sectionList;
  }

  const styles = {
    css: {
      main: {
        filter: "blur(2px)",
        backgroundImage: "url('/images/img_class-min.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -10
      }
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

        <meta name="description" content="Ivan Alvarez's personal website" />
        <meta name="keywords" content="Ivan Alvarez, Ivan, Alvarez, ivan, alvarez, ivan alvarez, ivan alvarez's personal website, ivan alvarez's website, ivan alvarez's personal site, ivan alvarez's site, ivan alvarez's personal page, ivan alvarez's page, ivan alvarez's personal, ivan alvarez's, ivan alvarez personal website, ivan alvarez website, ivan alvarez personal site, ivan alvarez site, ivan alvarez personal page, ivan alvarez page, ivan alvarez personal, ivan alvarez, ivan alvarez's personal website, ivan alvarez's website, ivan alvarez's personal site, ivan alvarez's site, ivan alvarez's personal page, ivan alvarez's page, ivan alvarez's personal, ivan alvarez's, ivan alvarez personal website, ivan alvarez website, ivan alvarez personal site, ivan alvarez site, ivan alvarez personal page, ivan alvarez page, ivan alvarez personal, ivan alvarez, ivan alvarez's personal website, ivan alvarez's website, ivan alvarez's personal site, ivan alvarez's site, ivan alvarez's personal page, ivan alvarez's page, ivan alvarez's personal, ivan alvarez's, ivan alvarez personal website, ivan alvarez website, ivan alvarez personal site, ivan alvarez site, ivan alvarez personal page, ivan alvarez page, ivan alvarez personal, ivan alvarez" />
        <meta name="author" content="Ivan Alvarez" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.tailwind.content}>
        <Navbar currentTab={currentSection} navVisible={scrollMethodAdmissions['navbar']?.isPermitted || false} width={width} />

        <div 
          className="fixed w-full h-full -z-10" 
          style={{
            filter: "blur(2px)",
            backgroundImage: "url('/images/img_class-min.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -10
          }}
        ></div>

        {handleSectionRendering()}
      </main>

      <Footer width={width} />
    </div>
  )
}

const Navbar: React.FC<{
  navVisible: boolean,
  width: number,
  currentTab?: string
}> = ({
  navVisible,
  width,
  currentTab
}) => {
  const handleRenderLinks = (textStyles: string) => {
    return sectionData.map((section, index) => (
      <li key={index}>
        <Link href={"#"+section.alt}>
          <span className={textStyles+(section.alt === currentTab && " underline")}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</span>
        </Link>
      </li>
    ))
  }

  const styles = {
    css: {
      minWidth: '600px'
    },
    tailwind: {
      main: `navbar bg-black z-40 fixed left-0`,
      header: `btn btn-ghost normal-case text-4xl`,
      background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      content: {
        main: `bg-black/50 rounded-lg hover:bg-black h-4/5 w-5/6 flex justify-between flex-col items-center`,
        nav: `navbar h-4/5 w-5/6 flex flex-row justify-around`,
        buttons: {
          main: `flex flex-col justify-center w-full items-center pb-8`,
          links: `hover:invert bg-white flex items-center justify-center h-14 w-14 m-3 rounded-full`
        }
      }
    }
  }
  
  return (
    <motion.div className={styles.tailwind.main} style={styles.css} id="droppingNavbar"
      variants={defaultVariants.dropDown(1)}
      animate={navVisible ? 'lift' : 'drop'}
    >
      <div className="navbar-start pl-10">
        {width > 900 ? 
          <ul className="menu menu-horizontal shadow bg-black">
            {handleRenderLinks("text-xl")}
          </ul>
          :
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:invert text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box mt-7 p-3 shadow bg-black">
              {handleRenderLinks("text-3xl font-bold")}
            </ul>
          </div>
        }
      </div>

      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-4xl">Ivan Alvarez</Link>
      </div>

      <div className="navbar-end">
        {width > 900 ?
          <ul className="menu menu-horizontal shadow bg-black pr-10">
            <li><Link rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={45} height={45} src="/icons/github.svg" /></Link></li>
            
            <li><Link rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={30} height={30} src="/icons/linkedin.svg" /></Link></li>
          </ul>
          :
          <div className="dropdown dropdown-end pr-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle bg-white hover:invert">
              <Image alt='' width={40} height={40} src="/icons/social-media.svg" />
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box shadow bg-black mt-9 p-3">
              <li><Link rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={45} height={45} src="/icons/github.svg" /></Link></li>
              
              <li><Link rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={30} height={30} src="/icons/linkedin.svg" /></Link></li>
            </ul>
          </div>
        }
      </div>
    </motion.div>
  )
}


export default Home
