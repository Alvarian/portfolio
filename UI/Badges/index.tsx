import { motion } from "framer-motion"
import { formatDate } from "lib/sections/sections.methods"
import { Badge } from "lib/sections/sections.types"
import { useState, useEffect } from "react"
import BadgeCoat from "./BadgeCoat"
import BadgeIcons from "./BadgeIcons"


const index: React.FC<{
  isSectionPermitted: boolean,
  width: number,
  data: {
    gifFrames: Array<string>,
    badges: Array<Badge>
  }
}> = ({
  isSectionPermitted,
  width,
  data
}) => {
  const { gifFrames, badges } = data
  const [isFrameEnded, setIfEnded] = useState(false)
  const reset = {
    issuedOn: "",
    image: "",
    evidence: [{url: ""}],
    name: "",
    description: "",
    tags: [],
    rotations: {
      horizontal: 0,
      vertical: 0
    }
  }
  const [badgeDetails, setDetails] = useState<Badge>(reset)
  
  const handleBadgeDetails = (details: Badge) => {
    const {
      issuedOn,
      name,
      tags,
      image,
      evidence,
      description,
      rotations
    } = details

    setDetails({
      issuedOn: "Completed on "+formatDate(issuedOn).minimal,
      name,
      tags,
      image,
      evidence,
      description,
      rotations
    })
  }

  const badgeDetailsStyles = {
    width: "530px",
    color: "#fff",
    textShadow: `
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #0ff,
      0 0 80px #0ff,
      0 0 90px #0ff,
      0 0 100px #0ff,
      0 0 150px #0ff
    `
  }

  const renderTags = () => {
    return badgeDetails.tags.map((tag: string, index: number) => {
        return (
            <span key={index}>#{tag}</span>
        )
    })
  }

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
        <div className="h-full flex justify-center items-center"
          style={badgeDetailsStyles}
        >
          {width > 1500 && <div>
            <h2 className="text-4xl">{badgeDetails.name}</h2>
            <p className="text-2xl">{badgeDetails.issuedOn}</p>
            <div className="flex justify-around">{renderTags()}</div>
          </div>}
        </div>

        <BadgeIcons
          badges={badges}
          handleBadgeDetails={handleBadgeDetails}
          reset={reset}
        />

        <div className="h-full flex justify-center items-center"
          style={badgeDetailsStyles}
        >
          {width < 1500 && <div>
            <h2 className="text-4xl">{badgeDetails.name}</h2>
            <p className="text-2xl">{badgeDetails.issuedOn}</p>
            <div className="flex justify-around">{renderTags()}</div>
          </div>}
        </div>
      </motion.div>}               
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index