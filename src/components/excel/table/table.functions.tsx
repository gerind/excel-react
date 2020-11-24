import { MutableRefObject, useCallback, useEffect } from 'react';
import emitter from '../../../core/emitter';

export function useInitTable(cellsRef: MutableRefObject<any>) {
  useEffect(() => {
    cellsRef.current.cell = [0, 0]
    cellsRef.current[0][0].select()

    emitter.on('formula:input', target => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].change(target.value)
    })

    emitter.on('formula:tab', () => {
      const [row, col] = cellsRef.current.cell
      cellsRef.current[row][col].target.focus()
    })
  }, [])
}

export function useSelectionCallback(cellsRef: MutableRefObject<any>, rowCount: number, colCount: number) {
  return useCallback((row, column) => {
    const [prevRow, prevColumn] = cellsRef.current.cell
    if ((row !== prevRow || column !== prevColumn) && row < rowCount && column < colCount) {
      cellsRef.current[prevRow][prevColumn].unselect()
      cellsRef.current.cell = [row, column]
      cellsRef.current[row][column].select()
      emitter.emit('table:select', cellsRef.current[row][column].target)
    }
  }, [])
}
