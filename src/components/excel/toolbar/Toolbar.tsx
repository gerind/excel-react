import React, { memo, useRef } from 'react'
import { generateArrayFromObject, preventDefault, usePreventSelectStart } from '../../../core/utils'
import Button from './Button'
import { getModel } from './toolbar.model'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/reducer'
import { changeStyle } from '../../../core/redux/actions'

const Toolbar: React.FC = () => {

  const rootRef = useRef<HTMLDivElement>(null)
  usePreventSelectStart(rootRef)

  const dispatch = useDispatch()

  const styles = useSelector((state: StateType) => state.style[state.selected] ?? {})

  const state = getModel(styles)
  
  function toggle(icon: string) {
    const but = state[icon]
    but.active = !but.active
    let styles = {...but.styles}
    if (!but.active && !but.group) {
      for (let key in styles) {
        styles[key] = ''
      }
    }
    dispatch(changeStyle(styles))
  }

  return (
    <div
      className="excel__toolbar"
      ref={rootRef}
      onMouseDown={preventDefault}
    >
      {
        generateArrayFromObject((icon, but) => (
          <Button
            key={icon}
            active={but.active}
            icon={icon}
            styles={but.styles}
            toggle={toggle}
          />
        ), state)
      }
    </div>
  )
}

export default memo(Toolbar)
