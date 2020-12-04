import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeText } from '../../../core/redux/excel/excelActions'
import { StateType } from '../../../core/redux/excel/excelStateInterface'
import { getInnerText } from '../../../core/utils'

const Formula: React.FC = () => {

  const dispatch = useDispatch()

  const formulaRef = useRef<HTMLInputElement>(null)

  const currentText = useSelector((state: StateType) => state.text[state.selected] ?? '')

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
