import React, { memo } from 'react'
import Excel from './excel/Excel'
import { usePreventDragStart } from '../core/utils'

const App: React.FC = () => {

  usePreventDragStart(document)

  return (
    <Excel />
  )
}

export default memo(App)
