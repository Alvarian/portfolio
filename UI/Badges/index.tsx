import { motion } from "framer-motion"
import { useState, useEffect } from "react"


const index: React.FC<any> = ({
  isSectionPermitted,
  data
}) => {
  const { gifFrames, badges } = data
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
          
          setCoatPhase("end")
        }
        
        counter++
        incrementFrame((oldCount) => oldCount + 1)
      }, 30)
      
      return () => clearInterval(runFrames)
    } else {
      clearInterval(runFrames)

      incrementFrame(0)
      
      setCoatPhase("start")
    }
  }, [isSectionPermitted])

  const renderBadges = () => {
    const slots = new Array(15)
    const templateList: any[] = []
    for (let _ of slots) {
      templateList.push({})
    }

    const selectedSlots = [
      {
        slotPos: 6, 
        rotations: {
          horizontal: -15,
          vertical: -10
        }
      }, {
        slotPos: 7,
        rotations: {
          horizontal: 50,
          vertical: 30
        }
      }, {
        slotPos: 9,
        rotations: {
          horizontal: 30,
          vertical: 30
        }
      }, {
        slotPos: 10,
        rotations: {
          horizontal: 0,
          vertical: 0
        }
      }, {
        slotPos: 11,
        rotations: {
          horizontal: 40,
          vertical: 40
        }
      }, {
        slotPos: 12,
        rotations: {
          horizontal: -30,
          vertical: -30
        }
      }, {
        slotPos: 13,
        rotations: {
          horizontal: 5,
          vertical: 5
        }
      }, {
        slotPos: 14,
        rotations: {
          horizontal: -20,
          vertical: 40
        }
      }
    ]
    selectedSlots.forEach((slot: any, index: number) => {
      badges[index].rotations = slot.rotations
      templateList[slot.slotPos] = badges[index]
    })
    
    return templateList
  }

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

  return (
    <div className="h-full w-full flex items-center justify-end">
      {renderCoatPhase()}

      {isSectionPermitted && frames === gifFrames.length-1 && <motion.div 
        className="h-full w-full absolute flex justify-end"
        style={{
          width: "1640px"
        }}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            // type: "spring",
            // stiffness: 800,
            // damping: 100,
          }
        }}
      >
        <div className="h-full w-96 grid grid-cols-3 grid-rows-5">
          {renderBadges().map((badge: any, index: number) => badge.name ? (
            <div key={index} className="relative flex justify-end items-center h-36 w-36">
              <motion.a 
                className="shadow shadow-lg border-8 rounded-full bg-black border-indigo-600 p-2"
                style={{borderStyle: "outset"}}
                href={badge.evidence}
                initial={{
                  rotateX: badge.rotations.horizontal,
                  rotateY: badge.rotations.vertical
                }}
                whileHover={{
                  scale: 3,
                  rotateX: 0,
                  rotateY: 0,
                  zIndex: 10,
                  boxShadow: "5px 5px 15px black"
                }}
              >
                <img src={badge.image} width={130} height={130} />
              </motion.a>
            </div>
          ) : (
            <div key={index}></div>
          ))}
        </div>

        <div className="h-full grid"
          style={{
            width: "530px"
          }}
        ></div>
      </motion.div>}               
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index