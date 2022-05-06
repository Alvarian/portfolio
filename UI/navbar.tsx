import Image from 'next/image'

import { sectionData } from 'lib/sections/sections.data'
import { Content } from 'lib/sections/sections.types'

import { useResize } from 'hooks/'


const Navbar: React.FC<any> = () => {
  const [width] = useResize();

  const styles = {
    css: {
      minWidth: '600px'
    },
    tailwind: {
      main: `navbar h-8 bg-black absolute z-10 p-10`,
      header: `btn btn-ghost normal-case text-4xl`,
      background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      content: {
        main: `bg-black/50 rounded-lg hover:bg-black h-4/5 w-5/6 flex justify-between flex-col items-center`,
        nav: `navbar h-4/5 w-5/6 flex flex-row justify-around`,
        buttons: {
          main: `flex flex-col justify-center w-full items-center pb-8`,
          links: `hover:invert bg-white flex items-center justify-center h-14 w-14 m-3 rounded-full`
        }
      }
    }
  }

  return (
    <div className="navbar bg-black h-28 z-40 fixed -top-28 left-0" style={styles.css} id="dropingNavbar">
      <div className="navbar-start">
        {width > 800 ? 
          <ul className="menu menu-horizontal text-xl shadow bg-black">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
          :
          <div className="dropdown pl-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:invert text-base-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box mt-7 text-2xl shadow bg-black">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        }
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-4xl">Ivan Alvarez</a>
      </div>

      <div className="navbar-end">
        {width > 800 ?
          <>
            <a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={45} height={45} src="/icons/github.svg" /></a>
            
            <a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={30} height={30} src="/icons/linkedin.svg" /></a>
          </>
          :
          <div className="dropdown dropdown-end pr-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle bg-base-100 hover:invert">
              <Image width={40} height={40} src="/icons/social-media.svg" />
            </label>

            <ul className="menu menu-compact dropdown-content rounded-box shadow bg-black mt-9">
              <li><a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={45} height={45} src="/icons/github.svg" /></a></li>
              
              <li><a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={30} height={30} src="/icons/linkedin.svg" /></a></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar