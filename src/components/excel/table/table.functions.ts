import { MutableRefObject, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/stateInterface'
import { getInnerText, idToCell } from '../../../core/utils'
import { CellsRefType } from './Table'

export function useSelectorChanges(cellsRef: MutableRefObject<CellsRefType>, nowSelected: string) {
  
  const [row, col] = idToCell(nowSelected)

  const stateText = useSelector((state: StateType) => state.text)
  useEffect(() => {
    cellsRef.current[row][col].changeText(stateText[nowSelected])
  })

}

export function useReselectCell(cellsRef: MutableRefObject<any>): string {
  const nowSelected = useSelector((state: StateType) => state.selected)

  useEffect(() => {
    if (cellsRef.current.cell) {
      const [prevRow, prevColumn] = cellsRef.current.cell
      cellsRef.current[prevRow][prevColumn].unselect()
    }
    const [row, col] = idToCell(nowSelected)
    cellsRef.current.cell = [row, col]
    cellsRef.current[row][col].select()
  }, [nowSelected])
  
  return nowSelected
}

export function useColumnResize(cellsRef: MutableRefObject<any>, rowCount: number) {
  const prevColumnResize = useRef(null),
      columnResize = useSelector((state: StateType) => state.resize.column)

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

  return columnResize
}
