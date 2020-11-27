import { StateType } from './stateInterface';

export default function initialState(): StateType {
  return {
    resize: {
      row: {}, // index: height
      column: {} // index: width
    },
    style: {}
  }
}
