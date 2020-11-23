import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import emitter from '../../../core/emitter'
import { StateType } from '../../../core/redux/stateInterface'
import FirstRow from './FirstRow'
import Row from './Row'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)
  const columnResize = useSelector((state: StateType) => state.resize.column)
  
  const cellsRef = useRef<any>({})

  useEffect(() => {
    cellsRef.current.cell = [0, 0]
    cellsRef.current[0][0].select()

    emitter.on('formula:input', target => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].change(target.value)
    })

    emitter.on('formula:tab', () => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].target.focus()
    })
  }, [])

  const changeSelected = useCallback((row, column) => {
    const [prevRow, prevColumn] = cellsRef.current.cell
    if ((row !== prevRow || column !== prevColumn) && row < rowCount && column < colCount) {
      cellsRef.current[prevRow][prevColumn].unselect()
      cellsRef.current.cell = [row, column]
      cellsRef.current[row][column].select()
      emitter.emit('table:select', cellsRef.current[row][column].target)
    }
  }, [])

  const contextRef = useRef<any>({
    cellsRef: cellsRef.current,
    changeSelected
  })

  return (
    <TableContext.Provider value={contextRef.current}>
      <div className="excel__table">
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
                  columnResize={columnResize}
                />
              ))
        }
      </div>
    </TableContext.Provider>
  )
}

export const TableContext = React.createContext(null)

export default Table
