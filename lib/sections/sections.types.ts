type Nullable<T> = T | null;

export interface Content {
  alt: string,
  content: Nullable<{
    body: React.FC<any>,
    isFull: boolean
  }>,
  type: string,
  bgImageName: string
};