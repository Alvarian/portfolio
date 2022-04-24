import { sectionData } from 'lib/sections/sections.data'
import { Content } from 'lib/sections/sections.types'


const Navbar: React.FC<any> = () => {
  const handleRenderLinks = () => {
    return sectionData.map((section: Content, index: number) => {
      return (<li key={index}><a>{section.title}</a></li>)
    })
  }

  return (
    <div className="navbar h-4 bg-black absolute z-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Ivan Alvarez</a>
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