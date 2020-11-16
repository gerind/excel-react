import React from 'react'
import FirstRow from './FirstRow'
import Row from './Row'

interface TableProps {
  rowCount: number
  colCount: number
}

const Table: React.FC<TableProps> = ({rowCount, colCount}) => {

  return (
    <div className="excel__table">
      <FirstRow colCount={colCount} />
      {
        new Array(rowCount)
            .fill(null)
            .map((_, rowIndex) => (
              <Row rowIndex={rowIndex} colCount={colCount} key={rowIndex} />
            ))
      }
    </div>
  )
}

export default Table
