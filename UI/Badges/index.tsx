import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cloudBadges, localBadges } from "./mock.data"
import styles from "./styles.module.css"


const index: React.FC<any> = ({
  isSectionPermitted
}) => {
  const [isBadgeHovered, toggleBadgeSize] = useState(false)
  const [coatPhase, setCoatPhase] = useState("start")
  const badgeRevealTime = 1.35


  useEffect(() => {

    if (coatPhase === "start") {
      setCoatPhase("run")
    }
  
    if (isSectionPermitted) {
      console.log("??", coatPhase)
  
  
  
      setTimeout(() => {setCoatPhase("end")}, badgeRevealTime*1000)
    } else {
      setCoatPhase("start")
  
    }

  })

  const handleHoverBadge = () => {
    toggleBadgeSize(!isBadgeHovered)
  }
  
  const {hexagon, image} = {
    hexagon: isBadgeHovered ? "300px" : "220px",
    image: isBadgeHovered ? "200px" : "150px"
  }

  const renderBadgeCoatImg = () => {
    console.log(coatPhase, isSectionPermitted)
    switch (coatPhase) {
      case "start":
        return (<img src="./images/coat-start.gif" alt="coat" id={styles['badgeCoat']} />)
      case "run":
        return (<img src="./images/coat-run.gif" alt="coat" id={styles['badgeCoat']} />)
      case "end":
        return (<img src="./images/coat-end.gif" alt="coat" id={styles['badgeCoat']} />)
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-end">
      {renderBadgeCoatImg()}

      <div id={styles['crawl-container']}>
        {isSectionPermitted && <motion.div id={styles['crawl']}
          initial={{
            x: "-100%",
            rotateY: 106,
          }}
          animate={{
            rotateY: 0,
            transition: {
              delay: 0.162,
              duration: badgeRevealTime,
              // type: "spring",
              // stiffness: 800,
              // damping: 100,
            }
          }}
        >
          <div id={styles['crawlGuard']}></div>
          
          <div>
            {cloudBadges.map((badge: any, index: number) => (
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
                    // boxShadow: "10px 5px 5px red"
                  }}
                >
                  <img src={badge.image} width={image} height={image} />
                </motion.a>
              </div>
            ))}
          </div>
        </motion.div>}
      </div>                
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index