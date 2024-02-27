import { Server } from "http"
import { Badge, MostrecentPayload, OverallPayload } from "lib/sections/sections.types"

export interface Project {
    id: number,
    title: string,
    icon: string,
    description: string,
    stacks: Array<string>,
    repo: string,
    lastUpdate: string,
    payload: {type: string, ref: Array<any> | string}
}

export interface ServerPropsData {
    overallStatsPayload: OverallPayload,
    mostRecentPayload: MostrecentPayload,
} 

export interface ServerPropsMedia {
    gifFrames: string[],
    badges: Badge[]
}