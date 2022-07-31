import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { FC, useState } from "react"


interface Project {
    id: number,
    icon: string,
    description: string,
    stacks: Array<string>,
    repo: string,
    lastUpdate: string,
    type: string
}

const ProductImage: FC<{
    project: Project,
    onExpand: (project: Project) => void
}> = ({ project, onExpand }) => {
    return (
        <motion.img
            src={project.icon}
            alt=""
            onClick={() => onExpand(project)}
            className="m-[5px] w-[140px] rounded-xl border-8 cursor-pointer transition z-10 ease-in-out hover:z-10 hover:scale-105 border-indigo-600"
            layoutId={`product-${project.id}`}
        />
    )
}

const index: FC<{data: Array<Project>}> = ({ data }) => {
    const [productIds, setProductIds] = useState(data.filter((x: Project) => data.indexOf(x) !== 0))
    const [primaryProduct, setPrimaryProduct] = useState(data[0])
    
    const setAsPrimary = (project: Project) =>  {
        const currentProductId = primaryProduct
        const newProductIds = [
            ...productIds.filter((x: Project) => x.id !== project.id),
            currentProductId
        ]

        setPrimaryProduct(project)
        setProductIds(newProductIds)
    }

    return (
        <div className="m-auto flex flex-row items-center h-[620px]">
            <main className="h-[620px] min-w-[880px] relative mr-[40px]">
                <AnimatePresence>
                    <motion.img
                        key={primaryProduct.id}
                        className="object-cover h-full w-full absolute top-0 left-0"
                        src={primaryProduct.icon}
                        alt=""
                        layoutId={`product-${primaryProduct.id}`}
                    />
                </AnimatePresence>
            </main>

            <aside className="flex flex-col flex-wrap overflow-auto h-[620px] w-[220px] mt-0 border-transparent border-4">
                <AnimatePresence>
                    {productIds.map((project: Project) => (
                        <ProductImage project={project} key={project.id} onExpand={setAsPrimary} />
                    ))}
                </AnimatePresence>
            </aside>
        </div>
    )
}

export default index