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

export function debounce(fn: Function, ms: number) {
  let canBeCalled: boolean = true
  return function(...args: any[]) {
    if (canBeCalled) {
      fn(...args)
      canBeCalled = false
      setTimeout(() => {
        canBeCalled = true
      }, ms)
    }
  }
}

export function addEventListeners(element: EventTarget, listeners: {[key: string]: (event?: Event) => any}) {
  Object.entries(listeners).forEach(entry => element.addEventListener(...entry))
}

export function removeEventListeners(element: EventTarget, listeners: {[key: string]: (event?: Event) => any}) {
  Object.entries(listeners).forEach(entry => element.removeEventListener(...entry))
}

export function stateContainer(obj: {[key: string]: any}, ...props: (string | number)[] ) {
  return props.reduce((acc, prop) => {
    acc[prop] = {...acc[prop]}
    return acc[prop]
  }, obj)
}

