import { IconInter } from "@components/icon"
import { dataOptions } from "lib/sections/sections.types"


export const overallMenuData: (mappedPayload: dataOptions) => Array<IconInter> = (mappedPayload: dataOptions) => {
    return [
        {
            name: "Profile",
            size: "sm",
            kind: {
                type: "link",
                content: "https://www.codewars.com/users/Alvarian_",
                callback: () => {}
            },
            src: "/icons/codewars.svg",
            position: "right",
            content: null,
            custom: {
                parent:"bg-red-700 border hover:invert",
                img: "",
                content: ""
            }
        },
        {
            name: "Rank",
            size: "md",
            kind: {
                type: "",
                content: "",
                callback: () => {}
            },
            src: "/icons/star-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Rank"],
            custom: {
                parent:"",
                img: "",
                content: ""
            }    
        },
        {
            name: "Completed",
            size: "md",
            kind: {
                type: "",
                content: "",
                callback: () => {}
            },
            src: "/icons/fire-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Completed"],
            custom: {
                parent: "",
                img: "",
                content: ""
            }    
        }
    ]
}
