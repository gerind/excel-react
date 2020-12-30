import React, { memo } from 'react'
import { ObjectNumberType } from '../../../core/types'
import { getColumnName } from '../../../core/utils'
import Resizer from './resize/Resizer'

interface FirstRowProps {
  colCount: number
  columnResize: ObjectNumberType<number>
}

const FirstRow: React.FC<FirstRowProps> = ({colCount, columnResize}) => {

  return (
    <div
      className="row">
      <div
        className="info" />
      {
        new Array(colCount)
            .fill(null)
            .map((_, colIndex) => (
              <div
                className="column"
                key={colIndex}
                style={{width: columnResize[colIndex] + 'px'}}
              >
                {getColumnName(colIndex)}
                <Resizer
                  type={'column'}
                  index={colIndex}
                />
              </div>
            ))
      }
    </div>
  )
}

export default memo(FirstRow)
