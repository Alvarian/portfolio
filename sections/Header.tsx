import Image from "next/image"

import KeyIcon from "shared/keyicon"
import Underline from "shared/underline"

import { motion } from "framer-motion"
import { defaultVariants } from "lib/sections/sections.data"


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