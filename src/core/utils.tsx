import { CODES } from './constants'

export function preventDefault(event: Event): void {
  event.preventDefault()
}

//colIndex >= 0
function* columnNameGenerator(colIndex: number): Generator<number, void, void> {
  while (colIndex >= CODES.SIZE) {
    yield colIndex % CODES.SIZE
    colIndex = Math.floor(colIndex / CODES.SIZE) - 1
  }
  yield colIndex
}

export function getColumnName(colIndex: number): string {
  return String.fromCharCode(
    ...[...columnNameGenerator(colIndex)]
        .reverse()
        .map(index => CODES.A + index)
  )
}
