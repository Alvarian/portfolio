import { motion } from "framer-motion"

import { useState, useEffect } from "react"
import { cloudBadges, localBadges } from "./mock.data"
import styles from "./styles.module.css"


const index: React.FC<any> = ({
  isSectionPermitted,
  data
}) => {
  const [isBadgeHovered, toggleBadgeSize] = useState(false)
  const { gifFrames } = data
  const [coatPhase, setCoatPhase] = useState("start")
  const [coatProperties, setProperties] = useState({length: 0, sources: []})
  const [frames, incrementFrame] = useState(0)
  const [finalAngle, decrementAngle] = useState(120)
  const badgeRevealTime = 1.5
  let runFrames: any
  
  useEffect(() => { 
    console.log("phase", coatPhase, isSectionPermitted)

    if (isSectionPermitted) {
      if (coatPhase === "start") {
        if (!coatProperties.length) {
          console.log("coat set")
          setProperties({
            length: gifFrames.length,
            sources: gifFrames
          })
        }
        console.log("coat running")

        setCoatPhase("run")
      }

      let counter = 0
      runFrames = setInterval(() => {
        if (counter >= 46) {
          clearInterval(runFrames)
          
          setCoatPhase("end")
        }
        
        counter++
        decrementAngle((oldAngle) => oldAngle - (120 / 46))
        incrementFrame((oldCount) => oldCount + 1)
      }, 30)
      
      return () => clearInterval(runFrames)
    } else {
      console.log("out of focus")
      clearInterval(runFrames)
      decrementAngle(120)
      incrementFrame(0)
      setCoatPhase("start")
    }
  }, [isSectionPermitted])

  const handleHoverBadge = () => {
    toggleBadgeSize(!isBadgeHovered)
  }
  
  const {hexagon, image} = {
    hexagon: isBadgeHovered ? "300px" : "150px",
    image: isBadgeHovered ? "200px" : "130px"
  }

  return (
    <div className="h-full w-full flex items-center justify-end">
      <img src={gifFrames[frames]} alt="coat" id={styles['badgeCoat']} />

      <div id={styles['crawl-container']}>
        <div id={styles['crawl']}
          style={{
            transform: `translateX(-100%) rotateY(${finalAngle}deg)`
          }}
          // initial={{
          //   x: "-100%",
          //   rotateY: 120,
          // }}
          // animate={{
          //   rotateY: 0,
          //   transition: {
          //     delay: 0.26,
          //     duration: badgeRevealTime-0.2,
          //     type: "spring",
          //     stiffness: 800,
          //     damping: 100,
          //   }
          // }}
        >
          
          <div className="h-full w-full grid grid-cols-3 grid-rows-5">
            {cloudBadges.map((badge: any, index: number) => badge.name ? (
              <div key={index} className="relative flex justify-end items-center" 
                style={{height: `${hexagon}`, width: `${hexagon}`}}
              >
                <motion.a 
                  className="shadow shadow-lg border-8 rounded-full bg-black border-indigo-600 p-2"
                  id={styles['icons']} 
                  // style={{transform: `rotateX(${badge.rotations.horizontal}deg) rotateY(${badge.rotations.vertical}deg)`}}
                  href={badge.evidence}
                  initial={{
                    rotateX: badge.rotations.horizontal,
                    rotateY: badge.rotations.vertical
                  }}
                  whileHover={{
                    scale: 1.5,
                    rotateX: 0,
                    rotateY: 0,
                    zIndex: 10
                    // boxShadow: "10px 5px 5px red"
                  }}
                >
                  <img src={badge.image} width={image} height={image} />
                </motion.a>
              </div>
            ) : (
              <div key={index}></div>
            ))}
          </div>

          <div id={styles['crawlGuard']}></div>

        </div>
      </div>                
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index