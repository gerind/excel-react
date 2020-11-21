import React, { memo } from 'react'
import { getColumnName } from '../../../core/utils'
import Resizer from './resize/Resizer'

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
              <div className="column" key={colIndex} >
                {getColumnName(colIndex)}
                <Resizer type={'column'} index={colIndex} />
              </div>
            ))
      }
    </div>
  )
}

export default memo(FirstRow)
