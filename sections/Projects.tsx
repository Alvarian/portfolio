import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "popmotion"

import { capitalizeFirst, getFormattedDate, getRandomColor } from "lib/sections/sections.methods"
import React, { FC, useEffect, useState } from "react"

import Modal from "shared/modal"
import Icon from "shared/icon"


interface Project {
    id: number,
    title: string,
    icon: string,
    description: string,
    stacks: Array<string>,
    repo: string,
    lastUpdate: string,
    payload: {type: string, ref: Array<any> | string}
}

declare global {
    interface Window { games: any; }
}

const ProjectIconImage: FC<{
    project: Project,
    onExpand: (project: Project) => void
}> = ({ project, onExpand }) => {
    return (
        <motion.img
            src={project.icon}
            alt=""
            onClick={() => onExpand(project)}
            className="m-[5px] w-[140px] h-[140px] bg-white rounded-xl border-8 cursor-pointer border-indigo-600"
            layoutId={`product-${project.id}`}
        />
    )
}

const ModalBody: FC<{
    title: string,
    type: string,
    content: any,
    isWidthMobile: boolean,
    isModalMaxed: boolean
}> = ({title, type, content, isWidthMobile, isModalMaxed}) => {
    const getScriptDOM = () => {    
        const [content, setContent] = useState<any>(null)
    
        useEffect(() => {
            const game = window.games[capitalizeFirst(title)]
            const localGame = localStorage.getItem(title+"_game")
            if (localGame && !game) {
                eval(localGame)
    
                setContent(<div className="h-full w-full" ref={(node: HTMLElement | null) => node?.appendChild(window.games[capitalizeFirst(title)]())}></div>)
            } else if (game) {
                setContent(<div className="h-full w-full" ref={(node: HTMLElement | null) => node?.appendChild(game())}></div>)
            } else {
                fetch(`/api/projects/getProject?keyName=${capitalizeFirst(title)}%2Fcore`)
                    .then((res: any) => {
                        if (res.ok) {
                            return res.json()
                        }
                        throw new Error(res.statusText)
                    })
                    .then((script: string) => {
                        eval(script)
    
                        localStorage.setItem(title+"_game", script)
                        setContent(<div className="h-full w-full" ref={(node: HTMLElement | null) => node?.appendChild(window.games[capitalizeFirst(title)]())}></div>)
                    })
                    .catch(err => {
                        console.log(err)
                        const script = content as string
                        eval(script)
                        
                        setContent(<div className="h-full w-full" ref={(node: HTMLElement | null) => node?.appendChild(window.games[capitalizeFirst(title)]())}></div>)
                    })
            }
        }, [])
    
        return content
    }

    const getServiceDOM = () => {
        const [[page, direction], setPage] = useState([0, 0])
        const [imageIndex, setIndex] = useState({
            left: content.length-1,
            center: 0,
            right: 1
        })
        const [pagColors, setColors] = useState(getRandomColor(content))

        useEffect(() => {
            const wrappedIndex = wrap(0, content.length, page)

            switch (wrappedIndex) {
                case 0: 
                    setIndex({
                        left: content.length-1,
                        center: 0,
                        right: 1
                    })
                    break
                case 1: 
                    setIndex({
                        left: 0,
                        center: 1,
                        right: 2
                    })
                    break
                case content.length-1:
                    setIndex({
                        left: wrappedIndex-1,
                        center: wrappedIndex,
                        right: 0
                    })
                    break
                default: 
                    if (wrappedIndex+2 > content.length-1) {
                        setIndex({
                            left: wrappedIndex-1,
                            center: wrappedIndex,
                            right: content.length-1
                        })
                    } else {
                        setIndex({
                            left: wrappedIndex-1,
                            center: wrappedIndex,
                            right: wrappedIndex+1
                        })
                    }
            }
        }, [page])

        const variants = {
            enter: (direction: number) => {
              return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
              };
            },
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1
            },
            exit: (direction: number) => {
              return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
              }
            }
        }
        
        const swipeConfidenceThreshold = 10000
        const swipePower = (offset: number, velocity: number) => {
            return Math.abs(offset) * velocity;
        }

        const paginate = (newDirection: number) => {
            setPage([page + newDirection, newDirection])
        }

        return (
            <>
                {isModalMaxed ? (<div className="flex flex-col items-center justify-around h-full w-full">
                    <div className="flex items-center justify-center relative h-3/4 w-full">
                        <motion.img 
                            key={`key_${imageIndex.left}`}
                            layoutId={`layout-${imageIndex.left}`}
                            transition={{ type: "spring", stiffness: 350, damping: 25, duration: 5 }}
                            className="h-[350px] w-[500px] cursor-pointer hover:border-4 border-white" src={content[imageIndex.left].image} 
                            onClick={e => {
                                if (imageIndex.left < page) {
                                    setPage([imageIndex.left, -1])
                                } else {
                                    setPage([imageIndex.left, +1])
                                }
                            }}
                        />

                        <main 
                            key={`key_${imageIndex.center}`}
                            className="relative scale-[2.2] h-[350px] max-w-[350px] min-w-[350px] z-10 flex justify-center items-center"
                        >
                            <motion.img 
                                key={`key_${imageIndex.center}`}
                                layoutId={`layout-${imageIndex.center}`}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { 
                                        type: "spring", 
                                        stiffness: 300, 
                                        damping: 30 
                                    },
                                    opacity: { duration: 0.2 }
                                }}
                                className="h-full" src={content[imageIndex.center].image} 
                            />

                            <motion.div
                                className="absolute backdrop-blur z-10 h-full w-full flex justify-center items-center text-sm"
                                initial={{
                                    opacity: 0,
                                    scale: 0.95
                                }}
                                whileHover={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.6 },
                                }}
                            >
                                <span>{content[imageIndex.center].description}</span>
                            </motion.div>
                        </main>

                        <motion.img 
                            key={`key_${imageIndex.right}`}
                            layoutId={`layout-${imageIndex.right}`}
                            transition={{ type: "spring", stiffness: 350, damping: 25, duration: 5 }}
                            className="h-[350px] w-[500px] cursor-pointer hover:border-4 border-white" src={content[imageIndex.right].image} 
                            onClick={e => {
                                if (imageIndex.right < page) {
                                    setPage([imageIndex.right, -1])
                                } else {
                                    setPage([imageIndex.right, +1])
                                }
                            }}
                        />
                    </div>

                    <div className="flex justify-around w-1/2 z-10">
                        {content.map((slide: any, index: number) => (
                            <motion.button
                                key={`pagkey_${index}`}
                                className="rounded-full h-5 w-5"
                                style={{
                                    backgroundColor: "#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6), 
                                    border: (index === page) ? "3px solid white" : "none",
                                    scale: (index === page) ? 2 : 1
                                }}
                                onClick={e => {
                                    if (index < page) {
                                        setPage([index, -1])
                                    } else {
                                        setPage([index, +1])
                                    }
                                }}
                            ></motion.button>
                        ))}
                    </div>
                </div>) : (<div className="h-full flex flex-col justify-around overflow-hidden">
                    <div className="relative h-3/4">
                        <AnimatePresence 
                            initial={false} 
                            custom={direction}
                        >
                            <motion.div
                                key={`slide_${imageIndex.center}`}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { 
                                        type: "spring", 
                                        stiffness: 300, 
                                        damping: 30 
                                    },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);
                        
                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className={`absolute flex ${isWidthMobile ? "flex-col-reverse" : ""} justify-around items-center w-full h-full`}
                            >
                                <div className={`${isWidthMobile ? "" : "h-full"}`}>{content[imageIndex.center].description}</div>
                                
                                <img className={`${isWidthMobile ? "h-[465px]" : "h-full"} min-w-[600px] max-w-[600px]`} src={content[imageIndex.center].image} />
                            </motion.div>                    
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-around w-full z-10 mb-5">
                        <Icon 
                            name="arrow"
                            position="left"
                            src="/icons/up-arrow-svgrepo-com.svg"
                            size={isWidthMobile ? "md" : "lg"}
                            content="-1"
                            kind={{
                                type: "button",
                                content: "",
                                callback: () => paginate(-1)
                            }}
                            custom={{
                                parent: "",
                                img: "-rotate-90",
                                content: "text-xl text-center bg-gradient-to-r from-yellow-300 h-10 p-3"
                            }}
                        />

                        <Icon 
                            name="arrow"
                            position="right"
                            src="/icons/up-arrow-svgrepo-com.svg"
                            size={isWidthMobile ? "md" : "lg"}
                            content="+1"
                            kind={{
                                type: "button",
                                content: "",
                                callback: () => paginate(1)
                            }}
                            custom={{
                                parent: "",
                                img: "rotate-90",
                                content: "text-xl text-center bg-gradient-to-l from-yellow-300 h-10 p-3"
                            }}
                        />
                    </div>
                </div>)}
            </>
        )
    }

    if (type === "Service") {
        return <>{getServiceDOM()}</>
    } else if (type === "Script") {
        return <>{getScriptDOM()}</>
    } else {
        return null
    }
}

