import Image from "next/image"
import Link from "next/link"


const Footer: React.FC<any> = ({
  handleRenderLinks
}) => {
  const styles = {
    css: {
      background: {
        backgroundImage: "url(./images/library-min.jpg)",
        filter: `blur(3px)`
      }
    },
    tailwind: {
      main: `footer footer-center p-28 h-screen relative w-full`,
      background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      content: {
        main: `bg-black/50 h-4/5 w-4/5 flex justify-between flex-col items-center`,
        nav: `navbar h-4/5 w-4/5`,
        buttons: {
          main: `flex flex-col justify-center w-full items-center pb-8`,
          links: `hover:invert bg-white flex items-center justify-center h-20 w-20 m-3 rounded-full`
        }
      }
    }
  }

  return (
    <footer className={styles.tailwind.main}>
      <div className={styles.tailwind.background} style={styles.css.background}></div>

      <div className={styles.tailwind.content.main}>
        <div className={styles.tailwind.content.nav}>
          <div className="flex-1">
            <Link href="/"><a className="btn btn-ghost normal-case text-4xl">Ivan Alvarez</a></Link>
          </div>

          <div className="menu flex menu-vertical p-0">{handleRenderLinks()}</div>
        </div>

        <div className={styles.tailwind.content.buttons.main}>
          <div className="rounded-lg h-1 w-4/5 round-lg bg-white m-2"></div>

          <div className="flex flex-row">
            <a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={45} height={45} src="/icons/github.svg" /></a>
            <a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={30} height={30} src="/icons/linkedin.svg" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer