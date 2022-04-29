const Section: React.FC<any> = ({
  Content,
  bgImageName,
  alt,
}) => {
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
      content: `flex justify-center rounded-3xl h-2/3 w-2/3 items-center bg-amber-100`
    }
  }

  return (
    <section className={styles.tailwind.main} id={alt}>
      <div className={styles.tailwind.background} style={styles.css.background}></div>
      {Content ? 
        <div className={styles.tailwind.content}><Content /></div>
         : 
        <h1>{alt}</h1>
      }
    </section>
  )
}

export default Section