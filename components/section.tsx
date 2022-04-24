const Section: React.FC<any> = ({
  children,
  bgImageName
}) => {
  const image = {
    backgroundImage: "url(./images/" + bgImageName + ")",
  }

  return (
    <section className="flex h-96 w-full items-center justify-center border-t bg-no-repeat bg-cover bg-center bg-fixed relative" style={image}>{children}</section>
  )
}

export default Section