const MostRecent: React.FC<any> = ({ payload }) => {
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
        <div>
            <h2>Most Recent Solution</h2>

            <div>
                <div>
                    <p>Name: <span>{title}</span></p>
                    <p>Completion Rate: <span>{Math.round((completedTotal / attemptedTotal) * 1000) / 10}%</span></p>
                    <p>URL: <a href={url}>{url}</a></p>
                    <p>Problem: <span>{problem}</span></p>
                </div>

                <div>{renderSnippets()}</div>
            </div>

            <div className="tabs">{renderTags()}</div>
        </div>
    )
}

export default MostRecent