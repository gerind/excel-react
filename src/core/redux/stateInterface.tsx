
export interface ActionType {
  type: string | number,
  payload: any
}

export interface StateType {
  resize: {
    row: {
      [key: number]: number
    }
    column: {
      [key: number]: number
    }
  }
}

export interface resizeTablePayloadType {
  side: 'row' | 'column'
  index: number
  delta: number
}
