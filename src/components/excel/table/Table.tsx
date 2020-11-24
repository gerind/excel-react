import React, { useRef} from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import FirstRow from './FirstRow'
import Row from './Row'
import { useInitTable, useSelectionCallback } from './table.functions'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)
  const columnResize = useSelector((state: StateType) => state.resize.column)
  
  const cellsRef = useRef<any>({})

  useInitTable(cellsRef)
  const changeSelected = useSelectionCallback(cellsRef, rowCount, colCount)

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
