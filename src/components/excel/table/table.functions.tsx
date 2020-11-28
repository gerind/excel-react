import { MutableRefObject, useEffect } from 'react'
import emitter from '../../../core/emitter'
import { getInnerText, idToCell } from '../../../core/utils'

export function useInitTable(cellsRef: MutableRefObject<any>) {
  useEffect(() => {

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

export function useReselectCell(cellsRef: MutableRefObject<any>, nowSelected: string) {
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
