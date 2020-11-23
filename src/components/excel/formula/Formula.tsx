import React, { useEffect, useRef, useState } from 'react'
import emitter from '../../../core/emitter'

const Formula: React.FC = () => {

  const [currentText, changeCurrentText] = useState('')

  useEffect(() => {
    const selectOrInputHandler = target => changeCurrentText(target.textContent)
    emitter.on('table:select', selectOrInputHandler)
    emitter.on('table:input', selectOrInputHandler)
  }, [])

  return (
    <div className="excel__formula">
      <div className="fx">fx</div>
      <div
        className="formula"
        contentEditable={true}
        suppressContentEditableWarning={true}>
          {currentText}
        </div>
    </div>
  )
}

export default Formula
