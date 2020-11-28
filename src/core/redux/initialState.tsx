import { storage } from '../utils';
import { StateType } from './stateInterface';

export default function initialState(): StateType {
  const currentState = storage('excel')
  return Object.assign(
    {
      resize: {
        row: {}, // index: height
        column: {} // index: width
      },
      style: {},
      selected: '0:0'
    },
    currentState
  )
}
