import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { mouseDownHandler } from './resize.handler'

interface ResizerProps {
  type: 'row' | 'column'
  index: number
}

const Resizer: React.FC<ResizerProps> = ({type, index}) => {
  const className = type === 'row' ? 'row-resizer' : 'col-resizer'
  const [styles, setStyles] = useState({})
  const dispatch = useDispatch()

  const handler = useMemo(() =>
    mouseDownHandler(type, index, setStyles, dispatch), [type, index])

  return (
    <div
      className={className}
      style={styles}
      onMouseDown={handler}
    />
  )
}

export default Resizer
