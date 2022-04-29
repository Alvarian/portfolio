const Intro: React.FC<any> = () => {
  const styles = {
    css: {
      main: {
        width: "inherit",
      }
    },
    tailwind: {
      main: `m-auto`
    }
  }

  return (
    <div className={styles.tailwind.main} style={styles.css.main}>Description</div>
  )
}

export default Intro