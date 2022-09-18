import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"
import CountUp from 'react-countup';

import SlideShow from "shared/slideshow";
import { dataOptions, MostrecentPayload, OverallPayload } from "lib/sections/sections.types";
import Icon, { IconInter } from "shared/icon"
import { getFormattedDate } from "lib/sections/sections.methods";
import Chart from "shared/chart";


const MostRecent: React.FC<{
  payload: MostrecentPayload,
  width: number
}> = ({ 
  payload,
  width
}) => {
  const {
      title,
      attemptedTotal,
      completedTotal,
      url,
      tags,
      completionDate,
      solutions
  } = payload
  
  const [currentSnippet, setSnippet] = useState(solutions.languages[0].language)
  
  const { css, tailwind } = width > 900 ? {
      css: {},
      tailwind: {
          main: `bg-gradient-to-l rounded-lg from-black flex flex-col justify-around pt-10 min-w-[825px]`,
          snippetContainer: `flex-col justify-start items-start w-full`,
          snippetMain: `bg-gradient-to-l from-amber-200 flex justify-center w-full p-5`,
          snippetDetails: `text-left text-lg pr-10 min-w-[340px] mb-10`,
          snippetTitle: `p-10 text-right text-3xl font-bold`,
          snippetTab: `tab tab-lifted`,
          snippetSolution: `h-5/6 font-sans font-bold w-full bg-slate-800 text-lime-600 p-5 whitespace-pre-wrap text-left text-lg overflow-scroll`
      }
  } : {
      css: {},
      tailwind: {
          main: `bg-gradient-to-l rounded-lg from-black flex flex-col justify-around pt-10 min-w-[450px]`,
          snippetContainer: `flex-col justify-start items-start w-full`,
          snippetMain: `bg-gradient-to-l from-amber-200 flex flex-col items-center justify-center w-full p-5`,
          snippetDetails: `text-left text-md pl-10 min-w-[320px] mb-10`,
          snippetTitle: `p-5 text-xl font-bold`,
          snippetTab: `text-md tab tab-lifted`,
          snippetSolution: `text-md h-5/6 font-sans font-bold w-full bg-slate-800 text-lime-600 p-5 whitespace-pre-wrap text-left text-lg overflow-scroll`
      }
  }

  const renderTags = () => {
      return tags.map((tag: string, index: number) => {
          return (
              <div key={index}>#{tag}</div>
          )
      })
  }

  const renderSnippets = () => {
      const languageTabs = []
      const languageSnippets = []
      
      for (let i = 0; i < solutions.languages.length; i++) {
          const snippet = solutions.languages[i]

          const styles = {
              button: `${tailwind.snippetTab} ${currentSnippet === snippet.language ? "tab-active bg-slate-700" : "bg-slate-200"}`,
              snippet: `${tailwind.snippetSolution} ${currentSnippet === snippet.language ? "flex" : "hidden"}`
          }

          languageTabs.push(<button key={snippet.language+"_tab"} className={styles.button} onClick={() => setSnippet(snippet.language)}>{snippet.language.toLocaleUpperCase()}</button>)
          languageSnippets.push(<pre key={snippet.language+"_snip"} className={styles.snippet}>{snippet.solution}</pre>)
      }

      return (
          <div className={tailwind.snippetContainer}>
              <span className="tabs">{languageTabs}</span>

              {languageSnippets}
          </div>
      )
  }

  return (
      <div className="flex flex-col h-full">
          <motion.div
              id="recent"
              className={tailwind.main}
              initial="enter"
              animate="center"
              exit="exit"
              variants={slider}
              custom={1}
              transition={{
                  x: {
                      type: "spring",
                      stiffness: 800,
                      damping: 100,
                      duration: 0.4
                  },
                  opacity: { duration: 0.6 }
              }}
          >
              <h2 className={tailwind.snippetTitle}>Most Recent Challenge Completed</h2>

              <div className={tailwind.snippetMain}>
                  <div className={tailwind.snippetDetails}>
                      <p>&gt; Challenge: <a className="btn btn-accent btn-xs" href={url} target="_blank">{title}</a></p>
                      <p>&gt; Completion Rate: <span className="font-extrabold">{Math.round((completedTotal / attemptedTotal) * 1000) / 10}%</span></p>
                      <p>&gt; Completed: <span className="font-extrabold">{getFormattedDate(completionDate)}</span></p>
                  </div>

                  <div className="flex h-80 w-[53%] min-w-[390px]">{renderSnippets()}</div>
              </div>

              <div className="flex justify-around">{renderTags()}</div>
          </motion.div>
      </div>
  )
}

