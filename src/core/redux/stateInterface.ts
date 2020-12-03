import { StyleObject } from '../scriptTypes'


export interface ActionType {
  type: string | number,
  payload: any
}

export interface StateType {
  title: string
  resize: {
    row: {
      [key: number]: number
    }
    column: {
      [key: number]: number
    }
  }
  style: {
    [key: string]: StyleObject
  }
  text: {
    [key: string]: string
  }
  selected: string // `${row}:${col}`
}

export type changeTitleType = string | {
  title: string
}

export interface resizeTableType {
  side: 'row' | 'column'
  index: number
  delta: number
}

export type changeStyleType = StyleObject | {
  id: string // in format `${row}:${col}`
  style: StyleObject
}

export type changeTextType = string | {
  id: string // in format `${row}:${col}`
  text: string // new text
}

export type selectCellType = string | {
  id: string // `${row}:${col}`
}
