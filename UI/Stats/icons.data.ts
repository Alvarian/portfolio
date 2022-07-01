import { dataOptions } from "lib/sections/sections.types"

export interface MenuData {
    name: string,
    size: string,
    kind: {
        type: string,
        content: string
    } | null,
    src: string,
    position: string,
    custom: {parent: string} | null,
    content: JSX.Element | string | null
}

export const overallMenuData: (mappedPayload: dataOptions) => Array<MenuData> = (mappedPayload: dataOptions) => {
    return [
        {
            name: "Profile",
            size: "sm",
            kind: {
                type: "link",
                content: "https://www.codewars.com/users/Alvarian_"
            },
            src: "/icons/codewars.svg",
            position: "right",
            custom: {parent:"bg-red-700 border hover:invert"},
            content: null
        },
        {
            name: "Rank",
            size: "md",
            kind: null,
            src: "/icons/star-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Rank"],
            custom: null    
        },
        {
            name: "Completed",
            size: "md",
            kind: null,
            src: "/icons/fire-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Completed"],
            custom: null    
        }
    ]
}
