import { COLUMN_MIN_WIDTH, COLUMN_WIDTH, ROW_HEIGHT, ROW_MIN_HEIGHT, TABLE_HEIGHT, TABLE_WIDTH } from '../constants'
import { ObjectNumberType, ObjectType, StyleObject } from '../types'
import { idToCell, stateContainer } from '../utils'
import { ActionType, CHANGE_STYLE, CHANGE_TEXT, CHANGE_TITLE, RESIZE, SELECT_CELL } from './actions'

export interface StateType {
  title: string
  resize: {
    row: ObjectNumberType<number>
    column: ObjectNumberType<number>
  }
  style: ObjectType<StyleObject>
  text: ObjectType<string>
  selected: string
}

export const reducer = (prevState: StateType, action: ActionType): StateType => {
  const state = {...prevState}
  const { payload } = action
  let cont = null,
      id = null,
      style = null
  switch (action.type) {
    case CHANGE_TITLE:
      if (state.title !== payload) {
        state.title = payload
        return state
      }
      return prevState

    case RESIZE:
      const {side, index, delta} = payload
      cont = stateContainer(state, 'resize', side)
      cont[index] = cont[index] ?? (side === 'column' ? COLUMN_WIDTH : ROW_HEIGHT)
      cont[index] += delta
      cont[index] = Math.max(cont[index], side === 'column' ? COLUMN_MIN_WIDTH : ROW_MIN_HEIGHT)
      return state

    case CHANGE_STYLE:
      id = state.selected
      style = payload
      cont = stateContainer(state, 'style')
      cont[id] = cont[id] ? ({...cont[id]}) : {}
      for (let key in style) {
        if (style[key] === '') {
          delete cont[id][key]
        }
        else {
          cont[id][key] = style[key]
        }
      }
      return state

    case CHANGE_TEXT:
      cont = stateContainer(state, 'text')
      cont[state.selected] = payload
      return state

    case SELECT_CELL:
      id = payload
      if (state.selected === id) {
        return prevState
      }
      const [row, col] = idToCell(id)
      if (row < TABLE_HEIGHT && col < TABLE_WIDTH) {
        state.selected = id
        return state
      }
      return prevState

    default:
      return prevState
  }
}
