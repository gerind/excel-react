import React, { memo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { StyleObject } from '../../../../core/types'
import { mouseDownHandlerResize } from './resize.handler'

interface ResizerProps {
  type: 'row' | 'column'
  index: number
}

const Resizer: React.FC<ResizerProps> = ({type, index}) => {
  const className = type === 'row' ? 'row-resizer' : 'col-resizer'

  const resizerRef = useRef(null)

  const setStyles = (styles: StyleObject) => {
    for (let key in styles) {
      resizerRef.current.style[key] = styles[key]
    }
  }

  const dispatch = useDispatch()

  const handler = mouseDownHandlerResize(type, index, setStyles, dispatch)

  return (
    <div
      ref={resizerRef}
      className={className}
      onMouseDown={handler}
    />
  )
}

export default memo(Resizer)
