import React from 'react'

interface RowProps {
  rowIndex: number
  colCount: number
}

const Row: React.FC<RowProps> = ({rowIndex, colCount}) => {

  return (
    <div className="row">
      <div className="info">{rowIndex + 1}</div>
      {
        new Array(colCount)
            .fill(null)
            .map((_, colIndex) => (
              <div className="cell" key={colIndex}>
                {/*Here must be text*/}
              </div>
            ))
      }
    </div>
  )
}

export default Row
