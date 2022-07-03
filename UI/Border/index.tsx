import { motion } from "framer-motion"


const Border: React.FC<{
    slotFields: Array<{
        admissions: {
            isPermitted: boolean | null
        },
        name: string
    }>
}> = ({
    slotFields
}) => {
    const isVisible: boolean | null = slotFields[1].admissions?.isPermitted 

    const determineSlot4 = () => {
        if (slotFields[3].name) return slotFields[3].name

        if (slotFields[2].name === "Outro") return ""

        return "Outro"
    }

    const wheel = [
        slotFields[0],
        slotFields[1],
        slotFields[2],
        {name: determineSlot4()},
        {name: ""},
        {name: ""},
    ]
    
    const target = isVisible ? wheel.length-1 : wheel.length-2

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