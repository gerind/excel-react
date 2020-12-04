import { StateType } from './excelStateInterface'

export function initialExcelState(excelName: string): StateType {
  const storageValue = localStorage.getItem(excelName)
  const currentState = storageValue ? JSON.parse(storageValue) : {}
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

export function saveExcelState(state: StateType) {
  return {
    title: state.title,
    resize: state.resize,
    style: state.style,
    text: state.text
  }
}
