import { ActionType, changeStyleType, resizeTableType, selectCellType } from './stateInterface'
import { CHANGE_STYLE, RESIZE, SELECT_CELL } from './types'

export function resizeTable(payload: resizeTableType): ActionType {
  return {
    type: RESIZE,
    payload
  }
}

export function changeStyle(payload: changeStyleType): ActionType {
  return {
    type: CHANGE_STYLE,
    payload
  }
}

export function selectCell(payload: selectCellType): ActionType {
  return {
    type: SELECT_CELL,
    payload
  }
}
