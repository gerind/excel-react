import React, { MutableRefObject, useEffect } from 'react'
import { CODES } from './constants'
import _ from 'lodash'

export function preventDefault(event: Event | React.BaseSyntheticEvent): void {
  event.preventDefault()
}

export function usePreventDefaultEvent(target: EventTarget | MutableRefObject<EventTarget>, evtname: string) {
  useEffect(() => {
    const el: EventTarget = target instanceof EventTarget ? target : target.current
    el.addEventListener(evtname, preventDefault)
    return () => el.removeEventListener(evtname, preventDefault)
  }, [])
}

export function usePreventDragStart(target: EventTarget | MutableRefObject<EventTarget>) {
  usePreventDefaultEvent(target, 'dragstart')
}

export function usePreventSelectStart(target: EventTarget | MutableRefObject<EventTarget>) {
  usePreventDefaultEvent(target, 'selectstart')
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

export function debounce<T extends Function>(fn: T, ms: number): T {
  let canBeCalled: boolean = true
  return function(...args: any[]) {
    if (canBeCalled) {
      fn(...args)
      canBeCalled = false
      setTimeout(() => {
        canBeCalled = true
      }, ms)
    }
  } as unknown as T
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

export function getInnerText(element: any) {
  return element.value ?? element.textContent
}

export function replaceCaret(el: HTMLElement) {
  const text = el.firstChild as any
  if (text === null) {
    return
  }
  const range = document.createRange()
  range.setStart(text, text.length)
  range.collapse(true)

  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)

}

export function fullCopy<T>(data: T): T {
  return _.cloneDeep(data)
}

export function cellToId(row: number, col: number): string {
  return `${row}:${col}`
}

export function idToCell(id: string): number[] {
  return id.split(':').map(x => +x)
}
