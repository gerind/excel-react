import React, { memo, useContext, useEffect, useState } from 'react'
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
  console.log('Cell')
  const [selected, setSelected] = useState('')

  useEffect(() => {
    table.cellsRef[rowIndex] = table.cellsRef[rowIndex] ?? {}
    table.cellsRef[rowIndex][colIndex] = table.cellsRef[rowIndex][colIndex] ?? {}
    table.cellsRef[rowIndex][colIndex].select = () => setSelected('selected')
    table.cellsRef[rowIndex][colIndex].unselect = () => setSelected('')
  }, [])

  return (
    <div
      className={`cell ${selected}`}
      style={{width: width + 'px'}}
      contentEditable={true}
      onMouseDown={()=>table.changeSelected(rowIndex, colIndex)}
    >
      {/*Here must be text*/}
    </div>
  )
}

export default memo(Cell)
