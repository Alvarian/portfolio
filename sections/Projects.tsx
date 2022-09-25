import Chart from "shared/chart"
import { AnimatePresence, motion } from "framer-motion"
import { capitalizeFirst, getFormattedDate, getRandomColor } from "lib/sections/sections.methods"
import React, { ReactElement, useRef } from "react";
import { FC, useEffect, useState } from "react"

import Modal from "shared/modal"
import { divide } from "lodash";


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

const ProjectScriptDOM: FC<{script: any}> = ({script}) => {
    const handleAppend = (node: HTMLElement | null) => {
        if (!node) return
        
        node.appendChild(script as HTMLElement)
    }
    
    return (
        <div className="h-full w-full" ref={handleAppend}></div>
    )
}

const ProjectServiceDOM: FC<{
    slides: Array<any>
}> = ({ slides }) => {
    return <>{slides.map((slide: any) => (
        <div className="w-full h-full">{slide.description}</div>
    ))}</>
}

const ModalBody: FC<{
    type: string,
    projectBody: JSX.Element | null,
    isModalMaxed: boolean
}> = ({type, projectBody, isModalMaxed}) => {
    if (type === "Service") {
        return (
            <div className="w-full h-full">
                {isModalMaxed ? (
                    <div className="h-full w-full">Abstracted Slideshow</div>
                ) : (
                    <div className="h-full w-full">Default Slideshow</div>
                )}
            </div>
        )
    } else if (type === "Script") {
        return projectBody
    } else {
        return null
    }
}

const index: FC<{
    data: Array<Project>
}> = ({ data }) => {
    const [productIds, setProductIds] = useState(data.filter((x: Project) => data.indexOf(x) !== 0))
    const [projectData, setProjectData] = useState(data[0])
    const [projectBody, setProjectBody] = useState<JSX.Element | null>(null)
    const [isGameSet, setGame] = useState(false)
    const [isCoverOpen, toggleCover] = useState(true)
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

    const handleClose = () => {
        const body = document.querySelector("body") as HTMLBodyElement
        
        setProjectBody(null) 
        toggleCover(true)
        body.style.overflow = "auto"
    }

    const handleProjectOpen = (title: string, payload: {type: string, ref: Array<any> | string}) => {        
        const body = document.querySelector("body") as HTMLBodyElement
        
        switch (payload.type) {
            case "Service": 
                // open modal
                body.style.overflow = "hidden"
                setProjectBody(<ProjectServiceDOM slides={payload.ref as any[]} />)

                break
            case "Site":   
                window.open(payload.ref as string, '_blank');
                
                break;
            case "Script": 
                // open modal
                body.style.overflow = "hidden"
                const game = window.games[capitalizeFirst(title)]

                const localGame = localStorage.getItem(title+"_game")
                if (localGame && !game) {
                    eval(localGame)

                    setProjectBody(<ProjectScriptDOM script={window.games[capitalizeFirst(title)]()} />)
                } else if (game) {
                    setProjectBody(<ProjectScriptDOM script={game()} />)
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
                            setProjectBody(<ProjectScriptDOM script={window.games[capitalizeFirst(title)]()} />)
                        })
                        .catch(err => {
                            console.log(err)
                            const script = payload.ref as string
                            eval(script)
                            
                            setProjectBody(<ProjectScriptDOM script={window.games[capitalizeFirst(title)]()} />)
                        })
                }
                break;
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

                            <button className="btn btn-accent btn-wide text-2xl" onClick={handleProjectOpen.bind(this, projectData.title, projectData.payload)}>OPEN PROJECT</button>
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
                handleClose={handleClose}
                hasProject={!!projectBody}
                setMaxed={setMaxed}
                projectData={projectData}
                isCoverOpen={isCoverOpen}
                toggleCover={toggleCover}
            >
                <ModalBody 
                    type={projectData.payload.type}
                    projectBody={projectBody}
                    isModalMaxed={isModalMaxed}
                />
            </Modal>
        </div>
    )
}

export default index