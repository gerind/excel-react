import { columnMinWidth, columnWidth, rowHeight, rowMinHeight } from '../constants'
import initialState from './initialState'
import { ActionType, StateType } from './stateInterface'
import { RESIZE } from './types'

const reducer = (prevState: StateType, action: ActionType): StateType => {
  const state = {...prevState}
  const { payload } = action
  console.log('Reducer,', prevState, action)
  switch (action.type) {
    case RESIZE:
      const {side, index, delta} = payload
      state.resize = {...state.resize}
      if (side === 'column') {
        state.resize.column = {...state.resize.column}
        state.resize.column[index] = state.resize.column[index] ?? columnWidth
        state.resize.column[index] += delta
        state.resize.column[index] = Math.max(state.resize.column[index], columnMinWidth)
      }
      else {
        state.resize.row = {...state.resize.row}
        state.resize.row[index] = state.resize.row[index] ?? rowHeight
        state.resize.row[index] += delta
        state.resize.row[index] = Math.max(state.resize.row[index], rowMinHeight)
      }
      return state
    default:
      return initialState()
  }
}

export default reducer
