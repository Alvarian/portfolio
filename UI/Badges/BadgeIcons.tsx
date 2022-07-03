import { motion } from "framer-motion"
import { Badge } from "lib/sections/sections.types"


const BadgeCoat: React.FC<{
  badges: Array<Badge>,
  reset: Badge,
  handleBadgeDetails: (details: Badge) => void
}> = ({
  badges,
  reset,
  handleBadgeDetails
}) => {
  const renderBadges: () => Array<Badge> = () => {
    const slots = new Array(15)
    const templateList: Array<Badge> = []
    for (let _ of slots) {
      templateList.push(reset)
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
    selectedSlots.forEach((slot: {
      slotPos: number,
      rotations: {
        horizontal: number,
        vertical: number,
      }
    }, index: number) => {
      if (!badges[index]) {
        templateList[slot.slotPos] = reset
      } else {
        badges[index].rotations = slot.rotations
        templateList[slot.slotPos] = badges[index]
      }
    })

    return templateList
  }    
  
  return (
    <div className="h-full w-96 grid grid-cols-3 grid-rows-5">
      {renderBadges().map((badge: Badge, index: number) => badge.name ? (
        <div key={index} className="relative flex justify-end items-center h-36 w-36">
          <motion.a 
            className="shadow shadow-lg border-8 rounded-full bg-black border-indigo-600 p-2"
            style={{borderStyle: "outset"}}
            href={badge.evidence[0].url}
            onMouseOver={handleBadgeDetails.bind(this, badge)}
            onMouseOut={handleBadgeDetails.bind(this, reset)}
            initial={{
              rotateX: badge.rotations.horizontal,
              rotateY: badge.rotations.vertical
            }}
            whileHover={{
              scale: 1.7,
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
  )
}

export default BadgeCoat 

function reset(reset: any) {
  throw new Error("Function not implemented.")
}
