import React, { memo, useEffect } from 'react'
import Excel from './excel/Excel'
import { storage, usePreventDragStart } from '../core/utils'
import { useSelector } from 'react-redux'

const App: React.FC = () => {

  usePreventDragStart(document)

  const state = useSelector(state => state)
  useEffect(() => {
    storage('excel', state)
  }, [state])

  return (
    <Excel />
  )
}

export default memo(App)
