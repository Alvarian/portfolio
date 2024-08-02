import { motion } from "framer-motion"
import { formatDate } from "lib/sections/sections.methods"
import { Badge } from "lib/sections/sections.types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"


const BadgeCoat: React.FC<{
  isSectionPermitted: boolean,
  setIfEnded: Dispatch<SetStateAction<boolean>>,
  width: number
}> = ({
  isSectionPermitted,
  setIfEnded,
  width
}) => {
  const [coatPhase, setCoatPhase] = useState<string>("start")
  const [frames, incrementFrame] = useState(0)
  let runFrames: NodeJS.Timeout

  useEffect(() => { 
    if (isSectionPermitted) {
      if (coatPhase === "start") {
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
      height: "125%",
      zIndex: "-10",
      top: "-7px",
      maxWidth: "1400px",
      minWidth: "1400px",
      filter: "grayscale(100%)",
      position: "absolute" as "absolute"
    } : {
      height: "110%",
      zIndex: "-10",
      top: "-25px",
      maxWidth: "1000px",
      minWidth: "1000px",
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

const BadgeIcons: React.FC<{
    badges: Array<Badge>,
    reset: Badge,
    width: number,
    handleBadgeDetails: (details: Badge) => void
}> = ({
    badges,
    reset,
    width,
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

    const styles = (width > 930) ? {
      badgesMain: `top-[8%] left-[53%] h-full w-[450px] grid grid-cols-3 grid-rows-5 absolute`,
      badge: `relative flex justify-end items-center h-30 w-30`
    } : {
      badgesMain: `top-0 left-[67%] h-full w-[330px] grid grid-cols-3 grid-rows-5 absolute`,
      badge: `relative flex justify-end items-center h-24 w-24`
    }
    
    return (
      <div className={styles.badgesMain}>
        {renderBadges().map((badge: Badge, index: number) => badge.name ? (
          <div key={index} className={styles.badge}>
            <motion.a 
              target="_blank"
              className="shadow-lg border-8 rounded-full bg-black border-indigo-600 p-2"
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

const index: React.FC<{
  isSectionPermitted: boolean,
  width: number,
  data: {
    badges: Array<Badge>
  }
}> = ({
  isSectionPermitted,
  width,
  data
}) => {
  const { 
    badges 
  } = data
  const [isFrameEnded, setIfEnded] = useState(false)

  const { tailwind, css } = (width > 900) ? {
    css: {
      iconIndicator: {
        width: "400px",
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
    },
    tailwind: {
      main: `h-full w-full flex items-center justify-end`,
      iconIndicator: `h-full flex justify-center items-center absolute right-[1%]`,
      badgesMain: `h-full w-full absolute flex justify-end`,
      badgeDetails: {
        title: `text-3xl`,
        issuedOn: `text-xl`,
        tags: `text-md`
      }
    }
  } : {
    css: {
      iconIndicator: {
        width: "200px",
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
    },
    tailwind: {
      main: `h-full w-full flex items-center justify-end`,
      iconIndicator: `h-full flex justify-center items-center absolute right-[3%]`,
      badgesMain: `h-full w-full absolute flex justify-end`,
      badgeDetails: {
        title: `text-xl`,
        issuedOn: `text-lg`,
        tags: `text-md`
      }
    }
  }

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
      issuedOn: details.name ? "Completed on "+formatDate(issuedOn).minimal : "",
      name,
      tags,
      image,
      evidence,
      description,
      rotations
    })
  }

  const renderTags = () => {
    return badgeDetails.tags.map((tag: string, index: number) => {
        return (
            <span key={index}>#{tag}</span>
        )
    })
  }

  return (
    <div className={tailwind.main}>
      <BadgeCoat
        isSectionPermitted={isSectionPermitted}
        setIfEnded={setIfEnded}
        width={width}
      />

      {isSectionPermitted && isFrameEnded && <motion.div 
        className={tailwind.badgesMain}
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
        <BadgeIcons
          badges={badges}
          width={width}
          handleBadgeDetails={handleBadgeDetails}
          reset={reset}
        />

        <div className={tailwind.iconIndicator}
          style={css.iconIndicator}
        >
          <div>
            <h2 className={tailwind.badgeDetails.title}>{badgeDetails.name}</h2>
            <div className={tailwind.badgeDetails.issuedOn}>{badgeDetails.issuedOn}</div>
            <div className={tailwind.badgeDetails.tags}>{renderTags()}</div>
          </div>
        </div>
      </motion.div>}               
    </div>  
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index