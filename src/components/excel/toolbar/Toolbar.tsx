import React from 'react'

const Toolbar: React.FC = () => {

  

  return (
    <div className="excel__toolbar">
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
