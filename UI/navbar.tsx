import { sectionData } from 'lib/sections/sections.data'
import { Content } from 'lib/sections/sections.types'
import Link from 'next/link'


const Navbar: React.FC<any> = () => {
  const handleRenderLinks = () => {
    return sectionData.map((section: Content, index: number) => {
      return (<Link href={"#"+section.alt}><li className={styles.tailwind.links} key={index}><a>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link>)
    })
  }

  const styles = {
    css: {},
    tailwind: {
      main: `navbar h-8 bg-black absolute z-10 p-10`,
      header: `btn btn-ghost normal-case text-4xl`,
      links: `text-3xl`
    }
  }

  return (
    <div className={styles.tailwind.main}>
      <div className="flex-1">
        <a className={styles.tailwind.header}>Ivan Alvarez</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {handleRenderLinks()}
        </ul>
      </div>
    </div>
  )
}

export default Navbar