import React from 'react'
import { useSelector } from 'react-redux'
import { LOCALSTORAGE_DELAY } from '../constants'
import { debounce } from '../utils'

interface StateSaverProps {
  name: string
  fn: Function
}

const handler = debounce((name: string, state: any) => {
  localStorage.setItem(name, JSON.stringify(state))
}, LOCALSTORAGE_DELAY)

const StateSaver: React.FC<StateSaverProps> = ({name, fn}) => {
  
  const state = useSelector((state: any) => state)
  
  handler(name, fn(state))

  return (
    <React.Fragment />
  )
}

export default React.memo(StateSaver)
