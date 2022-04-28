import Image from "next/image"


const Footer: React.FC<any> = () => {
  const styles = {
    css: {
      background: {
        backgroundImage: "url(./images/library-min.jpg)",
        filter: `blur(2px)`
      }
    },
    tailwind: {
      main: `footer footer-center p-24 relative w-full`,
      background: `bg-no-repeat bg-cover bg-center bg-fixed h-full w-full -z-10 absolute`,
      buttons: `hover:invert bg-white flex items-center justify-center h-40 w-40 rounded-full`
    }
  }

  return (
    <footer className={styles.tailwind.main}>
      <div className={styles.tailwind.background} style={styles.css.background}></div>

      <div className="flex justify-around w-full">
        <a rel="noopener noreferrer" href="https://github.com/Alvarian/" className={styles.tailwind.buttons} target="_blank"><Image width={90} height={90} src="/icons/github.svg" /></a>
        <a rel="noopener noreferrer" href="https://www.linkedin.com/in/alvarezivan88/" className={styles.tailwind.buttons} target="_blank"><Image width={76} height={76} src="/icons/linkedin.svg" /></a>
      </div>
    </footer>
  )
}

export default Footer