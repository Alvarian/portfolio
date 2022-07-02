import { pathVariant } from "lib/sections/sections.data"

import { motion } from 'framer-motion';


const Underline: React.FC<{ width: number }> = ({
    width
}) => {
    return (
        <svg version="1.1" id="line_2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width || "120px"} height="10px" className="rounded-sm mt-4">
            <motion.path fill="#01a09e" strokeWidth="8" stroke="#FFFFFF" d="M0 0 l1120 0"
                initial="hidden"
                whileInView="visible" 
                variants={pathVariant.draw(4)}
            />
        </svg>
    )
}

export default Underline