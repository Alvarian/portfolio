import Image from "next/image"
import Link from "next/link"

import Section from 'shared/section'
import Underline from "shared/underline"
import { defaultVariants, sectionData } from 'lib/sections/sections.data'
import type { Content, Badge, OverallPayload, MostrecentPayload, Project } from 'lib/sections/sections.types'

import { motion } from "framer-motion"


const Footer: React.FC<{
  // handleRenderLinks: (elementType: string, size: string) => JSX.Element,
  width: number
}> = ({
  // handleRenderLinks,
  width
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
  
  const bio = (reponsiveType: string) => {
    const styles = reponsiveType === "mobile" ? {
      tailwind: {
        content: {
          nav: `navbar h-4/5 w-full flex flex-row justify-around`,
          name: `hidden`
        }
      }
    } : {
      tailwind: {
        content: {
          main: `bg-black/50 rounded-lg hover:bg-black h-4/5 w-5/6 flex justify-between flex-col items-center`,
          nav: `navbar h-4/5 w-5/6 flex flex-row justify-around`,
          name: `flex-1`
        }
      }
    }

    return (
      <div className={styles.tailwind.content.nav}>
        <div className={styles.tailwind.content.name}>
          <Link href="/"><div className="btn btn-ghost normal-case text-5xl">Ivan Alvarez</div></Link>
        </div>

        <div className="menu flex menu-vertical p-0 w-3/6">{handleRenderLinks("footer", width > 900 ? "default" : "sm")}</div>
      </div>
    )
  }

  const directory = (reponsiveType: string) => {
    const styles = reponsiveType === "mobile" ? {
      tailwind: {
        content: {
          buttons: {
            main: `flex flex-col justify-center w-full items-center pb-8`,
            links: `hover:invert bg-white flex items-center justify-center h-14 w-14 m-3 rounded-full`
          }
        }
      }
    } : {
      tailwind: {
        content: {
          main: `bg-black/50 rounded-lg hover:bg-black transition ease-in-out delay-150 duration-300 h-4/5 w-5/6 flex justify-between flex-col items-center`,
          nav: `navbar h-4/5 w-5/6 flex flex-row justify-around`,
          buttons: {
            main: `flex flex-col justify-center w-full items-center`,
            links: `hover:invert bg-white flex items-center justify-center h-20 w-20 m-3 rounded-full`
          }
        }
      }
    }

    return (
      <div className={styles.tailwind.content.buttons.main}>
        <Underline width="80%" />

        <div className="flex flex-row">
          <motion.a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallLeft(5)}
          ><Image alt="" width={45} height={45} src="/icons/github.svg" /></motion.a>
          
          <motion.a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallLeft(6)}
          ><Image alt="" width={30} height={30} src="/icons/linkedin.svg" /></motion.a>
        </div>
      </div>
    )
  }

  return (
    <footer className="footer footer-center h-screen relative w-full" id="footer">
      {width < 950 ?
        <div className="bg-black/50 h-4/5 w-full flex justify-between flex-col items-center">
          {bio("mobile")}

          {directory("mobile")}
        </div>
        :
        <div className="bg-black/50 rounded-lg hover:bg-black h-4/5 w-5/6 flex justify-between flex-col items-center">
          {bio("default")}

          {directory("default")}
        </div>
      }
    </footer>
  )
}

const FooterSection: React.FC<{width: number}> = ({
  width
}) => {
  return <Section
    key="last"
    content={{body: Footer, isFull: true}}
    width={width}
    setRef={null}
    isSectionPermitted={null}
    bgImageName="library-min.jpg"
    keyIcon={null}
    serverProps={null}
    alt="footer"
  />
}


export default FooterSection
