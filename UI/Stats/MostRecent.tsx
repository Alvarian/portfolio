import Icon from "components/icon"
import dedent from "dedent-js"
import { motion } from "framer-motion"
import { useState } from "react"
import { overallMenuData } from "./icons.data"
import mostRecentSnippets from "./mostRecentSnippets"
import { slider } from "./varients"


const MostRecent: React.FC<any> = ({ 
    payload, 
}) => {
    const {
        title,
        attemptedTotal,
        completedTotal,
        url,
        tags,
        completionDate,
        languagesUsed
    } = payload

    const [currentSnippet, setSnippet] = useState(languagesUsed[0])

    const renderTags = () => {
        return tags.map((tag: string, index: number) => {
            return (
                <div key={index}>#{tag}</div>
            )
        })
    }

    const renderSnippets = () => {
        console.log(mostRecentSnippets.title, title)
        if (mostRecentSnippets.title !== title) return "<!-- Update snippets for "+title+" -->"

        const languageTabs = []
        const languageSnippets = []
        for (let i = 0; i < languagesUsed.length; i++) {
            const snippet = mostRecentSnippets.languages[i]
            const language = languagesUsed[i]

            const styles = {
                button: `tab tab-lifted ${currentSnippet === snippet.language ? "tab-active bg-slate-700" : "bg-slate-200"}`,
                snippet: `${currentSnippet === snippet.language ? "flex" : "hidden"} h-5/6 font-sans font-bold w-full bg-slate-800 text-lime-600 p-5 whitespace-pre-wrap text-left text-lg overflow-scroll`
            }

            languageTabs.push(<button className={styles.button} onClick={() => setSnippet(language)}>{language.toLocaleUpperCase()}</button>)
            languageSnippets.push(<div className={styles.snippet}>{snippet.solution}</div>)
        }

        return (
            <div className="flex-col justify-start items-start w-full">
                <span className="tabs">{languageTabs}</span>

                {languageSnippets}
            </div>
        )
    }

    const getFormattedDate = (blob: string) => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date(blob)
        let monthName = month[d.getMonth()]
        let day = d.getDay()
        let year = d.getFullYear()

        return `${monthName} ${day}, ${year}`
    }

    return (
        <div className="flex flex-col h-full">
            <motion.div
                id="recent"
                className="bg-gradient-to-l rounded-lg from-black flex flex-col justify-around pt-10"
                initial="enter"
                animate="center"
                exit="exit"
                variants={slider}
                custom={1}
                transition={{
                    x: {
                        type: "spring",
                        stiffness: 800,
                        damping: 100,
                        duration: 0.4
                    },
                    opacity: { duration: 0.6 }
                }}
            >
                <h2 className="p-10 text-right text-3xl font-bold">Most Recent Challenge Completed</h2>

                <div className="bg-gradient-to-l from-amber-200 flex justify-center w-full p-5">
                    <div className="text-left text-lg pr-10 min-w-[340px]">
                        <p>&gt; Challenge: <a className="btn btn-accent btn-xs" href={url} target="_blank">{title}</a></p>
                        <p>&gt; Completion Rate: <span className="font-extrabold">{Math.round((completedTotal / attemptedTotal) * 1000) / 10}%</span></p>
                        <p>&gt; Completed: <span className="font-extrabold">{getFormattedDate(completionDate)}</span></p>
                    </div>

                    <div className="flex h-80 w-[53%] min-w-[410px]">{renderSnippets()}</div>
                </div>

                <div className="flex justify-around">{renderTags()}</div>
            </motion.div>
        </div>
    )
}

export default MostRecent