import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from 'chart.js';
import { useMemo, useState } from 'react';
ChartJS.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';


interface LanguageValue {
    titles: Array<string>,
    colors: Array<string>,
    ratios: Array<number>
}

const Chart: React.FC<{
    languagesTotal: any,
    bgStyle: string
}> = ({ languagesTotal, bgStyle }) => {
    const reset = {
        titles: [],
        colors: [],
        ratios: []
    }

    const [languagesListValues, setValues] = useState<LanguageValue>(reset)
    
    useMemo(() => {
        const languageValues: LanguageValue = reset

        if (!Object.entries(languagesTotal).length) {
            languageValues.titles.push("N/A")
            languageValues.ratios.push(100)
            languageValues.colors.push("#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6))            
        } else {
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
        }

        setValues({...languageValues})
    }, [])
    
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
            <Doughnut 
                data={data} 
                options={{
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }} 
            />
        )
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
        <div className={bgStyle+' flex justify-around'}>
            <ul id="ratioStats">{ratioStatsList()}</ul>

            <div id="ratioGraph" className='h-[300px] w-[300px]'>{renderDonut()}</div>
        </div>
    )
}

export default Chart