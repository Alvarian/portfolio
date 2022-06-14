import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cloudBadges, localBadges } from "./mock.data"
import styles from "./styles.module.css"


const index: React.FC<any> = () => {
  const [isBadgeHovered, toggleBadgeSize] = useState(false)

  const handleHoverBadge = () => {
    toggleBadgeSize(!isBadgeHovered)
  }

  const {hexagon, image} = {
    hexagon: isBadgeHovered ? "300px" : "220px",
    image: isBadgeHovered ? "200px" : "150px"
  }

  return (
    <div className="h-full w-full flex items-center justify-end">
      <div id={styles['crawl-container']}>
        <motion.div id={styles['crawl']}
          initial={{
            x: "-100%",
            rotateY: 106,
          }}
          whileInView={{
            rotateY: 0,
            transition: {
              delay: 1,
              duration: 2,
              // type: "spring",
              // stiffness: 800,
              // damping: 100,
            }
          }}
        >
          <div id={styles['crawlGuard']}></div>
          
          <div>
            {cloudBadges.map((badge: any, index: number) => (
              <div key={index} className="relative flex justify-center items-center" 
                style={{height: `${hexagon}`, width: `${hexagon}`}}
                
              >
                {/* <img src="./icons/badge.png" height="100%" width="100%" className="absolute -z-10 top-0 left-0" /> */}

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
        </motion.div>
      </div>                
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index