import React, { useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import Cell from './Cell'
import FirstRow from './FirstRow'
import Row from './Row'
import { useColumnResize, useSelectorChanges, useReselectCell } from './table.functions'
import { TableContext } from './TableContext'

interface TableProps {
  rowCount: number
  colCount: number
}

export interface CellsRefType {
  cell?: number[]
  [key: number]: {[key: number]: Cell}
}

export const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)

  const dispatch = useDispatch()
  const store = useStore()

  const cellsRef = useRef<CellsRefType>({})

  const nowSelected = useReselectCell(cellsRef)
  useSelectorChanges(cellsRef, nowSelected)
  
  const columnResize = useColumnResize(cellsRef, rowCount)

  const contextRef = useRef({
    cellsRef: cellsRef.current,
    dispatch,
    initial: {
      rowResize,
      columnResize,
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
