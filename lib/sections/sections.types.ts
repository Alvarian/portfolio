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
  tags: Array<string>,
  completionDate: string,
  languagesUsed: Array<string>
}

export type dataOptions = {
  [key: string]: any
}

export const specific = <T>() => <U extends T>(argument: U) => argument;