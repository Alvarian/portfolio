import { useEffect, useState } from "react"

const BadgeCoat: React.FC<any> = ({
    isSectionPermitted,
    gifFrames,
    setIfEnded
}) => {
    const [coatPhase, setCoatPhase] = useState("start")
    const [coatProperties, setProperties] = useState({length: 0, sources: []})
    const [frames, incrementFrame] = useState(0)
    let runFrames: any

    useEffect(() => { 
      if (isSectionPermitted) {
        if (coatPhase === "start") {
          if (!coatProperties.length) {
            setProperties({
              length: gifFrames.length,
              sources: gifFrames
            })
          }
          
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
        }, 30)
        
        return () => clearInterval(runFrames)
      } else {
        clearInterval(runFrames)
  
        incrementFrame(0)
        
        setIfEnded(false)
        setCoatPhase("start")
      }
    }, [isSectionPermitted])

    const renderCoatPhase = () => {
        const badgeStyle = {
          height: "150%",
          zIndex: "-10",
          top: "-25px",
          minWidth: "1640px",
          maxWidth: "1640px",
          filter: "grayscale(100%)",
          position: "absolute" as "absolute"
        }
    
        switch (coatPhase) {
          case "start":
            return (<img src={gifFrames[0]} alt="coat" style={badgeStyle} />)
          case "run":
            return (<img src={gifFrames[frames]} alt="coat" style={badgeStyle} />)
          case "end":
            return (<img src={gifFrames[gifFrames.length-1]} alt="coat" style={badgeStyle} />)
        }
    }

    return (<>{renderCoatPhase()}</>)
}

export default BadgeCoat
