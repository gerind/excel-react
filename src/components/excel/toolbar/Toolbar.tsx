import React, { memo, useCallback, useReducer, useRef } from 'react'
import { preventDefault, usePreventSelectStart } from '../../../core/utils'
import Button from './Button'
import { getModel, ToolbarItem } from './toolbar.model'
import _ from 'lodash'
import emitter from '../../../core/emitter'

const reducer = (state: ToolbarItem[]): ToolbarItem[] => [...state]

const Toolbar: React.FC = () => {

  const rootRef = useRef<HTMLDivElement>(null)
  usePreventSelectStart(rootRef)

  const [state, changeState] = useReducer(reducer, null, () => getModel())

  const toggle = useCallback((icon) => {
    const but = _.find(state, {icon})
    but.active = !but.active
    let styles = {...but.styles}
    if (!but.active) {
      Object.keys(styles).forEach(key => styles[key] = '')
    }
    emitter.emit('toolbar:change', {styles} )
    
    changeState()
  }, [state])

  return (
    <div
      className="excel__toolbar"
      ref={rootRef}
      onMouseDown={preventDefault}
    >
      {
        state.map((but, ind) => (
          <Button
            key={ind}
            active={but.active}
            icon={but.icon}
            styles={but.styles}
            toggle={toggle}
          />
        ))
      }
    </div>
  )
}

export default memo(Toolbar)
