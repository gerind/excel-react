import { columnMinWidth, columnWidth } from '../constants'
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
      if (side === 'column') {
        state.resize = {...state.resize}
        state.resize.column = {...state.resize.column}
        state.resize.column[index] = state.resize.column[index] ?? columnWidth
        state.resize.column[index] += delta
        state.resize.column[index] = Math.max(state.resize.column[index], columnMinWidth)
      }
      else {

      }
      return state
    default:
      return initialState()
  }
}

export default reducer
