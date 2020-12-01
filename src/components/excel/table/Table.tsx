import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import FirstRow from './FirstRow'
import Row from './Row'
import { useColumnResize, useInitTable, useReselectCell } from './table.functions'
import { TableContext } from './TableContext'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)
  const columnResize = useSelector((state: StateType) => state.resize.column)
  let prevColumnResize = useRef(null)

  const dispatch = useDispatch()
  
  const cellsRef = useRef<any>({})

  const nowSelected = useSelector((state: StateType) => state.selected)

  useReselectCell(cellsRef, nowSelected)
  useInitTable(cellsRef)
  useColumnResize(prevColumnResize, columnResize, rowCount, cellsRef)

  const contextRef = useRef<any>({
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

export default Table
