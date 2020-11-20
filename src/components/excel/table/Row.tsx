import React from 'react'
import Resizer from './resize/Resizer'

interface RowProps {
  rowIndex: number
  colCount: number
  columnResize: {[key: number]: number}
}

const Row: React.FC<RowProps> = ({rowIndex, colCount, columnResize}) => {


  return (
    <div className="row">
      <div className="info">
        {rowIndex + 1}
        <Resizer type={'row'} index={rowIndex} />
      </div>
      {
        new Array(colCount)
            .fill(null)
            .map((_, colIndex) => (
              <div className="cell" key={colIndex} style={{width: columnResize[colIndex] + 'px'}} >
                {/*Here must be text*/}
              </div>
            ))
      }
    </div>
  )
}

export default Row
