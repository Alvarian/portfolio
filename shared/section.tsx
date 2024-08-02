import Link from 'next/link'

import type { Content, Badge, OverallPayload, MostrecentPayload, Project } from 'lib/sections/sections.types'
import { sectionData, defaultVariants } from 'lib/sections/sections.data'
import Underline from "shared/underline"

import { motion } from 'framer-motion'


const Section: React.FC<{
  content: Content["content"],
  bgImageName: string,
  width: number,
  setRef: React.RefObject<HTMLElement> | null,
  isSectionPermitted: boolean | null,
  serverProps: Project[] | Badge[] | { overallStatsPayload: OverallPayload; mostRecentPayload: MostrecentPayload; } | null,
  keyIcon: string | null,
  alt: string
}> = ({
  content,
  bgImageName,
  width,
  setRef,
  isSectionPermitted,
  serverProps,
  keyIcon,
  alt
}) => { 
  const customStyles = {
    css: {
      background: {
        backgroundImage: "url(./images/" + bgImageName + ")",
        filter: `blur(2px)`
      },
    },
    tailwind: {
      main: `flex justify-center h-screen w-full items-center relative overflow-hidden`,
      background: `bg-no-repeat bg-cover bg-center bg-fixed absolute w-full h-full -z-10`,
      content: `flex justify-center ${content?.isFull ? "h-full w-full" : "h-2/3 w-2/3 rounded-3xl"} items-center relative`,
      nav: `flex flex-col items-center`
    }
  }
  
  return (
    <section className={customStyles.tailwind.main} id={alt} ref={setRef}>
      <div className={customStyles.tailwind.background} style={customStyles.css.background}></div>

      {content?.body ? 
        <div className={customStyles.tailwind.content}>
          <content.body 
            data={serverProps} 
            icon={keyIcon} 
            width={width} 
            alt={alt}
            isSectionPermitted={isSectionPermitted}
          />
        </div>
         : 
        <h1>{alt}</h1>
      }
    </section>
  )
}


export default Section
