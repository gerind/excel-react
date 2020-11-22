import React from 'react'

function keyboardSelectionHandler(row: number, col: number, changeSelected: Function) {
  return function(event: React.KeyboardEvent) {
    let nextRow = row, nextCol = col
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
    changeSelected(nextRow, nextCol)
  }
}

export default keyboardSelectionHandler
