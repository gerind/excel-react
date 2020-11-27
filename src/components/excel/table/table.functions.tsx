import { MutableRefObject, useCallback, useEffect } from 'react'
import emitter from '../../../core/emitter'
import { getInnerText } from '../../../core/utils'

export function useInitTable(cellsRef: MutableRefObject<any>) {
  useEffect(() => {
    cellsRef.current.cell = [0, 0]
    cellsRef.current[0][0].select()

    const onFormulaInput = target => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].change(getInnerText(target))
    }

    const onFormulaTab = () => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].target.focus()
    }

    const onToolbarChange = ({styles}) => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].changeStyle(styles)
    }

    emitter.on('formula:input', onFormulaInput)
    emitter.on('formula:tab', onFormulaTab)
    emitter.on('toolbar:change', onToolbarChange)

    return () => {
      emitter.off('formula:input', onFormulaInput)
      emitter.off('formula:tab', onFormulaTab)
      emitter.off('toolbar:change', onToolbarChange)
    }
  }, [])
}

export function useSelectionCallback(cellsRef: MutableRefObject<any>, rowCount: number, colCount: number) {
  return useCallback((row: number, column: number, byKeyboard: boolean = false) => {
    const [prevRow, prevColumn] = cellsRef.current.cell
    if ((row !== prevRow || column !== prevColumn) && row < rowCount && column < colCount) {
      cellsRef.current[prevRow][prevColumn].unselect()
      cellsRef.current.cell = [row, column]
      cellsRef.current[row][column].select()
      emitter.emit('table:select', {
        target: cellsRef.current[row][column].target
      })
    }
  }, [])
}
