import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"
import {Chart, ArcElement, Tooltip} from 'chart.js'
Chart.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';

import { slider } from "./varients"
import { dataOptions } from 'lib/sections/sections.types'
import { overallMenuData } from "./icons.data"
import Icon from "components/icon"


const Overall: React.FC<any> = ({ 
    payload, 
    isSectionPermitted
}) => {
    const {     
        leaderBoardScore,
        languagesTotal,
        totalCompleted
    } = payload

    const [languagesListValues, setValues] = useState<any>({
        titles: [],
        colors: [],
        ratios: []
    })
    
    useEffect(() => {
        const languageValues: Record<string, any> = {
            titles: [],
            colors: [],
            ratios: []
        }

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

        setValues(languageValues)
    }, [])

    const ratioStatsList = () => {
        const list = []
        for (let i = 0; i < languagesListValues.titles.length; i++) {
            const title = languagesListValues.titles[i]
            const ratio = languagesListValues.ratios[i]
            const color = languagesListValues.colors[i]

            list.push(
                <li className="text-left text-2xl m-1" key={title}>
                    <span className="w-6" style={{backgroundColor: color}}>[&#8594;]</span> {title}: {Math.round(ratio * 10) / 10}%
                </li>
            )
        }

        return list
    }

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

    return (
        <div className="flex flex-col h-full min-h-[624px]">
            {isSectionPermitted && <motion.div
                id="overall"
                className="bg-gradient-to-r rounded-lg from-black h-full flex flex-col justify-center pt-10"
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
                <h2 className="p-10 text-left text-3xl font-bold">Overall Stats (codewars)</h2>

                <div className="flex justify-around items-center">
                    {overallMenuData({
                        Rank: roundThousandsOrGetDefault(leaderBoardScore),
                        Completed: <CountUp duration={4} end={totalCompleted} /> 
                    }).map((item: any) => (
                        <div className="flex items-center justify-center" key={item.name}>
                            <span className="text-2xl">{item.name}: </span>

                            <Icon 
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

                <div className="bg-gradient-to-r from-amber-200 flex justify-around py-10">
                    <ul id="ratioStats">{ratioStatsList()}</ul>

                    <div id="ratioGraph" className="min-h-[300px] min-w-[300px]">{isSectionPermitted && renderDonut()}</div>
                </div>
            </motion.div>}
        </div>
    ) 
}

export default Overall