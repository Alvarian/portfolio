type Nullable<T> = T | null;

export interface Content {
  alt: string,
  content: Nullable<{
    body: React.FC<any>,
    isFull: boolean
  }>,
  type: string,
  keyIcon: string,
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

export type dataOptions = {
  [key: string]: any
}