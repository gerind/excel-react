import { StateType } from './reducer'

export function initialState(excelName: string): StateType {
  const storageValue = localStorage.getItem(excelName)
  let currentState
  try {
    currentState = storageValue ? JSON.parse(storageValue) : {}
  }
  catch {
    currentState = {}
  }
  return Object.assign(
    {
      title: 'Новая таблица',
      resize: {
        row: {},
        column: {}
      },
      style: {},
      text: {},
      selected: '0:0',
      extract: function() {
        return {
          title: this.title,
          resize: this.resize,
          style: this.style,
          text: this.text
        }
      }
    },
    currentState
  )
}
