import React, { useEffect, useRef, useState } from 'react'
import emitter from '../../../core/emitter'

const Formula: React.FC = () => {

  const formulaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emitter.on('table:select', payload => {
      formulaRef.current.textContent = payload.target.textContent
    })
  }, [])

  const [currentText, changeCurrentText] = useState('')

  return (
    <div className="excel__formula">
      <div className="fx">fx</div>
      <input
        ref={formulaRef}
        className="formula"
        value={currentText}
        onChange={e => {
          changeCurrentText(e.target.value)
        }}
      />
    </div>
  )
}

export default Formula
