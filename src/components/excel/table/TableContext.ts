import React from 'react'
import { Dispatch } from 'redux'
import { StyleObject } from '../../../core/scriptTypes'

export const TableContext = React.createContext<{
  cellsRef: any
  dispatch: Dispatch<any>
  initial: {
    rowResize: {[key: number]: number}
    columnResize: {[key: number]: number}
    stateStyle: {[key: string]: StyleObject}
    stateText: {[key: string]: string}
    nowSelected: string
  }
}>(null)
