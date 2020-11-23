import React, { useEffect, useRef } from 'react'
import { preventDefault } from '../../../core/utils'

const Toolbar: React.FC = () => {

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    el.addEventListener('selectstart', preventDefault)
    return () => el.removeEventListener('selectstart', preventDefault)
  }, [])

  return (
    <div className="excel__toolbar" ref={rootRef}>
      <button><span className="material-icons">format_align_left</span></button>
      <button><span className="material-icons">format_align_center</span></button>
      <button><span className="material-icons">format_align_right</span></button>
      <button><span className="material-icons">format_bold</span></button>
      <button><span className="material-icons">format_italic</span></button>
      <button><span className="material-icons">format_underlined</span></button>
    </div>
  )
}

export default Toolbar
