import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import emitter from '../../../core/emitter'
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

  const table = useContext(TableContext)
  const [selected, setSelected] = useState('')

  const thisCellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    table.cellsRef[rowIndex] = table.cellsRef[rowIndex] ?? {}
    table.cellsRef[rowIndex][colIndex] = table.cellsRef[rowIndex][colIndex] ?? {}
    table.cellsRef[rowIndex][colIndex].select = () => {
      thisCellRef.current.focus()
      setSelected('selected')
    }
    table.cellsRef[rowIndex][colIndex].unselect = () => setSelected('')
    table.cellsRef[rowIndex][colIndex].target = thisCellRef.current
  }, [])

  const handler = useMemo(() =>
      keyboardSelectionHandler(rowIndex, colIndex, table.changeSelected), [rowIndex, colIndex, table.changeSelected])
  
  const [currentText, changeCurrentText] = useState('')

  return (
    <div
      ref={thisCellRef}
      className={`cell ${selected}`}
      style={{width: width + 'px'}}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onMouseDown={()=>table.changeSelected(rowIndex, colIndex)}
      onKeyDown={handler}
      onInput={e => {
        const target = e.target as HTMLDivElement
        changeCurrentText(target.textContent)
        emitter.emit('table:input', target)
      }}
    >
      {currentText}
    </div>
  )
}

export default memo(Cell)
