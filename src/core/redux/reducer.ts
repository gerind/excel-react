import { columnMinWidth, columnWidth, rowHeight, rowMinHeight, TABLE_HEIGHT, TABLE_WIDTH } from '../constants'
import { idToCell, stateContainer } from '../utils'
import initialState from './initialState'
import { ActionType, changeStyleType, changeTextType, resizeTableType, selectCellType, StateType } from './stateInterface'
import { CHANGE_STYLE, CHANGE_TEXT, RESIZE, SELECT_CELL } from './types'

const reducer = (prevState: StateType, action: ActionType): StateType => {
  const state = {...prevState}
  const { payload } = action
  let cont = null,
      id = null,
      style = null,
      text = null
  switch (action.type) {
    case RESIZE:
      const {side, index, delta} = payload as resizeTableType
      cont = stateContainer(state, 'resize', side)
      cont[index] = cont[index] ?? (side === 'column' ? columnWidth : rowHeight)
      cont[index] += delta
      cont[index] = Math.max(cont[index], side === 'column' ? columnMinWidth : rowMinHeight)
      return state

    case CHANGE_STYLE:
      if (payload.id) {
        ({id, style} = payload)
      }
      else {
        ([id, style] = [state.selected, payload])
      }
      cont = stateContainer(state, 'style')
      cont[id] = cont[id] ? ({...cont[id]}) : {}
      Object.entries(style).forEach(([key, value]) => {
        if (value === '') {
          delete cont[id][key]
        }
        else {
          cont[id][key] = value
        }
      })
      return state

    case CHANGE_TEXT:
      if (typeof payload === 'string') {
        ([id, text] = [state.selected, payload])
      }
      else {
        ({id, text} = payload)
      }
      cont = stateContainer(state, 'text')
      cont[id] = text
      return state

    case SELECT_CELL:
      id = typeof payload === 'string' ? payload : payload.id
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
      return initialState()
  }
}

export default reducer
