import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTitle } from '../../../core/redux/actions'
import { StateType } from '../../../core/redux/reducer'
import { getInnerText, usePreventSelectStart } from '../../../core/utils'

const Header: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  usePreventSelectStart(rootRef)
  
  const dispatch = useDispatch()

  const titleText = useSelector((state: StateType) => state.title)

  return (
    <div
      className="excel__header"
      ref={rootRef}>
      <div
        className="title">
        <input
          type="text"
          placeholder="Название таблицы"
          value={titleText}
          onChange={e => {
            dispatch(changeTitle(getInnerText(e.target)))
          }}
        />
      </div>
      <div
        className="control">
        <button>
          <span
            className="material-icons">
            delete_forever
          </span>
        </button>
        <button>
          <span
            className="material-icons">
            exit_to_app
          </span>
        </button>
      </div>
    </div>
  )
}

export default Header
