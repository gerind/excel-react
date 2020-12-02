import React from 'react'
import { Dispatch } from 'redux'

export const TableContext = React.createContext<{
  cellsRef: any
  dispatch: Dispatch<any>
  initial: {
    rowResize: {[key: number]: number}
    columnResize: {[key: number]: number}
    nowSelected: string
  }
}>(null)
