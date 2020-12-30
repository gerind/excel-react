import React, { memo, useMemo  } from 'react'
import { generateArray } from '../../../core/utils'
import Cell from './Cell'
import Resizer from './resize/Resizer'

interface RowProps {
  rowIndex: number
  colCount: number
  rowResize: number
}

const Row: React.FC<RowProps> = ({rowIndex, colCount, rowResize}) => {

  const cells = useMemo(() => generateArray(colIndex => (
    <Cell
      key={colIndex}
      rowIndex={rowIndex}
      colIndex={colIndex}
    />
  ), colCount), [rowIndex, colCount])

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
        cells
      }
    </div>
  )
}

export default memo(Row)
