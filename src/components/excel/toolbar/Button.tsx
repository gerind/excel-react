import React from 'react'
import { ToolbarItem } from './toolbar.model'

interface ButtonProps extends ToolbarItem {
  icon: string
  toggle: Function
}

const Button: React.FC<ButtonProps> = ({active, icon, styles, toggle}) => {

  return (
    <button
      className={active ? 'active' : ''}
      onClick={() => {
        toggle(icon)
      }}
    >
      <span className='material-icons'>
        {icon}
      </span>
    </button>
  )
}

export default Button
