import React, { useEffect, useState } from "react"
import { dataOptions } from 'lib/sections/sections.types'


const Overall: React.FC<any> = ({ payload }) => {
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
        <div>
            <p>Rank <span>{leaderBoardScore}</span></p>
            <p>Completed <span>{totalCompleted}</span></p>
            <h2>Overall</h2>
            <div>
                <ul id="ratioStats">{ratioStatsList()}</ul>

                <div id="ratioGraph"></div>
            </div>
        </div>
    )
}

export default Overall