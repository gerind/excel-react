import React from 'react'
import { Dispatch } from 'redux'
import emitter from '../../../../core/emitter'
import { selectCell } from '../../../../core/redux/actions'
import { cellToId } from '../../../../core/utils'

function keyboardSelectionHandler(row: number, col: number, dispatch: Dispatch) {
  return function(event: React.KeyboardEvent) {
    let nextRow = row, nextCol = col
    if ((event.key === 'Tab' || event.key === 'Enter') && event.shiftKey) {
      event.preventDefault()
      emitter.emit('table:tab')
      return
    }
    if (!event.shiftKey) {
      switch (event.key) {
        case 'ArrowUp':
          nextRow = Math.max(nextRow - 1, 0)
          break
        case 'ArrowRight':
        case 'Tab':
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
      dispatch(selectCell({
        id: cellToId(nextRow, nextCol)
      }))
    }
  }
}

export default keyboardSelectionHandler
