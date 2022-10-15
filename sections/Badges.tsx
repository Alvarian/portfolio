import { motion } from "framer-motion"
import { formatDate } from "lib/sections/sections.methods"
import { Badge } from "lib/sections/sections.types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"


const BadgeCoat: React.FC<{
  isSectionPermitted: boolean,
  // gifFrames: Array<string>,
  setIfEnded: Dispatch<SetStateAction<boolean>>,
  width: number
}> = ({
  isSectionPermitted,
  // gifFrames,
  setIfEnded,
  width
}) => {
  const [coatPhase, setCoatPhase] = useState<string>("start")
  // const [coatProperties, setProperties] = useState<{length: number, sources: Array<string>}>({length: 0, sources: []})
  const [frames, incrementFrame] = useState(0)
  let runFrames: NodeJS.Timeout

  useEffect(() => { 
    if (isSectionPermitted) {
      if (coatPhase === "start") {
        // if (!coatProperties.length) {
        //   setProperties({
        //     length: gifFrames.length,
        //     sources: gifFrames
        //   })
        // }
        
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
      height: "150%",
      zIndex: "-10",
      top: "-25px",
      maxWidth: "1640px",
      minWidth: "1640px",
      filter: "grayscale(100%)",
      position: "absolute" as "absolute"
    } : {
      height: "150%",
      zIndex: "-10",
      top: "-25px",
      maxWidth: "1640px",
      minWidth: "1640px",
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
              target="_blank"
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

const index: React.FC<{
  isSectionPermitted: boolean,
  width: number,
  data: {
    // gifFrames: Array<string>,
    badges: Array<Badge>
  }
}> = ({
  isSectionPermitted,
  width,
  data
}) => {
  const { 
    // gifFrames, 
    badges 
  } = data
  const [isFrameEnded, setIfEnded] = useState(false)

  const { tailwind, css } = (() => { 
    if (width > 1500) {
      return {
        css: {
          iconIndicator: {
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
        },
        tailwind: {
          main: `h-full w-full flex items-center justify-end`,
          iconIndicator: `h-full flex justify-center items-center`,
          badgesMain: `h-full w-full absolute flex justify-end`
        }
      }
    } else if (width <= 760) {
      return {
        css: {
          iconIndicator: {
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
        },
        tailwind: {
          main: `h-full w-full flex items-center justify-end mr-[-680px]`,
          iconIndicator: `h-full flex justify-center items-center relative top-[240px]`,
          badgesMain: `h-full w-full absolute flex flex-col-reverse items-center right-[-440px] bottom-[110px]`
        }
      }
    } else {
      return {
        css: {
          iconIndicator: {
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
        },
        tailwind: {
          main: `h-full w-full flex items-center justify-end`,
          iconIndicator: `h-full flex justify-center items-center top-[-260px]`,
          badgesMain: `h-full w-full absolute flex justify-end`
        }
      }
    }
  })()

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
        // gifFrames={gifFrames}
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
        {width > 1500 && <div className="h-full flex justify-center items-center"
          style={css.iconIndicator}
        >
          <div>
            <h2 className="text-4xl">{badgeDetails.name}</h2>
            <p className="text-2xl">{badgeDetails.issuedOn}</p>
            <div className="flex justify-around">{renderTags()}</div>
          </div>
        </div>}

        <BadgeIcons
          badges={badges}
          handleBadgeDetails={handleBadgeDetails}
          reset={reset}
        />

        <div className={tailwind.iconIndicator}
          style={css.iconIndicator}
        >
          {width <= 1500 && width > 760 && <div>
            <h2 className="text-3xl">{badgeDetails.name}</h2>
            <p className="text-lg">{badgeDetails.issuedOn}</p>
            <div className="flex justify-around">{renderTags()}</div>
          </div>}

          {width <= 760 && <div>
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