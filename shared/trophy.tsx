import Image from "next/image"


const Trophy: React.FC<{
    content: string,
    size: number
}> = ({
    content,
    size
}) => {
    const styles = {
        tailwind: {
            main: `relative ml-5 w-20 h-20 items-center flex justify-center flex-col`
        }
    }
    return (
        <div className={styles.tailwind.main}>
            <div className="absolute">    
                <Image src="/icons/star-svgrepo-com.svg" height={size} width={size} />
            </div>

            <div className="absolute text-xl font-bold">{content}</div>
        </div>
    )
}

export default Trophy