const index: FC<{
    data: Array<Project>,
    width: number
}> = ({ data, width }) => {
    const [productIds, setProductIds] = useState(data.filter((x: Project) => data.indexOf(x) !== 0))
    const [projectData, setProjectData] = useState(data[0])
    const [isGameSet, setGame] = useState(false)
    const [isCoverOpen, toggleCover] = useState(true)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isModalMaxed, setMaxed] = useState(false)

    useEffect(() => {
        if (!isGameSet) {
            window.games = {}
            setGame(!isGameSet)
        }
    }, [])

    const setAsPrimary = (project: Project) =>  {
        const currentProductId = projectData
        const newProductIds = [
            ...productIds.filter((x: Project) => x.id !== project.id),
            currentProductId
        ]

        setProjectData(project)
        setProductIds(newProductIds)
    }

    const formatProjectTitle = (title: string) => {
        if (title.includes("-")) {
            const sentence = title.split("-").map((t: string) => capitalizeFirst(t)).join(" ")

            return sentence
        }

        return capitalizeFirst(title)
    }

    const handleModalClose = () => {
        const body = document.querySelector("body") as HTMLBodyElement
        
        setModalOpen(false) 
        toggleCover(true)
        body.style.overflow = "auto"
    }

    const handleModalOpen = (payload: any) => {
        if (payload.type === "Site") {
            window.open(payload.ref as string, '_blank')
        } else {
            const body = document.querySelector("body") as HTMLBodyElement
            body.style.overflow = "hidden"

            setModalOpen(true)
        }
    }

    return (
        <div className="m-auto flex flex-row items-center h-[620px]">
            <main className="h-[620px] min-w-[880px] relative mr-[40px]">
                <AnimatePresence>
                    <motion.div
                        layoutId={`product-${projectData.id}`}
                        key={projectData.id}
                        className="object-cover h-full w-full absolute top-0 left-0 flex justify-around items-center rounded-2xl bg-black/50 hover:bg-black p-8"
                    >
                        <div>
                            <h2 className="text-4xl">{formatProjectTitle(projectData.title)}</h2>

                            <img
                                className="h-[400px] m-5"
                                src={projectData.icon}
                                alt=""
                            />

                            <button className="btn btn-accent btn-wide text-2xl" onClick={() => handleModalOpen(projectData.payload)}>OPEN PROJECT</button>
                        </div>

                        <ul className="w-1/3 h-3/4 text-left flex flex-col justify-around items-center">
                            <li className="w-full text-xl">{projectData.description}</li>
                            <li className="w-full"><a className="btn btn-accent btn-xs" href={projectData.repo}>Repository Source</a></li>
                            <li className="w-full">Last push on {getFormattedDate(projectData.lastUpdate)}</li>
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </main>

            <aside className="flex flex-col flex-wrap h-[620px] w-[220px] overflow-auto mt-0">
                <AnimatePresence>
                    {productIds.map((project: Project) => (
                        <ProjectIconImage project={project} key={project.id} onExpand={setAsPrimary} />
                    ))}
                </AnimatePresence>
            </aside>

            <Modal 
                handleClose={handleModalClose}
                isModalOpen={isModalOpen}
                setMaxed={setMaxed}
                projectData={projectData}
                isCoverOpen={isCoverOpen}
                toggleCover={toggleCover}
                isWidthMobile={width < 900}
            >
                <ModalBody 
                    title={projectData.title}
                    type={projectData.payload.type}
                    content={projectData.payload.ref}
                    isWidthMobile={width < 900}
                    isModalMaxed={isModalMaxed}
                />
            </Modal>
        </div>
    )
}

export default index