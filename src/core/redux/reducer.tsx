import { columnMinWidth, columnWidth, rowHeight, rowMinHeight, TABLE_HEIGHT, TABLE_WIDTH } from '../constants'
import { idToCell, stateContainer } from '../utils'
import initialState from './initialState'
import { ActionType, changeStyleType, resizeTableType, selectCellType, StateType } from './stateInterface'
import { CHANGE_STYLE, RESIZE, SELECT_CELL } from './types'

const reducer = (prevState: StateType, action: ActionType): StateType => {
  const state = {...prevState}
  const { payload } = action
  let cont = null,
      id = null,
      style = null
  console.log('Reducer,', prevState, action)
  switch (action.type) {
    case RESIZE:
      const {side, index, delta} = payload as resizeTableType
      cont = stateContainer(state, 'resize', side)
      cont[index] = cont[index] ?? (side === 'column' ? columnWidth : rowHeight)
      cont[index] += delta
      cont[index] = Math.max(cont[index], side === 'column' ? columnMinWidth : rowMinHeight)
      return state
    case CHANGE_STYLE:
      ({id, style} = payload as changeStyleType)
      cont = stateContainer(state, 'style')
      cont[id] = cont[id] ?? {}
      Object.entries(style).forEach(([key, value]) => {
        if (value === '') {
          delete cont[id][key]
        }
        else {
          cont[id][key] = value
        }
      })
      return state
    case SELECT_CELL:
      if (state.selected === payload.id) {
        return prevState
      }
      const [row, col] = idToCell(payload.id)
      if (row < TABLE_HEIGHT && col < TABLE_WIDTH) {
        state.selected = payload.id
        return state
      }
      return prevState
    default:
      return initialState()
  }
}

export default reducer
