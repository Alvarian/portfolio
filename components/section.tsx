import Link from 'next/link'

import { Content } from 'lib/sections/sections.types'
import { sectionData } from 'lib/sections/sections.data'


const Section: React.FC<any> = ({
  content,
  bgImageName,
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

    for (const index in sectionData) {
      const section: Content = sectionData[index]

      switch (section.type) {
        case "outsourced": 
          outsourcedLinks.push(<Link href={"#"+section.alt} key={index}><li><a className={fontSize?.link}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link>)

          break
        default:
          defaultLinks.push(<Link href={"#"+section.alt} key={index}><li><a className={fontSize?.link}>{section.alt.charAt(0).toUpperCase() + section.alt.slice(1)}</a></li></Link>)

          break
      }
    }

    return (
      <div className="flex flex-row justify-around w-full">
        {defaultLinks.length ? <div>
          <h1 className={fontSize?.header}>Sections</h1>

          <div className="rounded-lg h-1 w-full round-lg bg-white mt-2"></div>

          {defaultLinks}
        </div> : ""}

        {outsourcedLinks.length ? <div>
          <h1 className={fontSize?.header}>Outsourced</h1>

          <div className="rounded-lg h-1 w-full round-lg bg-white mt-2"></div>

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
    }
  }

  return (
    <section className={styles.tailwind.main} id={alt}>
      <div className={styles.tailwind.background} style={styles.css.background}></div>

      {content.body ? 
        <div className={styles.tailwind.content}><content.body handleRenderLinks={handleRenderLinks} /></div>
         : 
        <h1>{alt}</h1>
      }
    </section>
  )
}

export default Section