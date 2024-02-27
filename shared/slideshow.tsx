import { AnimatePresence } from "framer-motion";
import { FC, ReactNode } from "react";


const SlideShow: FC<{
    styles: string,
    children: ReactNode
}> = ({
    children,
    styles
}) => {
    return (
        <div className={styles}>
            <AnimatePresence >
                {children}
            </AnimatePresence>
        </div>
    )
}

export default SlideShow