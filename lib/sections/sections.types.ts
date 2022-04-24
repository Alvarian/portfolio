type Nullable<T> = T | null;

export interface Content {
  title: string,
  content: React.FC<any>,
  bgImageName: string
};