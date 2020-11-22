import React, { memo  } from 'react'
import Cell from './Cell'
import Resizer from './resize/Resizer'

interface RowProps {
  rowIndex: number
  colCount: number
  rowResize: number
  columnResize: {[key: number]: number}
}

const Row: React.FC<RowProps> = ({rowIndex, colCount, rowResize, columnResize}) => {

  console.log('Row')
  return (
    <div className="row" style={{height: rowResize + 'px'}}>
      <div className="info">
        {rowIndex + 1}
        <Resizer
          type={'row'}
          index={rowIndex}
        />
      </div>
      {
        new Array(colCount)
            .fill(null)
            .map((_, colIndex) => (
              <Cell
                key={colIndex}
                rowIndex={rowIndex}
                colIndex={colIndex}
                width={columnResize[colIndex]}
              />
            ))
      }
    </div>
  )
}

export default memo(Row)
