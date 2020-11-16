import React from 'react'
import { getColumnName } from '../../../core/utils'

interface FirstRowProps {
  colCount: number
}

const FirstRow: React.FC<FirstRowProps> = ({colCount}) => {

  return (
    <div className="row">
      <div className="info"></div>
      {
        new Array(colCount)
            .fill(null)
            .map((_, colIndex) => (
              <div className="column" key={colIndex}>
                {getColumnName(colIndex)}
              </div>
            ))
      }
    </div>
  )
}

export default FirstRow
