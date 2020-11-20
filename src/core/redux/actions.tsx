import { ActionType, resizeTablePayloadType } from './stateInterface'
import { RESIZE } from './types'

export function resizeTable(payload: resizeTablePayloadType): ActionType {
  return {
    type: RESIZE,
    payload
  }
}
