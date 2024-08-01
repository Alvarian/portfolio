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
  const handleRenderLinks: (elementType: string, size: string) => JSX.Element = (elementType: string, size: string) => {
    let outsourcedLinks = []
    let defaultLinks = []
    
    const stylesMapping = {
      footer: {
        default: {
          header: "text-2xl",
          menu: "flex flex-row justify-around w-full",
          menuList: "flex flex-col items-center",
          link: "text-md round-lg btn btn-ghost normal-case"
        },
        sm: {
          header: "text-2xl",
          menu: "flex flex-row justify-around w-full",
          menuList: "flex flex-col",
          link: "text-lg round-lg btn btn-ghost normal-case"
        }
      },
      header: {
        default: {
          header: `text-4xl`,
          menu: "flex flex-row justify-around w-full",
          menuList: "flex flex-col items-center",
          link: `text-2xl round-lg m-2 btn btn-ghost normal-case`
        },
        sm: {
          header: `text-xl mt-5`,
          menu: "flex flex-row justify-around w-full",
          menuList: "flex flex-row items-center",
          link: `text-sm round-lg btn btn-ghost normal-case`
        }
      }
    }

    let queDuration = 5;
    const styleMap = stylesMapping[elementType as keyof typeof stylesMapping]
    const styles = styleMap[size as keyof typeof styleMap]

    for (const index in sectionData) {
      const section: Content = sectionData[index]

      switch (section.type) {
        case "outsourced": 
          outsourcedLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><div className={styles["link"]}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</div></Link></motion.div>)

          break
        default:
          defaultLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><div className={styles["link"]}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</div></Link></motion.div>)

          break
      }
    }

    return (
      <div className={styles["menu"]}>
        {defaultLinks.length ? <div className={customStyles.tailwind.nav}>
          <motion.h1 className={styles["header"]}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Sections</motion.h1>

          <Underline width={null} />

          <div className={styles["menuList"]}>{defaultLinks}</div>
        </div> : ""}

        {outsourcedLinks.length ? <div className={customStyles.tailwind.nav}>
          <motion.h1 className={styles["header"]}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Outsourced</motion.h1>

          <Underline width={null} />

          <div className={styles["menuList"]}>{outsourcedLinks}</div>
        </div> : ""}
      </div>
    )
  }
  
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
      content: `flex justify-center ${content?.isFull ? "h-full w-full" : "h-2/3 w-2/3 rounded-3xl"} items-center`,
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
            handleRenderLinks={handleRenderLinks}
          />
        </div>
         : 
        <h1>{alt}</h1>
      }
    </section>
  )
}


export default Section
