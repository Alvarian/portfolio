import Image from "next/image"
import Link from "next/link"

import Section from 'shared/section'
import Underline from "shared/underline"
import { defaultVariants } from 'lib/sections/sections.data'

import { motion } from "framer-motion"


const Footer: React.FC<{
  handleRenderLinks: (elementType: string, size: string) => JSX.Element,
  width: number
}> = ({
  handleRenderLinks,
  width
}) => {  
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
          name: `flex-1 btn btn-ghost normal-case text-5xl`
        }
      }
    }

    return (
      <div className={styles.tailwind.content.nav}>
        <div className={styles.tailwind.content.name}>
          <Link href="/">Ivan Alvarez</Link>
        </div>

        <div className="menu flex menu-vertical p-0 w-3/6">{handleRenderLinks("footer", "default")}</div>
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
            main: `flex flex-col justify-center w-full items-center pb-8`,
            links: `hover:invert bg-white flex items-center justify-center h-20 w-20 m-3 rounded-full`
          }
        }
      }
    }

    return (
      <div className={styles.tailwind.content.buttons.main}>
        <Underline width="80%" />

        <div className="flex flex-row">
          <motion.div className={styles.tailwind.content.buttons.links}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallLeft(5)}
          ><Link rel="noopener noreferrer" href="https://github.com/Alvarian/" target="_blank"><Image alt="" width={45} height={45} src="/icons/github.svg" /></Link></motion.div>
          
          <motion.div className={styles.tailwind.content.buttons.links}
            initial="hidden"
            whileInView="visible"
            variants={defaultVariants.fallLeft(6)}
          ><Link rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" target="_blank"><Image alt="" width={30} height={30} src="/icons/linkedin.svg" /></Link></motion.div>
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
    bgImageName="/images/library-min.jpg"
    keyIcon={null}
    serverProps={null}
    alt="footer"
  />
}


export default FooterSection