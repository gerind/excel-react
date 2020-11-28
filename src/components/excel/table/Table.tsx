import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import { idToCell, useFromSecondRender } from '../../../core/utils'
import FirstRow from './FirstRow'
import Row from './Row'
import { useInitTable } from './table.functions'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)
  const columnResize = useSelector((state: StateType) => state.resize.column)

  const dispatch = useDispatch()
  
  const cellsRef = useRef<any>({})

  const nowSelected = useSelector((state: StateType) => state.selected)

  useEffect(() => {
    if (cellsRef.current.cell) {
      const [prevRow, prevColumn] = cellsRef.current.cell
      cellsRef.current[prevRow][prevColumn].unselect()
    }
    const [row, col] = idToCell(nowSelected)
    cellsRef.current.cell = [row, col]
    cellsRef.current[row][col].select()
  }, [nowSelected])

  useInitTable(cellsRef)

  const contextRef = useRef<any>({
    cellsRef: cellsRef.current,
    dispatch
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
