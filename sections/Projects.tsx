import { AnimatePresence, motion } from "framer-motion"
import { getFormattedDate } from "lib/sections/sections.methods"
import { FC, useState } from "react"


interface Project {
    id: number,
    title: string,
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
            className="m-[5px] w-[140px] rounded-xl border-8 cursor-pointer border-indigo-600"
            layoutId={`product-${project.id}`}
        />
    )
}

const index: FC<{data: Array<Project>}> = ({ data }) => {
    const [productIds, setProductIds] = useState(data.filter((x: Project) => data.indexOf(x) !== 0))
    const [primaryProduct, setPrimaryProduct] = useState(data[0])
    console.log(data)
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
                    <motion.div
                        layoutId={`product-${primaryProduct.id}`}
                        key={primaryProduct.id}
                        className="object-cover h-full w-full absolute top-0 left-0 flex justify-around items-center rounded-2xl bg-black/50 hover:bg-black"
                    >
                        <div>
                            <h2 className="text-4xl">{primaryProduct.title.charAt(0).toUpperCase() + primaryProduct.title.slice(1)}</h2>

                            <img
                                className="h-[400px] m-5"
                                src={primaryProduct.icon}
                                alt=""
                            />

                            <button className="btn btn-accent btn-wide">OPEN PROJECT</button>
                        </div>

                        <ul className="w-1/3 h-3/4 text-left flex flex-col justify-around items-center">
                            <li className="w-full">{primaryProduct.description}</li>
                            <li className="w-full"><a className="link link-primary" href={primaryProduct.repo}>Repository Source</a></li>
                            <li className="w-full">Last push on {getFormattedDate(primaryProduct.lastUpdate)}</li>
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </main>

            <aside className="flex flex-col flex-wrap h-[620px] w-[220px] overflow-auto mt-0">
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