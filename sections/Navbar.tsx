import Image from 'next/image'

import { sectionData, defaultVariants } from 'lib/sections/sections.data'

import Link from 'next/link'
import { motion } from 'framer-motion'


const Navbar: React.FC<{
  navVisible: boolean,
  width: number
}> = ({
  navVisible,
  width
}) => {
  const handleRenderLinks = (textStyles: string) => {
    return sectionData.map((section, index) => (
      <li key={index}>
        <Link href={"#"+section.alt}>
          <span className={textStyles}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</span>
        </Link>
      </li>
    ))
  }

  const styles = {
    css: {
      minWidth: '600px'
    },
    tailwind: {
      main: `navbar bg-black z-40 fixed left-0`,
      header: `btn btn-ghost normal-case text-4xl`,
      background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      content: {
        main: `bg-black/50 rounded-lg hover:bg-black h-4/5 w-5/6 flex justify-between flex-col items-center`,
        nav: `navbar h-4/5 w-5/6 flex flex-row justify-around`,
        buttons: {
          main: `flex flex-col justify-center w-full items-center pb-8`,
          links: `hover:invert bg-white flex items-center justify-center h-12 w-12 rounded-full`
        }
      }
    }
  }
  
  return (
    <motion.div className={styles.tailwind.main} style={styles.css} id="droppingNavbar"
      variants={defaultVariants.dropDown(1)}
      animate={navVisible ? 'lift' : 'drop'}
    >
      <div className="navbar-start justify-center">
        {width > 920 ? 
          <ul className="menu menu-horizontal shadow bg-black">
            {handleRenderLinks("text-md")}
          </ul>
          :
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:invert text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box mt-7 p-3 shadow bg-black">
              {handleRenderLinks("text-2xl font-bold")}
            </ul>
          </div>
        }
      </div>

      <div className="navbar-center">
        <a href="/" className="btn btn-ghost normal-case text-3xl">Ivan Alvarez</a>
      </div>

      <div className="navbar-end justify-center">
        {width > 900 ?
          <ul className="menu menu-horizontal justify-around shadow min-w-[200px]">
            <li><a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={35} height={35} src="/icons/github.svg" /></a></li>
            
            <li><a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={25} height={25} src="/icons/linkedin.svg" /></a></li>
          </ul>
          :
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle bg-white hover:invert">
              <Image alt='' width={40} height={40} src="/icons/social-media.svg" />
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box shadow mt-9">
              <li><a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={45} height={45} src="/icons/github.svg" /></a></li>
              
              <li><a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image alt='' width={30} height={30} src="/icons/linkedin.svg" /></a></li>
            </ul>
          </div>
        }
      </div>
    </motion.div>
  )
}

export default Navbar
