import Image from "next/image"
import Link from "next/link"

import KeyIcon from "shared/keyicon"
import Underline from "shared/underline"

import { motion } from "framer-motion"
import { defaultVariants, sectionData } from "lib/sections/sections.data"
import type { Content, Badge, OverallPayload, MostrecentPayload, Project } from 'lib/sections/sections.types'


const Header: React.FC<{
  handleRenderLinks: (elementType: string, size: string) => JSX.Element,
  width: number,
  icon: string
}> = ({
  handleRenderLinks,
  width,
  icon
}) => {
  const bio = (reponsiveType: string, iconSize: number) => {
    const styles = reponsiveType === "mobile" ? {
      tailwind: {
        background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
        content: {
          profile: `w-2/3 flex flex-col justify-center items-center`,
          buttons: {
            main: `z-10 flex flex-col justify-center w-full items-center`,
            links: `hover:invert bg-white flex items-center justify-center h-10 w-10 m-3 rounded-full`
          },
          description: `z-10 normal-case text-base`,
          name: `z-10 normal-case text-4xl p-5`
        }
      }
    } : {
      tailwind: {
        background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
        content: {
          profile: `w-2/3 h-5/6 flex flex-col pl-[60px] justify-around items-center`,
          buttons: {
            main: `z-10 flex flex-col justify-center w-full items-center pb-8`,
            links: `hover:invert bg-white flex items-center justify-center h-[80px] w-[80px] m-3 rounded-full`
          },
          description: `z-10 normal-case text-xl`,
          name: `z-10 normal-case text-5xl p-5`
        }
      }
    }

    return (
      <div className={styles.tailwind.content.profile}>
        {/* <div className="w-80 h-80 bg-black rounded-full relative flex justify-center items-center">
          MIGHT USE THIS TO REPRESENT SECTION ANIMATION TRIGGER
          <KeyIcon icon={icon} size={iconSize} />
        </div> */}
        <KeyIcon icon={icon} size={iconSize} />

        <motion.h1 className={styles.tailwind.content.name}
          initial="hidden"
          whileInView="visible"
          variants={defaultVariants.fallUp(1)}
        >Ivan Alvarez</motion.h1>

        <motion.div className={styles.tailwind.content.description}
          initial="hidden"
          whileInView="visible"
          variants={defaultVariants.fallUp(2)}            
        >An indie website and software developer. Current project stacks are mostly javascript based and are available in my github!</motion.div>

        <div className={styles.tailwind.content.buttons.main}>
          {/* <Underline width="100%" /> */}

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
      </div>
    )
  }

  const directory = (reponsiveType: string) => {
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
        tailwind: {
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

    
    const styles = reponsiveType === "mobile" ? {
      tailwind: `menu menu-vertical p-0`,
      renderLinkSize: 'sm'
    } : {
      tailwind: `menu menu-vertical p-0 w-1/3`,
      renderLinkSize: 'default'
    }

    return (<div className={styles.tailwind}>{handleRenderLinks("header", styles.renderLinkSize)}</div>)
  }

  return (
    <header className="m-auto relative h-full w-full">
      <div className="h-inherit w-inherit">
        <div className="bg-black w-full h-64"></div>
        <div className="bg-gradient-to-b w-full from-black h-full"></div>
       
        {width < 800 ?
          <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center mt-10">
            {bio("mobile", 200)}
            
            {directory("mobile")}
          </div>
          :
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-around">
            {bio("default", 200)}

            {directory("default")}
          </div>
        }

      </div>
    </header>
  )
}

export default Header
