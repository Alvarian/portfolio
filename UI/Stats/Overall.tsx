import { motion } from "framer-motion"
import { slider } from "./varients"

import React, { useEffect, useState } from "react"
import { dataOptions } from 'lib/sections/sections.types'
import Arrow from "components/arrow"


const Overall: React.FC<any> = ({ 
    payload, 
    setPage,
    setVisible
}) => {
    const {     
        leaderBoardScore,
        languagesTotal,
        totalCompleted
    } = payload

    const [ratioListValues, setList] = useState({})

    useEffect(() => {
        const languageRatios: Record<string, number> = {}
        let totalCounter: number = 0

        for (let language in languagesTotal) {
            totalCounter += languagesTotal[language]
        }

        for (let language in languagesTotal) {
            const ratio = (languagesTotal[language] / totalCounter) * 100

            languageRatios[language] = ratio
        }

        setList(languageRatios)
    }, [])

    const ratioStatsList = () => {
        const parsableRatioListValues: dataOptions = ratioListValues
        const list = []
        for (let key in ratioListValues) {
            list.push(
                <li key={key}>{key}: {Math.round(parsableRatioListValues[key] * 10) / 10}%</li>
            )
        }

        return list
    }
    
    return (
        // <AnimatePresence>
        //     <motion.div
        //         key="overall"
        //         variants={slider}
        //         initial="enter"
        //         animate="center"
        //         exit="exit"
        //         transition={{
        //             x: {
        //             type: "spring",
        //             stiffness: 800,
        //             damping: 100,
        //             duration: 0.1
        //             },
        //             opacity: { duration: 0.6 }
        //         }}
        //     >
        //         <p>Rank <span>{leaderBoardScore}</span></p>
        //         <p>Completed <span>{totalCompleted}</span></p>
        //         <h2>Overall</h2>
        //         <div>
        //             <ul id="ratioStats">{ratioStatsList()}</ul>

        //             <div id="ratioGraph"></div>
        //         </div>

        //         <Arrow 
        //             direction="right"
        //             size={50}
        //             content="Most Recent Challenge Completed"
        //             handler={setPage([item.id, 0])}
        //         />
        //     </motion.div>
        // </AnimatePresence>
        
        <motion.div
            id="overall"
            initial="enter"
            animate="center"
            exit="exit"
            variants={slider}
            custom={-1}
            transition={{
                x: {
                    type: "spring",
                    stiffness: 800,
                    damping: 100,
                    duration: 0.1
                },
                opacity: { duration: 0.6 }
            }}
        >
            <p>Rank <span>{leaderBoardScore}</span></p>
            <p>Completed <span>{totalCompleted}</span></p>
            <h2>Overall</h2>
            <div>
                <ul id="ratioStats">{ratioStatsList()}</ul>

                <div id="ratioGraph"></div>
            </div>

            <Arrow 
                direction="right"
                size={50}
                content="Most Recent Challenge Completed"
                handler={setVisible}
            />
        </motion.div>
    )
}

export default Overall