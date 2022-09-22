import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import { FaRegWindowMaximize } from "react-icons/fa"
import { VscChromeClose } from "react-icons/vsc"

const Backdrop: FC<{
  children: any, 
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

const Modal: FC<{ 
    hasProject: any,
    handleClose: () => void
}> = ({ handleClose, hasProject, children }) => {  
    const makeProjectBoxFullScreen = (e: any) => {
      const projectBox = document.querySelector('#project-box') as HTMLDivElement
      if (projectBox.requestFullscreen) {
        projectBox.requestFullscreen();
      } 
      // else if (projectBox.webkitRequestFullscreen) { /* Safari */
      //   projectBox.webkitRequestFullscreen();
      // } else if (projectBox.msRequestFullscreen) { /* IE11 */
      //   projectBox.msRequestFullscreen();
      // }
    }
  
    return (  
      <AnimatePresence>
        {hasProject ? (
      
        <Backdrop onClick={handleClose}>        
          <motion.div
            className="p-3 pt-10 flex flex-col items-center justify-around h-[620px] w-[800px] bg-slate-900 rounded-xl"
            onClick={(e) => e.stopPropagation()}  
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className='z-10 absolute right-2 top-2 absolute w-32 flex justify-around m-1'>
              <label className="border-2 border-white btn btn-sm text-2xl" onClick={makeProjectBoxFullScreen.bind(this)}><FaRegWindowMaximize /></label>
          
              <label className="border-2 border-white btn btn-sm text-2xl" onClick={handleClose}><VscChromeClose /></label>
            </div>

            <div className="h-full w-full" id="project-box">{children}</div>
          </motion.div>
        </Backdrop>
        ) : null}
      </AnimatePresence>
    )
}

export default Modal