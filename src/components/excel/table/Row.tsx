import React, { memo, useMemo, useRef } from 'react'
import Resizer from './resize/Resizer'

interface RowProps {
  rowIndex: number
  colCount: number
  columnResize: {[key: number]: number}
  rowResize: number
}

const Row: React.FC<RowProps> = ({rowIndex, colCount, columnResize, rowResize}) => {

  const cellArray = useMemo(() =>
    new Array(colCount)
        .fill(null)
        .map((_, colIndex) => (
          <div className="cell" key={colIndex} style={{width: columnResize[colIndex] + 'px'}} >
            {/*Here must be text*/}
          </div>
        ))
  , [columnResize])

  return (
    <div className="row" style={{height: rowResize + 'px'}}>
      <div className="info">
        {rowIndex + 1}
        <Resizer type={'row'} index={rowIndex} />
      </div>
      {cellArray}
    </div>
  )
}

export default memo(Row)
