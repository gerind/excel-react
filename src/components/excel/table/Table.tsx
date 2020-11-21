import React from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import FirstRow from './FirstRow'
import Row from './Row'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  const rowResize = useSelector((state: StateType) => state.resize.row)

  return (
    <div className="excel__table">
      <FirstRow colCount={colCount} />
      {
        new Array(rowCount)
            .fill(null)
            .map((_, rowIndex) => (
              <Row rowIndex={rowIndex} colCount={colCount} key={rowIndex} rowResize={rowResize[rowIndex]} />
            ))
      }
    </div>
  )
}

export default Table
