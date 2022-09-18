import Chart from "shared/chart";
import { AnimatePresence, motion } from "framer-motion"
import useModal from "hooks/useModal";
import { capitalizeFirst, getFormattedDate, getRandomColor } from "lib/sections/sections.methods"
import React from "react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

import Modal from "shared/modal";


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

const ProjectImage: FC<{
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

const ProjectCoverAndContent: FC<{
    projectData: {[key: string]: any},
    projectBody: any
}> = ({projectBody, projectData}) => {
    const [isCoverOpen, toggleCover] = useState(true)
  
console.log(projectData)
    // const VOptions = {
    //     title: {
    //     	display: true,
    //     	text: "Languages Used",
    //     	fontSize: "25"
    //     },
    //     legend: {
    //     	display: false
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           },
    //         },
    //       ],
    //     },
    //     maintainAspectRatio: false
    //   }
  
    // const chartData = (stacks: any) => {
      //   return {
    //     labels: stacks.map((g: any) => g.x),
    //     datasets: [
    //       {
    //         label: "Percentage",
    //         data: stacks.map((g: any) => Math.round((g.y/stacks.total)*10000)/100 ),
    //         backgroundColor: getRandomColor(stacks),
    //         borderColor: getRandomColor(stacks),
    //         borderWidth: 1,
    //       }
    //     ]
    //   }
      // }
    
    const VOptions = {
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: 'red',
              font: {
                size: 18,
              }
            }
          },
          x: {
            ticks: {
              color: 'red',
              font: {
                size: 18
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
          title: {
            display: true,
            padding: 15,
            color: '#FFFFFF',
            font: {
              size: 26
            },
            text: capitalizeFirst(projectData.title),
          },
        },
    }
    
    const chartData: any = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 31, 2, 3],
                backgroundColor: [
                    getRandomColor,
                    getRandomColor,
                    getRandomColor,
                    getRandomColor,
                    getRandomColor,
                    getRandomColor,
                ].map((c: any) => c([])),
                borderWidth: 1,
            }
        ],
    }

    return isCoverOpen ? (
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
            <Chart languagesTotal={projectData.stacks} bgStyle={""} />

            <button 
                className="btn btn-sm border-white border-2 text-xl"
                onClick={() => toggleCover(false)}
            >Continue</button>
        </motion.div>
    ) : (
        <div className="h-full w-full" ref={(node) => node?.appendChild(projectBody as HTMLElement)}></div>
    )
}

const index: FC<{
    data: Array<Project>
}> = ({ data }) => {
    const [productIds, setProductIds] = useState(data.filter((x: Project) => data.indexOf(x) !== 0))
    const [projectData, setProjectData] = useState(data[0])
    const [projectBody, setProjectBody] = useState<HTMLElement | null>(null)
    const [isGameSet, setGame] = useState(false)
    const { isModalOpen, close, open } = useModal()
    const body = document.querySelector("body") as HTMLBodyElement

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

    const handleProjectOpen = (title: string, stacks: {[key: string]: any} | null, payload: {type: string, ref: Array<any> | string}) => {        
        switch (payload.type) {
            case "Service": 
                // open modal
                const serviceModal = document.getElementById("service-modal") as HTMLInputElement
                serviceModal.checked = true

                break;
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

                    setProjectBody(window.games[capitalizeFirst(title)]())
                } else if (game) {
                    setProjectBody(game())
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
                            setProjectBody(window.games[capitalizeFirst(title)]())
                        })
                        .catch(err => {
                            console.log(err)
                            const script = payload.ref as string
                            eval(script)
                            
                            setProjectBody(window.games[capitalizeFirst(title)]())
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

                            {/* <button className="btn btn-accent btn-wide text-2xl" onClick={open}>OPEN PROJECT</button> */}
                            <button className="btn btn-accent btn-wide text-2xl" onClick={handleProjectOpen.bind(this, projectData.title, projectData.stacks, projectData.payload)}>OPEN PROJECT</button>
                            {/* <label htmlFor="my-modal-6" className="btn modal-button btn-accent btn-wide text-2xl" onClick={handleProjectOpen.bind(this, projectData.payload)}>Open Project</label> */}
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
                        <ProjectImage project={project} key={project.id} onExpand={setAsPrimary} />
                    ))}
                </AnimatePresence>
            </aside>

            <Modal 
                handleClose={() => {setProjectBody(null); body.style.overflow = "auto"}}
                hasProject={!!projectBody}
            ><ProjectCoverAndContent projectBody={projectBody} projectData={projectData} /></Modal>
        </div>
    )
}

export default index