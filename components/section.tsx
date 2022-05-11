import Link from 'next/link'

import { Content } from 'lib/sections/sections.types'
import { sectionData, defaultVariants } from 'lib/sections/sections.data'
import Underline from "components/underline"

import { motion } from 'framer-motion'


const Section: React.FC<any> = ({
  content,
  bgImageName,
  width,
  setRef,
  serverProps,
  keyIcon,
  alt,
}) => {
  const handleRenderLinks = (fontType: string) => {
    let outsourcedLinks = []
    let defaultLinks = []
    
    const fontSize = (() => {
      switch (fontType) {
        case "footer": return {
          header: "text-3xl",
          link: "text-xl round-lg m-2 btn btn-ghost normal-case"
        }
        case "header": return {
          header: "text-4xl",
          link: "text-2xl round-lg m-2 btn btn-ghost normal-case"
        }
      }
    })()

    let queDuration = 5;
    for (const index in sectionData) {
      const section: Content = sectionData[index]

      switch (section.type) {
        case "outsourced": 
          outsourcedLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><li><a className={fontSize?.link}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link></motion.div>)

          break
        default:
          defaultLinks.push(<motion.div
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(++queDuration)}
            key={index}
          ><Link href={"#"+section.alt}><li><a className={fontSize?.link}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link></motion.div>)

          break
      }
    }

    return (
      <div className="flex flex-row justify-around w-full">
        {defaultLinks.length ? <div className={styles.tailwind.nav}>
          <motion.h1 className={fontSize?.header}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Sections</motion.h1>

          <Underline />

          {defaultLinks}
        </div> : ""}

        {outsourcedLinks.length ? <div className={styles.tailwind.nav}>
          <motion.h1 className={fontSize?.header}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallUp(1)}
          >Outsourced</motion.h1>

          <Underline />

          {outsourcedLinks}
        </div> : ""}
      </div>
    )
  }

  const styles = {
    css: {
      background: {
        backgroundImage: "url(./images/" + bgImageName + ")",
        filter: `blur(2px)`
      },
    },
    tailwind: {
      main: `flex justify-center h-screen w-full items-center relative`,
      background: `bg-no-repeat bg-cover bg-center bg-fixed absolute w-full h-full -z-10`,
      content: `flex justify-center ${content.isFull ? "h-full w-full" : "h-2/3 w-2/3 rounded-3xl"} items-center`,
      nav: `flex flex-col items-center`
    }
  }
  
  return (
    <section className={styles.tailwind.main} id={alt} ref={setRef}>
      <div className={styles.tailwind.background} style={styles.css.background}></div>

      {content.body ? 
        <div className={styles.tailwind.content}><content.body data={serverProps} icon={keyIcon} width={width} handleRenderLinks={handleRenderLinks} /></div>
         : 
        <h1>{alt}</h1>
      }
    </section>
  )
}

export default Section