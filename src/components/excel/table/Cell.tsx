import React, { memo } from 'react'

interface CellProps {
  rowIndex: number
  colIndex: number
}

const Cell: React.FC<CellProps> = ({rowIndex, colIndex}) => {


  return (
    <div className="cell" >
      {/*Here must be text*/}
    </div>
  )
}

export default memo(Cell)
