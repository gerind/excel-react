import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/excel/excelStateInterface'
import Cell from './Cell'
import FirstRow from './FirstRow'
import Row from './Row'
import { useColumnResize, useTableHooks } from './table.functions'
import { TableContext } from './TableContext'

function shallowEq(left: any, right: any) {
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

export interface CellsRefType {
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

  const contextRef = useRef({
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
          new Array(rowCount)
              .fill(null)
              .map((_, rowIndex) => (
                <Row
                  rowIndex={rowIndex}
                  colCount={colCount}
                  key={rowIndex}
                  rowResize={rowResize[rowIndex]}
                />
              ))
        }
      </div>
    </TableContext.Provider>
  )
}
