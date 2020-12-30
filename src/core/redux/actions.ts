import { StyleObject } from '../types'

export interface ActionType {
  type: number,
  payload: any
}

export const CHANGE_TITLE = 0
export const RESIZE = 1
export const CHANGE_STYLE = 2
export const CHANGE_TEXT = 3
export const SELECT_CELL = 4

/* changeTitle */
export interface changeTitleAction {
  type: typeof CHANGE_TITLE
  payload: string
}

export function changeTitle(payload: string) {
  return {
    type: CHANGE_TITLE,
    payload
  }
}

/* resizeTable */
export interface resizeTablePayload {
  side: 'row' | 'column'
  index: number
  delta: number
}

export interface resizeTableAction {
  type: typeof RESIZE
  payload: resizeTablePayload
}

export function resizeTable(payload: resizeTablePayload) {
  return {
    type: RESIZE,
    payload
  }
}

/* changeStyle */
export interface changeStyleAction {
  type: typeof CHANGE_STYLE
  payload: StyleObject
}

export function changeStyle(payload: StyleObject) {
  return {
    type: CHANGE_STYLE,
    payload
  }
}

/* changeText */
export interface changeTextAction {
  type: typeof CHANGE_TEXT
  payload: string
}

export function changeText(payload: string) {
  return {
    type: CHANGE_TEXT,
    payload
  }
}

/* selectCell */
export interface selectCellAction {
  type: typeof SELECT_CELL
  payload: string
}

export function selectCell(payload: string) {
  return {
    type: SELECT_CELL,
    payload
  }
}

