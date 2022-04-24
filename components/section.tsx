const Section: React.FC<any> = ({
  content,
  bgImageName,
  title,
}) => {
  const image = {
    backgroundImage: "url(./images/" + bgImageName + ")",
  }

  return (
    <section className="flex h-screen w-full items-center justify-center border-t bg-no-repeat bg-cover bg-center bg-fixed relative" style={image}>
      <h1>{title}</h1>
      <div>{content}</div>
    </section>
  )
}

export default Section