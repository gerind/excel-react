
export interface ObjectType<T = any> {
  [key: string]: T
}

export interface ObjectNumberType<T = any> {
  [key: number]: T
}

export type StyleObject = ObjectType<string | number>
