import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import emitter from '../../../core/emitter'
import { getInnerText } from '../../../core/utils'
import keyboardSelectionHandler from './selection/keyboardSelectionHandler'
import { TableContext } from './Table'

interface CellProps {
  rowIndex: number
  colIndex: number
  width: number
}
/*
  Схема: Cell при монтировании передаёт в Table свою функцию изменения своего состояния
  Table хранит матрицу эти функций всех Cell-ов, и текущую выбранную ячейку
  При клике на Cell вызывается колбэк в Table, который меняет соответственно селекшн
*/
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
    <ContentEditable
      html={currentText}
      innerRef={thisCellRef}
      className={`cell ${selected}`}
      style={{width: width + 'px'}}
      onMouseDown={()=>table.changeSelected(rowIndex, colIndex)}
      onKeyDown={handler}
      onChange={e => {
        const target = e.target as any
        changeCurrentText(getInnerText(target))
        emitter.emit('table:input', target)
      }}
    />
  )
}

export default memo(Cell)
