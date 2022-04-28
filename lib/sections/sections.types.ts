type Nullable<T> = T | null;

export interface Content {
  alt: string,
  // content: Nullable<{
  //   element: React.FC<any>,
  //   hasFocus: boolean
  // }>,
  content: Nullable<React.FC<any>>
  bgImageName: string
};