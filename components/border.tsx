const Border: React.FC<any> = ({
    thickness,
    color,
    slotFields
}) => {
    const isVisible: boolean = slotFields.first.admissions?.isPermitted

    const styles = {
        tailwind: `${thickness} ${color} w-full z-20`
    }

    const slot = () => {
        if (isVisible) {
            return (
                <div>{slotFields.first.name}</div>
            )
        } 
        
        return (
            <div>{slotFields.last.name}</div>
        )
    }
    
    return (
        <div className={styles.tailwind}>
            {slot()}
        </div>
    )
}

export default Border