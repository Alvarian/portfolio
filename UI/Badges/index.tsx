import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import BadgeCoat from "./BadgeCoat"
import BadgeIcons from "./BadgeIcons"


const index: React.FC<any> = ({
  isSectionPermitted,
  width,
  data
}) => {
  const { gifFrames, badges } = data
  const [isFrameEnded, setIfEnded] = useState(false)
console.log(width)
  return (
    <div className="h-full w-full flex items-center justify-end">
      <BadgeCoat
        isSectionPermitted={isSectionPermitted}
        gifFrames={gifFrames}
        setIfEnded={setIfEnded}
      />

      {isSectionPermitted && isFrameEnded && <motion.div 
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
        <div className="h-full grid"
          style={{
            width: "530px"
          }}
        >
          {width > 1500 ? <div>
            hey
          </div> : null}
        </div>

        <BadgeIcons
          badges={badges}
        />

        <div className="h-full grid"
          style={{
            width: "530px"
          }}
        >
          {width < 1640 ? <div>
            man
          </div> : null}
        </div>
      </motion.div>}               
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index