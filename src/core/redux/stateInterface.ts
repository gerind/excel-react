
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
  style: {
    [key: string]: { // key in format `${row}:${col}`
      [key: string]: string | number // styles
    }
  }
  selected: string // `${row}:${col}`
}

export interface resizeTableType {
  side: 'row' | 'column'
  index: number
  delta: number
}

export interface changeStyleType {
  id: string // in format `${row}:${col}`
  style: {
    [key: string]: string | number // styles
  }
}

export interface selectCellType {
  id: string // `${row}:${col}`
}
