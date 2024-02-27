import { MotionStyle, motion } from "framer-motion"
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
    const mappedIconSizes = {
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
    }[size]!;

    const mappedIconPositions = {
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
    }[position]!;

    const renderParentIcon = (img: JSX.Element) => {
        switch (kind.type) {
            case "link":
                return (
                    <div className={"w-full "+mappedIconPositions.parent+" "+custom?.parent} style={mappedIconSizes.parent}>            
                    
                        <motion.a
                            href={kind.content}
                            className={"rounded-full " + custom?.img}
                            style={mappedIconPositions.child as MotionStyle}
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
                        >
                            {img}
                        </motion.a>
                        {content && <span className={mappedIconSizes.child.content+" "+custom?.content} style={{...mappedIconPositions.child, position: undefined}}>{content}</span>}

                    </div>
                )
            case "button":
                return (
                    <motion.button 
                        className={"w-full "+mappedIconPositions.parent+" "+custom?.parent} 
                        onMouseDown={(e) => {e.currentTarget.style.scale = "0.7"}} 
                        onMouseUp={(e) => {e.currentTarget.style.scale = "1"}} 
                        onClick={() => {kind.callback()}}
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={e => {}}
                        onHoverEnd={e => {}}
                    >
                        
                        <span className={custom?.img} style={{...mappedIconPositions.child, position: undefined}}>{img}</span>
                        {content && <span className={mappedIconSizes.child.content+" "+custom?.content} style={{...mappedIconPositions.child, position: undefined}}>{content}</span>}

                    </motion.button>
                )
            default:
                return (
                    <div className={"w-full "+mappedIconPositions.parent+" "+custom?.parent} style={mappedIconSizes.parent}>            

                        <span className={custom?.img} style={{...mappedIconPositions.child, position: undefined}}>{img}</span>
                        {content && <span className={mappedIconSizes.child.content+" "+custom?.content} style={{...mappedIconPositions.child, position: undefined}}>{content}</span>}

                    </div>
                )
        }
    }

    return renderParentIcon(<Image 
        alt={name}
        src={src}
        height={mappedIconSizes.child.img}
        width={mappedIconSizes.child.img}
    />)
}

export default Icon