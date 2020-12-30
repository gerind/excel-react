import React from 'react'
import { useSelector } from 'react-redux'
import { LOCALSTORAGE_DELAY } from '../constants'
import { debounce } from '../utils'

interface StateSaverProps {
  name: string
}

const handler = debounce((name: string, state: any) => {
  try {
    localStorage.setItem(name, JSON.stringify(state))
  }
  catch {
    console.error('Error while saving state to localStorage')
  }
}, LOCALSTORAGE_DELAY)

const StateSaver: React.FC<StateSaverProps> = ({name}) => {
  
  const state = useSelector((state: any) => state)
  
  handler(name, state.extract())

  return (
    <React.Fragment />
  )
}

export default React.memo(StateSaver)
