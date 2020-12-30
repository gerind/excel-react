import React, { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/reducer'
import { ObjectNumberType, ObjectType } from '../../../core/types'
import { generateArray } from '../../../core/utils'
import Cell from './Cell'
import FirstRow from './FirstRow'
import Row from './Row'
import { useColumnResize, useTableHooks } from './table.functions'
import { TableContext, TableContextType } from './TableContext'

function shallowEq(left: ObjectType, right: ObjectType) {
  for (let key in right) {
    if (right[key] !== left[key]) {
      return false
    }
  }
  return true
}

interface TableProps {
  rowCount: number
  colCount: number
}

export type CellsRefType = {
  cell?: number[]
  [key: number]: {[key: number]: Cell}
}

export const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const dispatch = useDispatch()
  
  const cellsRef = useRef<CellsRefType>({})

  const {rowResize, columnResize, stateText, stateStyle, nowSelected} = useSelector((state: StateType) => ({
    rowResize: state.resize.row,
    columnResize: state.resize.column,
    stateText: state.text,
    stateStyle: state.style,
    nowSelected: state.selected
  }), shallowEq)

  useTableHooks(cellsRef, stateText, stateStyle, nowSelected)
  useColumnResize(cellsRef, rowCount, columnResize)

  const contextRef = useRef<TableContextType>({
    cellsRef: cellsRef.current,
    dispatch,
    initial: {
      rowResize,
      columnResize,
      stateStyle,
      stateText,
      nowSelected
    }
  })

  const rows = useMemo(() => generateArray(rowIndex => (
    <Row
      rowIndex={rowIndex}
      colCount={colCount}
      key={rowIndex}
      rowResize={rowResize[rowIndex]}
    />
  ), rowCount), [colCount, rowCount])

  return (
    <TableContext.Provider
      value={contextRef.current}>
      <div
        className="excel__table">
        <FirstRow
          colCount={colCount}
          columnResize={columnResize}
        />
        {
          rows
        }
      </div>
    </TableContext.Provider>
  )
}
