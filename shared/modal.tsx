import { AnimatePresence, motion } from "framer-motion"
import { Project } from "lib/sections/sections.types"
import { FC, ReactNode, useEffect, useRef } from "react"
import { FaRegWindowMaximize } from "react-icons/fa"
import { VscChromeClose } from "react-icons/vsc"

import Chart from "shared/chart"


const Backdrop: FC<{
  children: ReactNode, 
  onClick: () => void
}> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop-blur top-0 left-0 absolute h-screen w-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
// co pilot, I am sorry for the mess I made. I will clean it up soon. I promise.
const Cover: FC<{
  stacks: Project['stacks'],
  isCoverOpen: boolean,
  toggleCover: (v: boolean) => void
}> = ({stacks, isCoverOpen, toggleCover}) => {
  return (
    <motion.div className='bg-black h-full w-full flex items-center justify-around flex-col'
      variants={{
          visible: {
              opacity: 1,
              transition: {
                  duration: 1
              },
          },
          hidden: {
              opacity: 0,
              display: "none"
          },
      }}
      initial="visible"
      animate={isCoverOpen ? "visible" : "hidden"}
    >
      <h1 className="text-2xl font-bold">Languages Makeup</h1>
      <Chart languagesTotal={stacks} bgStyle={"w-full"} />

      <button 
          className="btn btn-sm border-white border-2 text-xl"
          onClick={() => toggleCover(false)}
      >Continue</button>
    </motion.div>
  )
}

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 3,
        delay: 1.2,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
}

const index: FC<{ 
    isModalOpen: boolean,
    handleClose: () => void,
    setMaxed: (v: boolean) => void,
    projectData: Project,
    isCoverOpen: boolean, 
    toggleCover: (v: boolean) => void,
    isWidthMobile: boolean,
    children: ReactNode
}> = ({ handleClose, isModalOpen, setMaxed, projectData, isCoverOpen, toggleCover, isWidthMobile, children }) => {  
    const modalEl = useRef(null)

    useEffect(() => {
      if (modalEl.current) {
        const m = modalEl.current as HTMLDivElement

        m.addEventListener('fullscreenchange', () => !!document.fullscreenElement ? setMaxed(true) : setMaxed(false))

        return () => m.removeEventListener('resize', () => console.log("removed"))
      }
    })

    const makeProjectBoxFullScreen = () => {
      const projectBox = modalEl.current as unknown as HTMLDivElement
      if (projectBox.requestFullscreen) {
        projectBox.requestFullscreen()
      }
    }
    
    return (  
      <AnimatePresence>
        {isModalOpen ? (
          <Backdrop onClick={handleClose}>        
            <motion.div
              className={`flex flex-col items-center justify-around ${isWidthMobile ? "w-[620px] h-5/6 mt-16" : "h-[80%] min-h-[700px] min-w-[900px] w-3/4 mt-20"} bg-slate-900 rounded-xl`}
              onClick={(e) => e.stopPropagation()}  
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className='z-10 right-2 top-2 absolute w-32 flex justify-around m-1'>
                <label className="border-2 border-white btn btn-sm text-2xl" onClick={makeProjectBoxFullScreen}><FaRegWindowMaximize /></label>
            
                <label className="border-2 border-white btn btn-sm text-2xl" onClick={handleClose}><VscChromeClose /></label>
              </div>

              <div ref={modalEl} className="h-full w-full p-5 pt-14 inline-block" id="project-box">
                {isCoverOpen ? (
                  <Cover 
                    isCoverOpen={isCoverOpen}
                    toggleCover={toggleCover}
                    stacks={projectData.stacks}
                  />
                ) : (
                  <>{children}</>
                )}
              </div>
            </motion.div>
          </Backdrop>
        ) : null}
      </AnimatePresence>
    )
}

export default index