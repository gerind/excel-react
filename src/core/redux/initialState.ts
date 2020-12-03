import { StateType } from './stateInterface'

export default function initialState(): StateType {
  const currentState = {}
  return Object.assign(
    {
      title: 'Новая таблица',
      resize: {
        row: {}, // index: height
        column: {} // index: width
      },
      style: {},
      text: {},
      selected: '0:0'
    },
    currentState
  )
}
