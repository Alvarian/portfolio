import React, { useEffect, useRef, useState } from 'react'
React.useLayoutEffect = React.useEffect 
import type { NextPage } from 'next'
import Head from 'next/head'
import { FaRegWindowMaximize } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { Bar } from 'react-chartjs-2';

import Section from 'shared/section'
import Border from 'sections/Border'
import Footer from 'sections/Footer'
import Navbar from 'sections/Navbar'
import { useResize } from 'hooks/'

import { Content, dataOptions } from 'lib/sections/sections.types'
import { localMockData, sectionData } from 'lib/sections/sections.data'
import { rateLimiters } from 'lib/sections/sections.methods'
import { motion } from 'framer-motion'


interface Admissions {
  [key: string]: {
    position: number,
    isPermitted: boolean | null
  }
}

export async function getServerSideProps (ctx: any) {
  const payload = await (await fetch("http://"+ctx.req.headers.host+'/api/cache/getAllContentOnly')).json()

  return {props: payload}
}

const Home: NextPage = (props) => {
  const beginning = useRef<HTMLElement>(null)
  const [width] = useResize()
  const [scrollMethodAdmissions, setAdmissions] = useState<Admissions>({})
  const [areEventsLoaded, setAreLoaded] = useState<boolean>(false)
  const [modalCoverPageData, setModalCoverPageData] = useState<{[key: string]: number} | null>(null)

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

  const handleModalTogle = (e: any) => {
    const body = document.querySelector("body") as HTMLElement
    const projectBox = document.getElementById("project-box") as HTMLDivElement

    if (e.target.checked) {
      body.style.overflow = "hidden"
    } else {
      projectBox.innerHTML = ""
      body.style.overflow = "auto"
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

  const makeProjectBoxFullScreen = (e: any) => {
    const projectBox = document.querySelector('#project-box') as HTMLDivElement
    if (projectBox.requestFullscreen) {
      projectBox.requestFullscreen();
    } 
    // else if (projectBox.webkitRequestFullscreen) { /* Safari */
    //   projectBox.webkitRequestFullscreen();
    // } else if (projectBox.msRequestFullscreen) { /* IE11 */
    //   projectBox.msRequestFullscreen();
    // }
  }

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
        setModalCoverPageData={setModalCoverPageData}
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

  const VOptions = {
	  title: {
	  	display: true,
	  	text: "Languages Used",
	  	fontSize: "25"
	  },
	  legend: {
	  	display: false
	  },
	  scales: {
	    yAxes: [
	      {
	        ticks: {
	          beginAtZero: true
	        },
	      },
	    ],
	  },
	  maintainAspectRatio: false
	};

	const chartData = (stacks: any) => {
	  return {
      labels: stacks.map((g: any) => g.x),
      datasets: [
        {
          label: "Percentage",
          data: stacks.map((g: any) => Math.round((g.y/stacks.total)*10000)/100 ),
          backgroundColor: getRandomColor(stacks),
          borderColor: getRandomColor(stacks),
          borderWidth: 1,
        }
      ]
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

      <input type="checkbox" id="project-modal" className="modal-toggle" onChange={handleModalTogle.bind(this)} />
      <label htmlFor="project-modal" className="modal cursor-pointer">
        <label className="modal-box relative mt-10 h-[580px] min-w-[780px] max-w-[780px] flex items-center justify-center">
          <div className='z-10 absolute right-2 top-2 absolute w-32 flex justify-around'>
            <label className="border-2 border-white btn btn-sm text-2xl" onClick={makeProjectBoxFullScreen.bind(this)}><FaRegWindowMaximize /></label>

            <label htmlFor="project-modal" className="border-2 border-white btn btn-sm text-2xl"><VscChromeClose /></label>
          </div>

          <div className='h-full w-full relative'>
            <div id="project-box" className='w-full h-full'></div>

            {modalCoverPageData && <motion.div className='bg-black absolute top-0 left-0 h-full w-full'
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1
                  },
                },
                hidden: {
                  opacity: 0,
                  display: "none"
                },
              }}
              initial="visible"
						  animate={modalCoverPageData ? "visible" : "hidden"}
            >
							<h1 className="chart-title">{modalCoverPageData.title}</h1>

              <div className="chart-details">
                <Bar
                  data={chartData(modalCoverPageData.stacks)}
                  options={VOptions}
                  height={320}
                />
              </div>

						  <button onClick={() => setModalCoverPageData(null)}>Continue</button>
					  </motion.div>}
          </div>
        </label>
      </label>

      <input type="checkbox" id="service-modal" className="modal-toggle" onChange={handleModalTogle.bind(this)} />
      <label htmlFor='service-modal' className="modal sm:modal-middle cursor-pointer">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">A service goes in here</p>
          <div className="modal-action">
            <label htmlFor="service-modal" className="btn">Yay!</label>
          </div>
        </div>
      </label>
    </div>
  )
}

export default Home
function getRandomColor(stacks: any) {
  throw new Error('Function not implemented.')
}

