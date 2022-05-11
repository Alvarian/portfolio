import Image from 'next/image';
import { motion } from 'framer-motion';
import { dataOptions } from 'lib/sections/sections.types'


const Arrow: React.FC<any> = ({
    size,
    direction,
    handler
}) => {
    const mappedDirections: dataOptions = {
        left: "270",
        right: "90",
        down: "180"
    }

    const styles = {
        transform: `rotate(${mappedDirections[direction]}deg)`
    }

    return (
        <Image style={styles} width={size} height={size} src="/icons/up-arrow-svgrepo-com.svg" />
    )
}

export default Arrow