const Overall: React.FC<{
    payload: OverallPayload,
    isSectionPermitted: boolean,
    width: number
}> = ({ 
    payload, 
    isSectionPermitted,
    width
}) => {
    const overallMenuData: (mappedPayload: dataOptions) => Array<IconInter> = (mappedPayload: dataOptions) => {
        return [
            {
                name: "Profile",
                size: "sm",
                kind: {
                    type: "link",
                    content: "https://www.codewars.com/users/Alvarian_",
                    callback: () => {}
                },
                src: "/icons/codewars.svg",
                position: "right",
                content: null,
                custom: {
                    parent:"bg-red-700 border hover:invert",
                    img: "",
                    content: ""
                }
            },
            {
                name: "Rank",
                size: "md",
                kind: {
                    type: "",
                    content: "",
                    callback: () => {}
                },
                src: "/icons/star-svgrepo-com.svg",
                position: "center",
                content: mappedPayload["Rank"],
                custom: {
                    parent:"",
                    img: "",
                    content: ""
                }    
            },
            {
                name: "Completed",
                size: "md",
                kind: {
                    type: "",
                    content: "",
                    callback: () => {}
                },
                src: "/icons/fire-svgrepo-com.svg",
                position: "center",
                content: mappedPayload["Completed"],
                custom: {
                    parent: "",
                    img: "",
                    content: ""
                }    
            }
        ]
    }

    const {     
        leaderBoardScore,
        languagesTotal,
        totalCompleted
    } = payload
    
    const roundThousandsOrGetDefault = (num: number) => {
        return Math.abs(num) > 999 ? (Math.sign(num)*Math.abs(num)/1000).toFixed(1) + 'k' : Math.sign(num)*Math.abs(num)
    }

    const { css, tailwind } = width > 900 ? {
        css: {},
        tailwind: {
            main: `flex flex-col h-full min-h-[624px] min-w-[600px]`,
            container: `bg-gradient-to-r rounded-lg from-black h-full flex flex-col justify-center pt-10`,
            header: `p-10 text-left text-4xl font-bold`,
            rankings: `flex justify-around items-center`,
            rankIcons: `flex items-center justify-center text-3xl`,
            donutContainer: `bg-gradient-to-r from-amber-200 flex justify-around py-10 text-2xl`,
            donut: `h-[300px] w-[300px]`
        }
    } : {
        css: {},
        tailwind: {
            main: `flex flex-col h-full min-h-[624px] min-w-[600px]`,
            container: `bg-gradient-to-r rounded-lg from-black h-full flex flex-col justify-center pt-10`,
            header: `p-10 text-left text-3xl font-bold`,
            rankings: `flex justify-around items-center`,
            rankIcons: `flex items-center justify-center text-lg`,
            donutContainer: `bg-gradient-to-r from-amber-200 flex justify-around py-5 text-md`,
            donut: `h-[200px] w-[200px]`
        }
    }

    return (
        <div className={tailwind.main}>
            {isSectionPermitted && <motion.div
                id="overall"
                className={tailwind.container}
                initial="enter"
                animate="center"
                exit="exit"
                variants={slider}
                custom={-1}
                transition={{
                    x: {
                        type: "spring",
                        stiffness: 800,
                        damping: 100,
                        duration: 0.1
                    },
                    opacity: { duration: 0.4 }
                }}
            >
                <h2 className={tailwind.header}>Overall Stats (codewars)</h2>

                <div className={tailwind.rankings}>
                    {overallMenuData({
                        Rank: roundThousandsOrGetDefault(leaderBoardScore),
                        Completed: <CountUp duration={4} end={totalCompleted} /> 
                    }).map((item: IconInter) => (
                        <div className={tailwind.rankIcons} key={item.name}>
                            <span>{item.name}: </span>

                            <Icon 
                                name={item.name}
                                size={item.size}
                                kind={item.kind}
                                src={item.src}
                                position={item.position}
                                content={item.content}
                                custom={item.custom}
                            />
                        </div>
                    ))}
                </div>

                <Chart languagesTotal={languagesTotal} bgStyle={"bg-gradient-to-r from-amber-200"} />
            </motion.div>}
        </div>
    ) 
}

const index: React.FC<{
  data: {
    overallStatsPayload: OverallPayload, 
    mostRecentPayload: MostrecentPayload
  },
  isSectionPermitted: boolean,
  width: number
}> = ({ 
  data,
  isSectionPermitted,
  width
}) => {
  const [isVisible, setVisible] = useState(true)

  const { overallStatsPayload, mostRecentPayload } = data

  const handleVisible: () => void = () => {
    setVisible(!isVisible)
  }
  
  const styles = {
    tailwind: {
      main: `w-full h-full`
    }
  }

  const orArrowAttributes: dataOptions = (isVisible) ? {
    position: "right",
    content: "Most Recent Challenge",
    custom: {
      parent: "",
      img: "rotate-90",
      content: "text-2xl text-center bg-gradient-to-l from-yellow-300 h-12 p-3"
    }
  } : {
    position: "left",
    content: "Overall Challenges",
    custom: {
      parent: "",
      img: "-rotate-90",
      content: "text-2xl text-center bg-gradient-to-r from-yellow-300 p-3 h-12"
    }
  }

  return (
    <SlideShow
      styles={styles.tailwind.main}
    >
      {isVisible ? <Overall 
        key="overall"
        payload={overallStatsPayload}
        isSectionPermitted={isSectionPermitted}
        width={width}
      />
        :
      <MostRecent 
        key="recent"
        payload={mostRecentPayload}
        width={width}
      />}

      <Icon 
        name="arrow"
        position={orArrowAttributes.position}
        src="/icons/up-arrow-svgrepo-com.svg"
        size="lg"
        content={orArrowAttributes.content}
        kind={{
          type: "button",
          content: "",
          callback: handleVisible
        }}
        custom={orArrowAttributes.custom}
      />
    </SlideShow>
  )
} 

const directionOffset = 600

export const slider = {
    enter: (direction: number) => ({
        x: direction < 0 ? -directionOffset : directionOffset,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? -directionOffset : directionOffset,
        opacity: 0
    })
}

export default index