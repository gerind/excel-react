import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resizeTable } from '../../../../core/redux/actions'
import { addEventListeners, debounce, preventDefault, removeEventListeners } from '../../../../core/utils'

interface ResizerProps {
  type: 'row' | 'column'
  index: number
}

const Resizer: React.FC<ResizerProps> = ({type, index}) => {
  const className = type === 'row' ? 'row-resizer' : 'col-resizer'
  const [styles, setStyles] = useState({})
  const dispatch = useDispatch()

  const mouseDownHandler = type === 'column'
      ? (downEvent: React.MouseEvent) => {
          const windowHeight = window.innerHeight
          setStyles({bottom: `-${windowHeight}px`, opacity: 1})
          const prevX = downEvent.clientX
          const mouseMoveHandler = debounce((moveEvent: MouseEvent) => {
            const newX = moveEvent.clientX
            setStyles(styles => ({
              ...styles,
              transform: `translate(${newX - prevX}px, 0)`
            }))
          }, 50)
          const mouseUpHandler = (upEvent: MouseEvent) => {
            const newX = upEvent.clientX
            setStyles({})

            dispatch(resizeTable({
              side: 'column',
              index,
              delta: newX - prevX
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
      : (downEvent: React.MouseEvent) => {
        const windowWidth = window.innerWidth
        setStyles({right: `-${windowWidth}px`, opacity: 1})
        const prevY = downEvent.clientY
        const mouseMoveHandler = debounce((moveEvent: MouseEvent) => {
          const newY = moveEvent.clientY
          setStyles(styles => ({
            ...styles,
            transform: `translate(0, ${newY - prevY}px)`
          }))
        }, 50)
        const mouseUpHandler = (upEvent: MouseEvent) => {
          const newY = upEvent.clientY
          setStyles({})

          dispatch(resizeTable({
            side: 'row',
            index,
            delta: newY - prevY
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

  return (
    <div
      className={className}
      style={styles}
      onMouseDown={mouseDownHandler}
    />
  )
}

export default Resizer
