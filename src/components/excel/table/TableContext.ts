import React from 'react'
import { Dispatch } from 'redux'
import { ObjectNumberType, ObjectType, StyleObject } from '../../../core/types'
import { CellsRefType } from './Table'

export interface TableContextType {
  cellsRef: CellsRefType
  dispatch: Dispatch<any>
  initial: {
    rowResize: ObjectNumberType<number>
    columnResize: ObjectNumberType<number>
    stateStyle: ObjectType<StyleObject>
    stateText: ObjectType<string>
    nowSelected: string
  }
}

export const TableContext = React.createContext<TableContextType>(null)
