import React, { memo, useCallback, useReducer, useRef } from 'react'
import { preventDefault, usePreventSelectStart } from '../../../core/utils'
import Button from './Button'
import { getModel, ToolbarModel } from './toolbar.model'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../../../core/redux/excel/excelStateInterface'
import { changeStyle } from '../../../core/redux/excel/excelActions'

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
      Object.keys(styles).forEach(key => styles[key] = '')
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
        Object.entries(state).map(([icon, but]) => (
          <Button
            key={icon}
            active={but.active}
            icon={icon}
            styles={but.styles}
            toggle={toggle}
          />
        ))
      }
    </div>
  )
}

export default memo(Toolbar)
