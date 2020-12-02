import React, { useEffect, useRef, useState } from 'react'
import { getInnerText } from '../../../core/utils'

const Formula: React.FC = () => {

  const [currentText, changeCurrentText] = useState('')

  const formulaRef = useRef(null)

  useEffect(() => {
    const selectOrInputHandler = ({target}) => changeCurrentText(getInnerText(target))
    emitter.on('table:select', selectOrInputHandler)
    emitter.on('table:input', selectOrInputHandler)
  }, [])

  return (
    <div
      className="excel__formula">
      <div
        className="fx">
        fx
      </div>
      <input
        ref={formulaRef}
        className="formula"
        value={currentText}
        onKeyDown={e => {
          if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        onChange={e => {
          const target = e.target as HTMLInputElement
          changeCurrentText(getInnerText(target))
          emitter.emit('formula:input', formulaRef.current)
        }}
      />
    </div>
  )
}

export default Formula
