import { sectionData } from 'lib/sections/sections.data'
import { Content } from 'lib/sections/sections.types'


const Navbar: React.FC<any> = ({
  handleRenderLinks
}) => {
  const styles = {
    css: {},
    tailwind: {
      main: `navbar h-8 bg-black absolute z-10 p-10`,
      header: `btn btn-ghost normal-case text-4xl`,
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