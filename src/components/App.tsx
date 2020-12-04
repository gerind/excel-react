import React from 'react'
import Excel from './excel/Excel'
import { usePreventDragStart } from '../core/utils'

const App: React.FC = () => {

  usePreventDragStart(document)

  return (
    <Excel excelName='excel' />
  )
}

export default App
