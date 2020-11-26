import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import emitter from '../../../core/emitter'
import { getInnerText, replaceCaret } from '../../../core/utils'
import keyboardSelectionHandler from './selection/keyboardSelectionHandler'
import { TableContext } from './Table'

interface CellProps {
  rowIndex: number
  colIndex: number
  width: number
}

const Cell: React.FC<CellProps> = ({rowIndex, colIndex, width}) => {

  const [currentText, changeCurrentText] = useState('')

  const table = useContext(TableContext)
  const [selected, setSelected] = useState('')

  const thisCellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    table.cellsRef[rowIndex] = table.cellsRef[rowIndex] ?? {}
    Object.assign(
      table.cellsRef[rowIndex][colIndex] = table.cellsRef[rowIndex][colIndex] ?? {},
      {
        select() {
          thisCellRef.current.focus()
          setSelected('selected')
        },
        unselect() { setSelected('') },
        target: thisCellRef.current,
        change: changeCurrentText
      }
    )
  }, [])

  const handler = useMemo(() =>
      keyboardSelectionHandler(rowIndex, colIndex, table.changeSelected), [rowIndex, colIndex, table.changeSelected])

  return (
    <div
      contentEditable={true}
      suppressContentEditableWarning={true}
      ref={thisCellRef}
      className={`cell ${selected}`}
      style={{width: width + 'px'}}
      onMouseDown={() => {
        table.changeSelected(rowIndex, colIndex)
      }}
      onKeyDown={handler}
      onInput={e => {
        emitter.emit('table:input', { target: e.target })
      }}
      onBlur={e => {
        changeCurrentText(getInnerText(e.target))
      }}
      onFocus={() => {
        replaceCaret(thisCellRef.current)
      }}
    >
      {currentText}
    </div>
  )
}

export default memo(Cell)
