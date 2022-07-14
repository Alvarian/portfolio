import { motion } from "framer-motion"
import { MostrecentPayload } from "lib/sections/sections.types"
import { useState } from "react"
import { overallMenuData } from "./icons.data"
import { slider } from "./varients"


const MostRecent: React.FC<{
    payload: MostrecentPayload,
    width: number
}> = ({ 
    payload,
    width
}) => {
    const {
        title,
        attemptedTotal,
        completedTotal,
        url,
        tags,
        completionDate,
        languagesUsed,
        solutions
    } = payload
    
    const [currentSnippet, setSnippet] = useState(languagesUsed[0])
    
    const { css, tailwind } = width > 900 ? {
        css: {},
        tailwind: {
            main: `bg-gradient-to-l rounded-lg from-black flex flex-col justify-around pt-10 min-w-[825px]`,
            snippetContainer: `flex-col justify-start items-start w-full`,
            snippetMain: `bg-gradient-to-l from-amber-200 flex justify-center w-full p-5`,
            snippetDetails: `text-left text-lg pr-10 min-w-[340px] mb-10`,
            snippetTitle: `p-10 text-right text-3xl font-bold`,
            snippetTab: `tab tab-lifted`,
            snippetSolution: `h-5/6 font-sans font-bold w-full bg-slate-800 text-lime-600 p-5 whitespace-pre-wrap text-left text-lg overflow-scroll`
        }
    } : {
        css: {},
        tailwind: {
            main: `bg-gradient-to-l rounded-lg from-black flex flex-col justify-around pt-10 min-w-[450px]`,
            snippetContainer: `flex-col justify-start items-start w-full`,
            snippetMain: `bg-gradient-to-l from-amber-200 flex flex-col items-center justify-center w-full p-5`,
            snippetDetails: `text-left text-md pl-10 min-w-[320px] mb-10`,
            snippetTitle: `p-5 text-xl font-bold`,
            snippetTab: `text-md tab tab-lifted`,
            snippetSolution: `text-md h-5/6 font-sans font-bold w-full bg-slate-800 text-lime-600 p-5 whitespace-pre-wrap text-left text-lg overflow-scroll`
        }
    }

    const renderTags = () => {
        return tags.map((tag: string, index: number) => {
            return (
                <div key={index}>#{tag}</div>
            )
        })
    }

    const renderSnippets = () => {
        if (solutions.title !== title) return "<!-- Update snippets for "+title+" -->"

        const languageTabs = []
        const languageSnippets = []
        for (let i = 0; i < languagesUsed.length; i++) {
            const snippet = solutions.languages[i]
            const language = languagesUsed[i]

            const styles = {
                button: `${tailwind.snippetTab} ${currentSnippet === snippet.language ? "tab-active bg-slate-700" : "bg-slate-200"}`,
                snippet: `${tailwind.snippetSolution} ${currentSnippet === snippet.language ? "flex" : "hidden"}`
            }

            languageTabs.push(<button key={snippet.language+"_tab"} className={styles.button} onClick={() => setSnippet(language)}>{language.toLocaleUpperCase()}</button>)
            languageSnippets.push(<pre key={snippet.language+"_snip"} className={styles.snippet}>{snippet.solution}</pre>)
        }

        return (
            <div className={tailwind.snippetContainer}>
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
                className={tailwind.main}
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
                <h2 className={tailwind.snippetTitle}>Most Recent Challenge Completed</h2>

                <div className={tailwind.snippetMain}>
                    <div className={tailwind.snippetDetails}>
                        <p>&gt; Challenge: <a className="btn btn-accent btn-xs" href={url} target="_blank">{title}</a></p>
                        <p>&gt; Completion Rate: <span className="font-extrabold">{Math.round((completedTotal / attemptedTotal) * 1000) / 10}%</span></p>
                        <p>&gt; Completed: <span className="font-extrabold">{getFormattedDate(completionDate)}</span></p>
                    </div>

                    <div className="flex h-80 w-[53%] min-w-[390px]">{renderSnippets()}</div>
                </div>

                <div className="flex justify-around">{renderTags()}</div>
            </motion.div>
        </div>
    )
}

export default MostRecent