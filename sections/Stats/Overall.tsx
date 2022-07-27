import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"
import {Chart, ArcElement, Tooltip} from 'chart.js'
Chart.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';

import { slider } from "./varients"
import { OverallPayload } from 'lib/sections/sections.types'
import { overallMenuData } from "./icons.data"
import Icon, { IconInter } from "shared/icon"


interface LanguageValue {
    titles: Array<string>,
    colors: Array<string>,
    ratios: Array<number>
}

const Overall: React.FC<{
    payload: OverallPayload,
    isSectionPermitted: boolean,
    width: number
}> = ({ 
    payload, 
    isSectionPermitted,
    width
}) => {
    const {     
        leaderBoardScore,
        languagesTotal,
        totalCompleted
    } = payload
    const reset = {
        titles: [],
        colors: [],
        ratios: []
    }

    const [languagesListValues, setValues] = useState<LanguageValue>(reset)
    
    useEffect(() => {
        const languageValues: LanguageValue = reset

        let totalCounter: number = 0

        for (let language in languagesTotal) {
            totalCounter += languagesTotal[language]
        }

        for (let language in languagesTotal) {
            const ratio = (languagesTotal[language] / totalCounter) * 100

            languageValues.titles.push(language)
            languageValues.ratios.push(ratio)
            languageValues.colors.push("#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6))
        }

        setValues({...languageValues})
    }, [])

    const roundThousandsOrGetDefault = (num: number) => {
        return Math.abs(num) > 999 ? (Math.sign(num)*Math.abs(num)/1000).toFixed(1) + 'k' : Math.sign(num)*Math.abs(num)
    }

    const renderDonut = () => {
        const data = {
            labels: languagesListValues.titles,
            datasets: [
                {
                    label: "Percentage",
                    data: languagesListValues.ratios,
                    backgroundColor: languagesListValues.colors,
                    borderColor: languagesListValues.colors,
                    borderWidth: 2,
                }
            ],
        }
        
        return (
            <Doughnut data={data} />
        )
    }

    const { css, tailwind } = width > 900 ? {
        css: {},
        tailwind: {
            main: `flex flex-col h-full min-h-[624px] min-w-[600px]`,
            container: `bg-gradient-to-r rounded-lg from-black h-full flex flex-col justify-center pt-10`,
            header: `p-10 text-left text-4xl font-bold`,
            rankings: `flex justify-around items-center`,
            rankIcons: `flex items-center justify-center text-3xl`,
            donutContainer: `bg-gradient-to-r from-amber-200 flex justify-around py-10 text-2xl`,
            donut: `h-[300px] w-[300px]`
        }
    } : {
        css: {},
        tailwind: {
            main: `flex flex-col h-full min-h-[624px] min-w-[600px]`,
            container: `bg-gradient-to-r rounded-lg from-black h-full flex flex-col justify-center pt-10`,
            header: `p-10 text-left text-3xl font-bold`,
            rankings: `flex justify-around items-center`,
            rankIcons: `flex items-center justify-center text-lg`,
            donutContainer: `bg-gradient-to-r from-amber-200 flex justify-around py-5 text-md`,
            donut: `h-[200px] w-[200px]`
        }
    }
    
    const ratioStatsList = () => {
        const list = []
        for (let i = 0; i < languagesListValues.titles.length; i++) {
            const title = languagesListValues.titles[i]
            const ratio = languagesListValues.ratios[i]
            const color = languagesListValues.colors[i]

            list.push(
                <li className="text-left m-1" key={title}>
                    <span className="w-6" style={{backgroundColor: color}}>[&#8594;]</span> {title}: {Math.round(ratio * 10) / 10}%
                </li>
            )
        }
        
        return list
    }

    return (
        <div className={tailwind.main}>
            {isSectionPermitted && <motion.div
                id="overall"
                className={tailwind.container}
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
                    opacity: { duration: 0.4 }
                }}
            >
                <h2 className={tailwind.header}>Overall Stats (codewars)</h2>

                <div className={tailwind.rankings}>
                    {overallMenuData({
                        Rank: roundThousandsOrGetDefault(leaderBoardScore),
                        Completed: <CountUp duration={4} end={totalCompleted} /> 
                    }).map((item: IconInter) => (
                        <div className={tailwind.rankIcons} key={item.name}>
                            <span>{item.name}: </span>

                            <Icon 
                                name={item.name}
                                size={item.size}
                                kind={item.kind}
                                src={item.src}
                                position={item.position}
                                content={item.content}
                                custom={item.custom}
                            />
                        </div>
                    ))}
                </div>

                <div className={tailwind.donutContainer}>
                    <ul id="ratioStats">{ratioStatsList()}</ul>

                    <div id="ratioGraph" className={tailwind.donut}>{renderDonut()}</div>
                </div>
            </motion.div>}
        </div>
    ) 
}

export default Overall