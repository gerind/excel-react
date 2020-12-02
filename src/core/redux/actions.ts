import { ActionType, changeStyleType, changeTextType, resizeTableType, selectCellType } from './stateInterface'
import { CHANGE_STYLE, CHANGE_TEXT, RESIZE, SELECT_CELL } from './types'

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

export function changeText(payload: changeTextType): ActionType {
  return {
    type: CHANGE_TEXT,
    payload
  }
}

export function selectCell(payload: selectCellType): ActionType {
  return {
    type: SELECT_CELL,
    payload
  }
}
