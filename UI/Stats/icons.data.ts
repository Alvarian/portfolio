import { dataOptions } from "lib/sections/sections.types"

export const overallMenuData = (mappedPayload: dataOptions) => {
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
            custom: {parent:"bg-red-700 border hover:invert"}
        },
        {
            name: "Rank",
            size: "md",
            src: "/icons/star-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Rank"]     
        },
        {
            name: "Completed",
            size: "md",
            src: "/icons/fire-svgrepo-com.svg",
            position: "center",
            content: mappedPayload["Completed"]     
        }
    ]
}
