import React, { useEffect } from 'react'
import Excel from './excel/Excel'
import { preventDefault } from './../core/utils'

const App: React.FC = () => {

  useEffect(() => {
    document.addEventListener('dragstart', preventDefault)
    return () => document.removeEventListener('dragstart', preventDefault)
  }, [])

  return (
    <Excel />
  )
}

export default App
