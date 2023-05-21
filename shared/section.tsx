import Link from 'next/link'

import { Badge, Content, dataOptions, MostrecentPayload, OverallPayload } from 'lib/sections/sections.types'
import { sectionData, defaultVariants } from 'lib/sections/sections.data'
import Underline from "shared/underline"

import { motion } from 'framer-motion'


const Section: React.FC<{
  content: {
    body: React.FC<any>,
    isFull: boolean
  } | null,
  bgImageName: string,
  width: number,
  setRef: React.RefObject<HTMLElement> | null,
  isSectionPermitted: boolean | null,
  serverProps: {
    overallStatsPayload: OverallPayload,
    mostRecentPayload: MostrecentPayload,
  } | {
    gifFrames: Array<string>,
    badges: Array<Badge>
  } | null,
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
    
    const stylesMapping: dataOptions = {
      footer: {
        default: {
          header: "text-3xl",
          link: "text-xl round-lg m-2 btn btn-ghost normal-case"
        },
        sm: {
          header: "text-3xl",
          link: "text-xl round-lg m-2 btn btn-ghost normal-case"
        }
      },
      header: {
        default: {
          header: `text-4xl`,
          link: `text-2xl round-lg m-2 btn btn-ghost normal-case`
        },
        sm: {
          header: `text-2xl mt-10`,
          link: `text-sm round-lg btn btn-ghost normal-case`
        }
      }
    }

    let queDuration = 5;
    for (const index in sectionData) {
      const section: Content = sectionData[index]
      const styles = stylesMapping[elementType][size] && stylesMapping[elementType][size]["link"]

      switch (section.type) {
        case "outsourced": 
          outsourcedLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><li className={styles}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</li></Link></motion.div>)

          break
        default:
          defaultLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><li className={styles}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</li></Link></motion.div>)

          break
      }
    }

    return (
      <div className="flex flex-row justify-around w-full">
        {defaultLinks.length ? <div className={styles.tailwind.nav}>
          <motion.h1 className={stylesMapping[elementType][size] && stylesMapping[elementType][size]["header"]}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Sections</motion.h1>

          <Underline width={null} />

          {defaultLinks}
        </div> : ""}

        {outsourcedLinks.length ? <div className={styles.tailwind.nav}>
          <motion.h1 className={stylesMapping[elementType][size] && stylesMapping[elementType][size]["header"]}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Outsourced</motion.h1>

          <Underline width={null} />

          {outsourcedLinks}
        </div> : ""}
      </div>
    )
  }
  
  const styles = {
    css: {
      background: {
        // backgroundImage: "url(" + bgImageName + ")",
        filter: `blur(2px)`
      },
    },
    tailwind: {
      main: `flex justify-center h-screen w-full items-center relative min-h-[900px] overflow-hidden`,
      background: `fixed w-full h-full -z-10`,
      // background: `bg-no-repeat bg-cover bg-center bg-fixed absolute w-full h-full -z-10`,
      content: `flex justify-center ${content?.isFull ? "h-full w-full" : "h-2/3 w-2/3 rounded-3xl"} items-center`,
      nav: `flex flex-col items-center `
    }
  }
  
  return (
    <section className={styles.tailwind.main} id={alt} ref={setRef}>
      {/* <div className={styles.tailwind.background} style={styles.css.background}>
        <Image 
          src={bgImageName}
          layout="fill"
          priority
        />
      </div> */}

      {content?.body ? 
        <div className={styles.tailwind.content}>
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