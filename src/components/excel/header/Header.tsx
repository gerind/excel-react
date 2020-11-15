import React from 'react'

const Header: React.FC = () => {

  return (
    <div className="excel__header">
      <div className="title">
        <input type="text" defaultValue="Название таблицы" placeholder="Название таблицы" />
      </div>
      <div className="control">
        <button><span className="material-icons">delete_forever</span></button>
        <button><span className="material-icons">exit_to_app</span></button>
      </div>
    </div>
  )
}

export default Header
