import React, { memo, useContext } from 'react'
import { TableContext } from './Table'

interface CellProps {
  rowIndex: number
  colIndex: number
  width: number
}

const Cell: React.FC<CellProps> = ({rowIndex, colIndex, width}) => {

  const selected = useContext(TableContext)
  const selectedClass = selected.rowSelected === rowIndex &&
      selected.columnSelected === colIndex ? 'selected' : ''

  return (
    <div
      className={`cell ${selectedClass}`}
      style={{width: width + 'px'}}
      contentEditable={true}
      onClick={() => selected.changeSelected(rowIndex, colIndex)}
    >
      {/*Here must be text*/}
    </div>
  )
}

export default memo(Cell)
