import Image from "next/image"

import KeyIcon from "components/keyicon"
import Underline from "components/underline"


const Header: React.FC<any> = ({
  handleRenderLinks,
  icon
}) => {
  const styles = {
    tailwind: {
      main: `m-auto relative h-full relative w-full`,
      background: `bg-black bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      content: {
        main: `absolute top-0 left-0 h-full w-full flex items-center justify-around`,
        profile: `w-128 h-5/6 flex flex-col justify-around items-center pt-10`,
        buttons: {
          main: `z-10 flex flex-col justify-center w-full items-center pb-8`,
          links: `hover:invert bg-white flex items-center justify-center h-20 w-20 m-3 rounded-full`
        }
      }
    }
  }

  return (
    <header className={styles.tailwind.main}>
      <div className="h-inherit w-inherit">
        <div className="bg-black w-full h-64"></div>
        <div className="bg-gradient-to-b w-full from-black h-full"></div>

        <div className={styles.tailwind.content.main}>
          <div className={styles.tailwind.content.profile}>
            <div className="w-80 h-80 bg-black rounded-full relative flex justify-center items-center">
              {/* MIGHT USE THIS TO REPRESENT SECTION ANIMATION TRIGGER */}
              <KeyIcon icon={icon} />
            </div>

            <h1 className="z-10 normal-case text-4xl pb-10">Ivan Alvarez</h1>
            <p className="z-10 normal-case text-xl">Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p>

            <div className={styles.tailwind.content.buttons.main}>
              {/* <div className="rounded-lg h-1 w-11/12 round-lg bg-white m-2"></div> */}
              <Underline />

              <div className="flex flex-row">
                <a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={45} height={45} src="/icons/github.svg" /></a>
                <a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.content.buttons.links} target="_blank"><Image width={30} height={30} src="/icons/linkedin.svg" /></a>
              </div>
            </div>
          </div>

          <div className="menu menu-vertical p-0 w-1/3">{handleRenderLinks("header")}</div>
        </div>
      </div>
    </header>
  )
}

export default Header