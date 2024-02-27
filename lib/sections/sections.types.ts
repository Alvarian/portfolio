import { Dispatch, SetStateAction } from "react";
import { Project } from "shared/types";

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

// export type dataOptions = {
//   [key: string]: any
// }

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


export const specific = <T>() => <U extends T>(argument: U) => argument;