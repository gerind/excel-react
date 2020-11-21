import React, { memo } from 'react'

interface CellProps {
  rowIndex: number
  colIndex: number
  width: number
}

const Cell: React.FC<CellProps> = ({rowIndex, colIndex, width}) => {


  return (
    <div
      className="cell"
      style={{width: width + 'px'}} >
      {/*Here must be text*/}
    </div>
  )
}

export default memo(Cell)
