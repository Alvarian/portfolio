import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from 'chart.js';
import { Project } from 'lib/sections/sections.types';
import { useMemo, useState } from 'react';
ChartJS.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';


interface LanguageValue {
    titles: Array<string>,
    colors: Array<string>,
    ratios: Array<number>
}

const Chart: React.FC<{
    languagesTotal: Project["stacks"],
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
            
            for (let language of languagesTotal) {
                totalCounter += language.value
            }

            for (let language of languagesTotal) {
                const ratio = (language.value / totalCounter) * 100

                languageValues.titles.push(language.name)
                languageValues.ratios.push(ratio)
                languageValues.colors.push("#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6))
            }
        }

        setValues({...languageValues})
    }, [languagesTotal])
    
    return (
        <div className={bgStyle+' flex justify-around'}>
            <RatioStatsList languagesListValues={languagesListValues} />

            <RenderedDonut languagesListValues={languagesListValues} />
        </div>
    )
}

export default Chart


function RenderedDonut({languagesListValues}: {languagesListValues: LanguageValue}) {
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
        <div id="ratioGraph" className='h-[300px] w-[300px]'>
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
        </div>
    )
}

function RatioStatsList({languagesListValues}: {languagesListValues: LanguageValue}) {
    const list = []

    for (let i = 0; i < languagesListValues.titles.length; i++) {
        const title = languagesListValues.titles[i]
        const ratio = languagesListValues.ratios[i]
        const color = languagesListValues.colors[i]

        list.push(
            <li className="text-left m-1" key={`${title}${i}`}>
                <span className="w-6" style={{backgroundColor: color}}>[&#8594;]</span> {title}: {Math.round(ratio * 10) / 10}%
            </li>
        )
    }
    
    return <ul id="ratioStats">{list}</ul>
}