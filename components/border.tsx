const Border: React.FC<any> = ({
    thickness,
    color
}) => {
    const styles = {
        tailwind: `${thickness} ${color} w-full z-20`
    }
    return (
        <div className={styles.tailwind}></div>
    )
}

export default Border