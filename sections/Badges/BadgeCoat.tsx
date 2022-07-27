import { Dispatch, SetStateAction, useEffect, useState } from "react"

const BadgeCoat: React.FC<{
  isSectionPermitted: boolean,
  // gifFrames: Array<string>,
  setIfEnded: Dispatch<SetStateAction<boolean>>,
  width: number
}> = ({
  isSectionPermitted,
  // gifFrames,
  setIfEnded,
  width
}) => {
  const [coatPhase, setCoatPhase] = useState<string>("start")
  // const [coatProperties, setProperties] = useState<{length: number, sources: Array<string>}>({length: 0, sources: []})
  const [frames, incrementFrame] = useState(0)
  let runFrames: NodeJS.Timeout

  useEffect(() => { 
    if (isSectionPermitted) {
      if (coatPhase === "start") {
        // if (!coatProperties.length) {
        //   setProperties({
        //     length: gifFrames.length,
        //     sources: gifFrames
        //   })
        // }
        
        setCoatPhase("run")
      }

      let counter = 0
      runFrames = setInterval(() => {
        if (counter >= 46) {
          clearInterval(runFrames)
          
          setIfEnded(true)
          setCoatPhase("end")
        }
        
        counter++
        incrementFrame((oldCount) => oldCount + 1)
      }, 60)
      
      return () => clearInterval(runFrames)
    } else {
      clearInterval(runFrames)

      incrementFrame(0)
      
      setIfEnded(false)
      setCoatPhase("start")
    }
  }, [isSectionPermitted])

  const renderCoatPhase = () => {
    const styles = width > 930 ? {
      height: "150%",
      zIndex: "-10",
      top: "-25px",
      maxWidth: "1640px",
      minWidth: "1640px",
      filter: "grayscale(100%)",
      position: "absolute" as "absolute"
    } : {
      height: "150%",
      zIndex: "-10",
      top: "-25px",
      maxWidth: "1640px",
      minWidth: "1640px",
      filter: "grayscale(100%)",
      position: "absolute" as "absolute"
    }
    
    switch (coatPhase) {
      case "start":
        return (<img src="/images/badgeCoat/frame_000.gif" alt="coat" style={styles} />)
      case "run":
        return (<img src={`/images/badgeCoat/frame_0${frames.toString().length === 1 ? "0" + frames.toString() : frames.toString()}.gif`} alt="coat" style={styles} />)
      case "end":
        return (<img src="/images/badgeCoat/frame_047.gif" alt="coat" style={styles} />)
    }
  }

  return (<>{renderCoatPhase()}</>)
}

export default BadgeCoat
