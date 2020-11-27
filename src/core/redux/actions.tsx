import { ActionType, changeStyleType, resizeTableType } from './stateInterface'
import { CHANGE_STYLE, RESIZE } from './types'

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
