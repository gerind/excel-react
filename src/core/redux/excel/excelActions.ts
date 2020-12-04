import { ActionType, changeStyleType, changeTextType, changeTitleType, resizeTableType, selectCellType } from './excelStateInterface'
import { CHANGE_STYLE, CHANGE_TEXT, CHANGE_TITLE, RESIZE, SELECT_CELL } from './excelTypes'

export function changeTitle(payload: changeTitleType): ActionType {
  return {
    type: CHANGE_TITLE,
    payload
  }
}

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
