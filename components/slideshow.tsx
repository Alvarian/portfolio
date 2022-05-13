import { AnimatePresence } from "framer-motion";


const SlideShow: React.FC<any> = ({
    children
}) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {children}
        </AnimatePresence>
    )
}

export default SlideShow