import Icon from "components/icon"
import { AnimatePresence, motion } from "framer-motion"
import { slider } from "./varients"


const MostRecent: React.FC<any> = ({ 
    payload, 
    setVisible
}) => {
    const {
        title,
        attemptedTotal,
        completedTotal,
        url,
        problem,
        tags,
        completionDate,
        languagesUsed
    } = payload

    const renderTags = () => {
        return tags.map((tag: string, index: number) => {
            return (
                <div key={index}>#{tag}</div>
            )
        })
    }

    const renderSnippets = () => {
        return languagesUsed.map((language: string, index: number) => {
            const styles = `tab tab-lifted ${index === 0 ? "tab-active" : ""}`

            return (
                <a key={index} className={styles}>{language}</a> 
            )
        })
    }

    return (
        <motion.div
            id="recent"
            className="bg-gradient-to-l from-black h-full"
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
            <h2>Most Recent Solution</h2>

            <div className="bg-gradient-to-l from-amber-200">
                <div>
                    <p>Name: <span>{title}</span></p>
                    <p>Completion Rate: <span>{Math.round((completedTotal / attemptedTotal) * 1000) / 10}%</span></p>
                    <p>URL: <a href={url}>{url}</a></p>
                    <p>Problem: <span>{problem}</span></p>
                </div>

                <div>{renderSnippets()}</div>
            </div>

            <div className="tabs">{renderTags()}</div>

            <Icon 
                key="overall arrow"
                position="left"
                src="/icons/up-arrow-svgrepo-com.svg"
                size="lg"
                content="Overall Challenges"
                kind={{
                    type: "button",
                    content: setVisible
                }}
                custom={{
                    parent: "",
                    img: "-rotate-90",
                    content: "text-2xl text-center bg-gradient-to-r from-yellow-300 p-3 h-12"
                }}
            />
        </motion.div>
    )
}

export default MostRecent