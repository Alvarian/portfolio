import Image from 'next/image';
import { motion } from 'framer-motion';
import { dataOptions } from 'lib/sections/sections.types'


const Arrow: React.FC<any> = ({
    size,
    direction,
    content,
    handler
}) => {
    const mappedDirections: dataOptions = {
        left: {
            arrow: "270",
            position: "flex-row-reverse"
        },
        right: {
            arrow: "90",
            position: ""
        },
        // down: "180"
    }

    const styles = {
        main: `flex items-center justify-center w-full ${mappedDirections[direction].position}`,
        img: {transform: `rotate(${mappedDirections[direction].arrow}deg)`},
        content: `text-2xl text-center`
    }

    return (
        <button className={styles.main} onClick={() => handler()}>
            <span className={styles.content}>{content}</span>
                
            <Image style={styles.img} width={size} height={size} src="/icons/up-arrow-svgrepo-com.svg" />
        </button>
    )
}

export default Arrow