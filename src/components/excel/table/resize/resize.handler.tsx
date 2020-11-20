import { resizeTable } from '../../../../core/redux/actions'
import { addEventListeners, debounce, preventDefault, removeEventListeners } from '../../../../core/utils'

export function mouseDownHandler(type: 'row' | 'column', index: number, setStyles: Function, dispatch: Function) {
  return (downEvent: React.MouseEvent) => {
    const isColumn = type === 'column'
    const windowSize = window[isColumn ? 'innerHeight' : 'innerWidth']
    const coordName = isColumn ? 'clientX' : 'clientY'
    setStyles({[isColumn ? 'bottom' : 'right']: `-${windowSize}px`, opacity: 1})
    const prevCoord = downEvent[coordName]
    const mouseMoveHandler = debounce((moveEvent: MouseEvent) => {
      const newCoord = moveEvent[coordName]
      setStyles({
        transform: isColumn
            ? `translate(${newCoord - prevCoord}px, 0)`
            : `translate(0, ${newCoord - prevCoord}px)`
      })
    }, 33)
    const mouseUpHandler = (upEvent: MouseEvent) => {
      const newCoord = upEvent[coordName]
      setStyles({
        [isColumn ? 'bottom' : 'right']: '',
        opacity: '',
        transform: ''
      })

      dispatch(resizeTable({
        side: type,
        index,
        delta: newCoord - prevCoord
      }))

      removeEventListeners(document, {
        'selectstart': preventDefault,
        'mousemove': mouseMoveHandler,
        'mouseup': mouseUpHandler
      })
    }
    addEventListeners(document, {
      'selectstart': preventDefault,
      'mousemove': mouseMoveHandler,
      'mouseup': mouseUpHandler
    })
  }
}
