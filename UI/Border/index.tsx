import { motion } from "framer-motion"
import SlideShow from "components/slideshow"
import { slider } from "./varients"


const Border: React.FC<any> = ({
    slotFields
}) => {
    const isVisible: boolean = slotFields[1].admissions?.isPermitted 

    const wheel = [
        slotFields[0],
        slotFields[1],
        slotFields[2],
        {name: (slotFields[2].name === "Outro") ? "" : "Outro"},
        {name: ""},
        {name: ""},
        {name: ""},
    ]
    
    const target = isVisible ? 6 : 5

    const borderPositionInWheel = (idx: number) => -idx * (360 / wheel.length);
    
    return (
        <div style={{
            height: "300px",
            width: "100%",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center"
        } as React.CSSProperties}>
            <motion.div style={{
                perspective: "50cm",
                width: "100%",
                height: "80px",
                position: "relative",
            } as React.CSSProperties}>
                {wheel.map((slot: any, index: number) => (
                    <motion.div
                        key={index}
                        animate={{
                            rotateX: target + borderPositionInWheel(index + target),
                        }}
                        transition={{ type: "tween", duration: 1 }}
                        style={{
                            originZ: -90,
                            rotateX: borderPositionInWheel(index),
                            backfaceVisibility: "hidden",
                            top: 0,
                            left: 0,
                            width: "100%",
                            position: "absolute",
                            fontSize: "50px"
                        } as React.CSSProperties}
                    >{slot.name}</motion.div>))
                }
            </motion.div>
        </div>
    )
}

export default Border