import React from 'react'
import emitter from '../../../../core/emitter'

function keyboardSelectionHandler(row: number, col: number, changeSelected: Function) {
  return function(event: React.KeyboardEvent) {
    let nextRow = row, nextCol = col
    if (event.key === 'Tab' && event.shiftKey) {
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
      changeSelected(nextRow, nextCol, true)
    }
  }
}

export default keyboardSelectionHandler
