import { motion } from "framer-motion"
import { dataOptions } from "lib/sections/sections.types"
import Image from "next/image"


export interface IconInter {
    name: string,
    size: string,
    kind: {
        type: string,
        content: string,
        callback: () => void
    },
    src: string,
    position: string,
    custom: {parent: string, img: string, content: string},
    content: JSX.Element | string | null
}


const Icon: React.FC<IconInter> = ({
    name,
    src,
    size,
    content,
    position,
    custom,
    kind
}) => {
    const mappedIconSizes: dataOptions = {
        sm: {
            parent: {
                height: "30px",
                width: "30px"
            },
            child: {
                img: 20,
                content: "text-lg"
            }
        },
        md: {
            parent: {
                height: "50px",
                width: "50px"
            },
            child: {
                img: 40,
                content: "text-xl"
            }
        },
        lg: {
            parent: {
                height: "70px",
                width: "70px"
            },
            child: {
                img: 60,
                content: "text-2xl"
            }
        }
    }

    const mappedIconPositions: dataOptions = {
        left: {
            parent: `items-center flex justify-center`,
            child: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        },
        center: {
            parent: `relative items-center flex justify-center flex-col`,
            child: {
                position: "absolute"
            }
        },
        right: {
            parent: `items-center flex justify-center flex-row-reverse`,
            child: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }
    }

    const renderParentIcon = (img: JSX.Element) => {
        switch (kind.type) {
            case "link":
                return (
                    <div className={"w-full "+mappedIconPositions[position].parent+" "+custom?.parent} style={mappedIconSizes[size].parent}>            
                    
                        <motion.a href={kind.content} className={"rounded-full "+custom?.img} style={mappedIconPositions[position].child}
                            animate={{ 
                                rotate: 360,
                            }}
                            transition={{
                                delay: 1,
                                duration: 2,
                                ease: [0.075, 0.82, 0.165, 1],
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }}
                        >{img}</motion.a>
                        {content && <span className={mappedIconSizes[size].child.content+" "+custom?.content} style={mappedIconPositions[position].child}>{content}</span>}

                    </div>
                )
            case "button":
                return (
                    <motion.button 
                        className={"w-full "+mappedIconPositions[position].parent+" "+custom?.parent} 
                        onMouseDown={(e) => {e.currentTarget.style.scale = "0.7"}} 
                        onMouseUp={(e) => {e.currentTarget.style.scale = "1"}} 
                        onClick={() => {kind.callback()}}
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={e => {}}
                        onHoverEnd={e => {}}
                    >
                        
                        <span className={custom?.img} style={mappedIconPositions[position].child}>{img}</span>
                        {content && <span className={mappedIconSizes[size].child.content+" "+custom?.content} style={mappedIconPositions[position].child}>{content}</span>}

                    </motion.button>
                )
            default:
                return (
                    <div className={"w-full "+mappedIconPositions[position].parent+" "+custom?.parent} style={mappedIconSizes[size].parent}>            

                        <span className={custom?.img} style={mappedIconPositions[position].child}>{img}</span>
                        {content && <span className={mappedIconSizes[size].child.content+" "+custom?.content} style={mappedIconPositions[position].child}>{content}</span>}

                    </div>
                )
        }
    }

    return renderParentIcon(<Image 
        src={src}
        height={mappedIconSizes[size].child.img}
        width={mappedIconSizes[size].child.img}
    />)
}

export default Icon