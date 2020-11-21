import { columnMinWidth, columnWidth, rowHeight, rowMinHeight } from '../constants'
import { stateContainer } from '../utils'
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
      const cont = stateContainer(state, 'resize', side)
      cont[index] = cont[index] ?? (side === 'column' ? columnWidth : rowHeight)
      cont[index] += delta
      cont[index] = Math.max(cont[index], side === 'column' ? columnMinWidth : rowMinHeight)
      return state
    default:
      return initialState()
  }
}

export default reducer
