import { MutableRefObject, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/excel/excelStateInterface'
import { idToCell } from '../../../core/utils'
import { CellsRefType } from './Table'

export function useTableHooks(cellsRef: MutableRefObject<CellsRefType>, stateText, stateStyle, nowSelected: string) {
  const nowStyle = stateStyle[nowSelected]

  const [row, col] = idToCell(nowSelected)

  useEffect(() => {
    cellsRef.current[row][col].changeText(stateText[nowSelected])
  })

  useEffect(() => {
    cellsRef.current[row][col].changeStyle(nowStyle)
  }, [nowStyle])

  useEffect(() => {
    if (cellsRef.current.cell) {
      const [prevRow, prevColumn] = cellsRef.current.cell
      cellsRef.current[prevRow][prevColumn].unselect()
    }
    const [row, col] = idToCell(nowSelected)
    cellsRef.current.cell = [row, col]
    cellsRef.current[row][col].select()
  }, [nowSelected])
}

export function useColumnResize(cellsRef: MutableRefObject<CellsRefType>, rowCount: number, columnResize) {
  const prevColumnResize = useRef(null)

  useEffect(() => {
    if (prevColumnResize.current !== null) {
      const prev = prevColumnResize.current
      Object.entries(columnResize).forEach(([key, value]) => {
        if (prev[key] !== value) {
          for (let i = 0; i < rowCount; ++i) {
            cellsRef.current[i][key].changeWidth(value)
          }
        }
      })
    }
    prevColumnResize.current = columnResize
  }, [columnResize])
}
