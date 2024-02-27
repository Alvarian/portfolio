import { Dispatch, SetStateAction } from "react";

type Nullable<T> = T | null;

export interface Content {
  alt: string,
  content: {
    body: React.FC<any>,
    isFull: boolean
  } | null,
  type: string,
  keyIcon: string | null,
  bgImageName: string
}

export interface Badge {
  issuedOn: string,
  image: string,
  evidence: Array<{"url": string}>,
  name: string,
  description: string,
  tags: Array<string>,
  rotations: {
    horizontal: number,
    vertical: number
  }
}

export interface OverallPayload {      
  leaderBoardScore: number,
  totalCompleted: number,
  languagesTotal: {[key: string]: number}
}

export interface MostrecentPayload {
  title: string,
  attemptedTotal: number,
  completedTotal: number,
  url: string,
  tags: string[],
  completionDate: string,
  languagesUsed: string[],
  solutions: {
    title: string, 
    languages: {language: string, solution: string}[]
  }
}

export type Data = {
  setting: string,
  data: {
    stats: {
      overallStatsPayload: OverallPayload,
      mostRecentPayload: MostrecentPayload,
    },
    knowledge: Badge[],
    projects: Project[]
  }
}

export interface Project {
  id: number,
  title: string,
  icon: string,
  description: string,
  stacks: Array<string>,
  repo: string,
  lastUpdate: string,
  payload: {type: string, ref: ContentFromREADME}
}

export type ContentFromREADME = {
  description: string,
  image: string,
}[] | string

export interface ServerPropsData {
  overallStatsPayload: OverallPayload,
  mostRecentPayload: MostrecentPayload,
} 

export interface ServerPropsMedia {
  gifFrames: string[],
  badges: Badge[]
}

export const specific = <T>() => <U extends T>(argument: U) => argument;