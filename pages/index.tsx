import React, { useEffect, useRef, useState } from 'react'
React.useLayoutEffect = React.useEffect 
import type { NextPage } from 'next'
import Head from 'next/head'

import Section from 'components/section'
import Border from 'UI/Border'
import Footer from 'UI/footer'
import Navbar from 'UI/navbar'
import { useResize } from 'hooks/'

import { Content, dataOptions } from 'lib/sections/sections.types'
import { sectionData, localMockData } from 'lib/sections/sections.data'
import { rateLimiters, getFilesFromDir } from 'lib/sections/sections.methods'


const Home: NextPage = (props) => {
  const beginning = useRef<any>(null)
  const [width] = useResize()
  const [scrollMethodAdmissions, setAdmissions] = useState<any>({})
  const [areEventsLoaded, setAreLoaded] = useState<any>(false)

  // const propData: dataOptions = localMockData
  const propData: dataOptions = props

  const handleAutoRoutingOnScroll = (list: any) => {
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
          const isNavbarPermitted = footer && beginning.current.offsetTop-50 <= currentScrollPos && footer.offsetTop-150 > currentScrollPos
      
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
        isPermitted: footer && beginning.current.offsetTop-50 <= currentScrollPos && footer.offsetTop-150 > currentScrollPos
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
  }, [scrollMethodAdmissions, handlePermissionsOnScroll, handleAutoRoutingOnScroll])

  const handleSectionRendering = () => {
    let sectionList = []
    for (const i in sectionData) {
      const section: Content = sectionData[i]

      sectionList.push(<Section
        key={i}
        serverProps={propData['data'][section.alt]}
        width={width}
        setRef={parseInt(i) === 1 ? beginning : null}
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
        <Navbar navVisible={scrollMethodAdmissions['navbar']?.isPermitted || false} width={width} />

        {handleSectionRendering()}
      </main>

      <Footer width={width} />
    </div>
  )
}

Home.getInitialProps = async function() {
  // Here i want to access the projectID sent from the previous page
  try {
    let overallStatsPayload: Record<string, any> = {}
    const userData = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_")).json()

    const challangesData = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_/code-challenges/completed")).json()

    const gifFrames = await getFilesFromDir()

    const collectionData = await (await fetch("https://api.badgr.io/v2/backpack/collections/DBRj-SFzTRu1ZscR12JQ5g", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BADGR_AUTH_BEARER}`,
        'Content-Type': 'application/json'
      }
    })).json()

    const badges = (await Promise.all(collectionData.result[0].assertions.map(async (badgeID: any) => {
      const badgeData = (await (await fetch(`https://api.badgr.io/v2/backpack/assertions/${badgeID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BADGR_AUTH_BEARER}`,
          'Content-Type': 'application/json'
        }
      })).json()).result[0]

      const moreBadgeData = (badgeData.badgeclassOpenBadgeId.split(".").find((part: any) => part === "credly")) ? await (await fetch(badgeData.badgeclassOpenBadgeId, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BADGR_AUTH_BEARER}`,
          'Content-Type': 'application/json'
        }
      })).json() : {}
      
      return Object.assign(badgeData, moreBadgeData)
    })))
    
    overallStatsPayload.leaderBoardScore = userData.leaderboardPosition
    overallStatsPayload.totalCompleted = challangesData.totalItems
    overallStatsPayload.languagesTotal = (() => {
      let languages: Record<string, number> = {}

      for (let challenge of challangesData.data) {
        for (let lang of challenge.completedLanguages) {
          if (!languages[lang]) {
            languages[lang] = 1
          } else {
            languages[lang]++
          }
        }
      }

      return languages
    })()

    let mostRecentPayload: Record<string, any> = {}
    const recentChallengeResponse = await fetch(`https://www.codewars.com/api/v1/code-challenges/${challangesData.data[0].id}`)
    const recentChallengeData = await recentChallengeResponse.json()
      
    mostRecentPayload.title = recentChallengeData.name
    mostRecentPayload.attemptedTotal = recentChallengeData.totalAttempts
    mostRecentPayload.completedTotal = recentChallengeData.totalCompleted
    mostRecentPayload.url = recentChallengeData.url
    mostRecentPayload.tags = recentChallengeData.tags
    mostRecentPayload.completionDate = challangesData.data[0].completedAt
    mostRecentPayload.languagesUsed = challangesData.data[0].completedLanguages

    const payload = {
      data: {
        stats: {
          overallStatsPayload,
          mostRecentPayload,
        },
        knowledge: {
          gifFrames,
          badges
        }
      },
    }
    
    return payload
  } catch (err) {
    return {err}
  }
}

export default Home


