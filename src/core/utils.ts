import React, { MutableRefObject, useEffect } from 'react'
import { CODES } from './constants'
import { ObjectType } from './types'

export function preventDefault(event: Event | React.BaseSyntheticEvent) {
  event.preventDefault()
}

export function usePreventDefaultEvent(target: EventTarget | MutableRefObject<EventTarget>, evtname: string) {
  useEffect(() => {
    const el = target instanceof EventTarget ? target : target.current
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

export function debounce<T extends Function>(fn: T, ms?: number): T {
  let canBeCalled = true
  if (typeof ms !== 'number') {
    return function(...args: any[]) {
      if (canBeCalled) {
        fn(...args)
        requestAnimationFrame(() => {
          canBeCalled = true
        })
        canBeCalled = false
      }
    } as unknown as T
  }
  return function(...args: any[]) {
    if (canBeCalled) {
      fn(...args)
      setTimeout(() => {
        canBeCalled = true
      }, ms)
      canBeCalled = false
    }
  } as unknown as T
}

export function addEventListeners(element: EventTarget, listeners: ObjectType<EventListenerOrEventListenerObject>) {
  Object.entries(listeners).forEach(entry => element.addEventListener(...entry))
}

export function removeEventListeners(element: EventTarget, listeners: ObjectType<EventListenerOrEventListenerObject>) {
  Object.entries(listeners).forEach(entry => element.removeEventListener(...entry))
}

export function stateContainer(obj: ObjectType, ...props: (string | number)[] ) {
  return props.reduce((acc, prop) => {
    acc[prop] = {...acc[prop]}
    return acc[prop]
  }, obj)
}

export function getInnerText(element: any) {
  return element.value ?? element.textContent
}

export function replaceCaret(el: HTMLElement) {
  const text = el.firstChild
  if (text === null) {
    return
  }
  const range = document.createRange()
  range.setStart(text, text.nodeValue.length)
  range.collapse(true)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

export function cellToId(row: number, col: number): string {
  return `${row}:${col}`
}

export function idToCell(id: string): number[] {
  return id.split(':').map(x => +x)
}

export function generateArray<T>(callback: (index: number) => T, length: number): T[] {
  const array: T[] = new Array(length)
  for (let i = 0; i < length; ++i) {
    array[i] = callback(i)
  }
  return array
}

export function generateArrayFromObject<T, K>(callback: (key: string, value: K, object: ObjectType<K>) => T, object: ObjectType<K>): T[] {
  const array: T[] = []
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      array.push(callback(key, object[key], object))
    }
  }
  return array
}
