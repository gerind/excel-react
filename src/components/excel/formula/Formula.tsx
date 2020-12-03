import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeText } from '../../../core/redux/actions'
import { StateType } from '../../../core/redux/stateInterface'
import { getInnerText } from '../../../core/utils'

const Formula: React.FC = () => {

  const dispatch = useDispatch()

  const formulaRef = useRef<HTMLInputElement>(null)

  const nowSelected = useSelector((state: StateType) => state.selected)
  const stateText = useSelector((state: StateType) => state.text)

  const currentText = stateText[nowSelected] ?? ''

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
          dispatch(changeText(getInnerText(e.target)))
        }}
      />
    </div>
  )
}

export default Formula
