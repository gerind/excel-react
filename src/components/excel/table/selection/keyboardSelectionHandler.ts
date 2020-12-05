import React from 'react'
import { Dispatch } from 'redux'
import { selectCell } from '../../../../core/redux/excel/excelActions'
import { cellToId } from '../../../../core/utils'

function keyboardSelectionHandler() {
  
  return function(event: React.KeyboardEvent) {
    
    const row = this.props.rowIndex
    const col = this.props.colIndex
    const dispatch = this.context.dispatch

    let nextRow = row, nextCol = col
    if (event.key === 'Tab') {
      event.preventDefault()
      dispatch(selectCell(cellToId(nextRow, nextCol + 1)))
    }
    else if (event.key === 'Enter') {
      event.preventDefault()
      dispatch(selectCell(cellToId(nextRow + 1, nextCol)))
    }
    else if (!event.shiftKey) {
      switch (event.key) {
        case 'ArrowUp':
          nextRow = Math.max(nextRow - 1, 0)
          break
        case 'ArrowRight':
          ++nextCol
          break
        case 'ArrowDown':
        case 'Enter':
          ++nextRow
          break
        case 'ArrowLeft':
          nextCol = Math.max(nextCol - 1, 0)
          break
        default:
          return
      }
      event.preventDefault()
      dispatch(selectCell(cellToId(nextRow, nextCol)))
    }
  }
}

export default keyboardSelectionHandler
