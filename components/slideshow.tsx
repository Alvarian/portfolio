import { AnimatePresence } from "framer-motion";


const SlideShow: React.FC<{
    styles: string
}> = ({
    children,
    styles
}) => {
    return (
        <div className={styles}>
            <AnimatePresence exitBeforeEnter>
                {children}
            </AnimatePresence>
        </div>
    )
}

export default SlideShow