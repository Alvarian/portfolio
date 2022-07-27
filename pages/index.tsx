import React, { useEffect, useRef, useState } from 'react'
React.useLayoutEffect = React.useEffect 
import type { NextPage } from 'next'
import Head from 'next/head'

import Section from 'components/section'
import Border from 'UI/Border'
import Footer from 'UI/footer'
import Navbar from 'UI/navbar'
import { useResize } from 'hooks/'

import { Badge, Content, dataOptions, MostrecentPayload, OverallPayload } from 'lib/sections/sections.types'
import { localMockData, sectionData } from 'lib/sections/sections.data'
import { rateLimiters, getFilesFromDir, formatDate } from 'lib/sections/sections.methods'
import { getUserData, getChallengesData, getMostRecentChallengeData } from 'helpers/stats'
import { getBadgrAuthTokens, getBadgrBadgeData, getBadgrBadgeDecriptions, getBadgrCollectionsData, getNewAccessToken } from 'helpers/badges'


interface Admissions {
  [key: string]: {
    position: number,
    isPermitted: boolean | null
  }
}

const Home: NextPage = (props) => {
  const beginning = useRef<HTMLElement>(null)
  const [width] = useResize()
  const [scrollMethodAdmissions, setAdmissions] = useState<Admissions>({})
  const [areEventsLoaded, setAreLoaded] = useState<boolean>(false)

  const hasPropData: dataOptions = props
  const propData: dataOptions = hasPropData.setting === "local" ? localMockData : props

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
        // width={width}
        // thickness="h-40"
        // color="bg-black"
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

Home.getInitialProps = async function({req}) {
  // Here i want to access the projectID sent from the previous page
  const r = require('ioredis')
  const moment = require('moment-timezone')
  const now = formatDate(moment.tz(new Date(), "America/New_York").format())
  
  const notifications: {
    error: unknown,
    warnings: unknown[]
  } = {
    error: null,
    warnings: []
  }

  try {
    if (!process.env.NEXT_PUBLIC_REDIS_URL) throw {
      line: 200,
      file: "pages/index",
      time: now.minimal,
      msg: "Missing Redis Credentials"
    }
    
    if (!process.env.NEXT_PUBLIC_BADGR_USER) throw {
      line: 207,
      file: "pages/index",
      time: now.minimal,
      msg: "Missing Badgr Username Credential"
    }
    
    if (!process.env.NEXT_PUBLIC_BADGR_PASS) throw {
      line: 214,
      file: "pages/index",
      time: now.minimal,
      msg: "Missing Badgr Password Credential"
    }

    const redis: any = await (new Promise((resolve, reject) => {
      const client = new r(process.env.NEXT_PUBLIC_REDIS_URL)
      client.on("error", function (err: any) {
        reject({
          line: 224,
          file: "pages/index",
          time: now.minimal,
          msg: "redis connection is unaccepted"
        })
      })

      client.on("ready", function () {
        resolve(client)
      })
    }))
    
    const hasCache = await redis.get("portfolioCache")
    if (hasCache) return JSON.parse(hasCache)

    const userData = await getUserData()
    
    const challangesData = await getChallengesData()

    // const gifFrames: Array<string> = await getFilesFromDir(req?.headers.host)

    let { hasAccessToken, hasRefreshToken } = await getBadgrAuthTokens(redis)

    const collectionData = await (async () => {
      const data = await getBadgrCollectionsData(hasAccessToken)

      if (!data.status.success) {
        const hasNewTokens = await getNewAccessToken(hasRefreshToken)

        const isGrantedToGetTokens = (hasNewTokens.error) ? await getBadgrAuthTokens(redis) : hasNewTokens

        const { access_token, refresh_token } = isGrantedToGetTokens
        hasAccessToken = access_token
        hasRefreshToken = refresh_token
        await redis.set('portfolioRefresh', refresh_token)
        await redis.set('portfolioAccess', access_token)

        const certainData = await getBadgrCollectionsData(access_token)
        return certainData
      }

      return data
    })()
    
    const badges: Array<Badge> = await Promise.all(collectionData.result[0].assertions.map(async (assertion: string) => {
      const badgeData = await getBadgrBadgeData(assertion, hasAccessToken)
      if (!badgeData.status.success) throw {
        line: 271,
        file: "pages/index",
        time: now.minimal,        
        msg: "Assertion is not found or access token is incorrect"
      }

      const {
        issuedOn,
        image,
        evidence,
        badgeclassOpenBadgeId
      } = badgeData.result[0]
      
      const {
        name,
        description,
        tags
      }: Record<string, string | Array<{[key: string]: string}>> = await getBadgrBadgeDecriptions(badgeclassOpenBadgeId, now.minimal)
      
      return {
        issuedOn,
        image,
        evidence,
        name,
        description,
        tags,
        rotations: {
          horizontal: 0,
          vertical: 0
        }
      }
    }))
    
    const overallStatsPayload: OverallPayload = {
      leaderBoardScore: userData.leaderboardPosition,
      totalCompleted: challangesData.totalItems,
      languagesTotal: (() => {
        let languages: {[key: string]: number} = {}
  
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
    }

    const mostRecentChallengeData: {
      name: string,
      totalAttempts: number,
      totalCompleted: number,
      url: string,
      tags: Array<string>,
      completionDate: string,
      completedLanguages: Array<string>,
      solutions: Array<{language: string, solution: string}>
      id: number,
      success: boolean
    } = await getMostRecentChallengeData(challangesData.data[0].id)
    if (!mostRecentChallengeData.success && !mostRecentChallengeData.id) throw {
      line: 336,
      file: "pages/index",
      time: now.minimal,
      msg: "Challenge Id does not exist"
    }

    const mostRecentPayload: Map<string, {title: string, languages: Array<{language: string, solution: string}>} | Array<string> | string | number> = new Map([
      ["title", mostRecentChallengeData.name],
      ["attemptedTotal", mostRecentChallengeData.totalAttempts],
      ["completedTotal", mostRecentChallengeData.totalCompleted],
      ["url", mostRecentChallengeData.url],
      ["tags", mostRecentChallengeData.tags],
      ["completionDate", challangesData.data[0].completedAt],
      ["languagesUsed", challangesData.data[0].completedLanguages]
    ])

    const mostRecentSolutions: {title: string, languages: Array<{language: string, solution: string}>} = JSON.parse(await redis.get("mostRecentSolution"))
    const languagesUsed = mostRecentPayload.get("languagesUsed") as Array<string>
    
    const doesCacheMatchWithCodewarsLanguages = languagesUsed.map((langaugeFromCodeWars: string) => {
      return !!mostRecentSolutions.languages.find((lAndSFromCache: {[key: string]: string}) => lAndSFromCache.language === langaugeFromCodeWars)
    }).reduce((final: boolean, value: boolean) => final && value)

    mostRecentSolutions.title !== mostRecentPayload.get("title") && notifications.warnings.push({
      line: 360,
      file: "pages/index",
      time: now.minimal,
      msg: "warning, using old payload. update cache with the newest challenge completed"
    })
      ||
    !doesCacheMatchWithCodewarsLanguages && mostRecentSolutions.title === mostRecentPayload.get("title") && notifications.warnings.push({
      line: 368,
      file: "pages/index",
      time: now.minimal,
      msg: "warning, all solutions are not included. update cache by including the solution for the newest language"
    })
      
    mostRecentPayload.set("solutions", mostRecentSolutions)
    
    const payload = {
      setting: 'external',
      data: {
        stats: {
          overallStatsPayload,
          mostRecentPayload: Object.fromEntries(mostRecentPayload),
        },
        knowledge: {
          // gifFrames,
          badges
        }
      },
    }
    
    redis.setex("portfolioCache", 88000, JSON.stringify(payload))

    return payload
  } catch (err) {
    // WRITE TO CLOUD AND BE RECEPTIVE TO ERRORS FROM OTHER FEED ex. email, 3rd party app like sandbox
    notifications.error = err

    return {
      setting: "local",
      err
    }
  } finally {
    if ((notifications.error || notifications.warnings.length) && process.env.NEXT_PUBLIC_NOTIFICATION_MAILING_SERVICE) {
      fetch(process.env.NEXT_PUBLIC_NOTIFICATION_MAILING_SERVICE, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notifications)
      })
        .catch((err: unknown) => console.log(err))
    }
  }
}

export default Home
