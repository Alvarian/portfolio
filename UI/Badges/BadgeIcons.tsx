import { motion } from "framer-motion"

const BadgeCoat: React.FC<any> = ({
  badges,
  handleBadgeDetails
}) => {
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
  
  return (
    <div className="h-full w-96 grid grid-cols-3 grid-rows-5">
      {renderBadges().map((badge: any, index: number) => badge.name ? (
        <div key={index} className="relative flex justify-end items-center h-36 w-36">
          <motion.a 
            className="shadow shadow-lg border-8 rounded-full bg-black border-indigo-600 p-2"
            style={{borderStyle: "outset"}}
            href={badge.evidence[0].url}
            onMouseOver={handleBadgeDetails.bind(this, badge)}
            onMouseOut={handleBadgeDetails.bind(this, null)}
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