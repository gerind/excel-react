import React from 'react'

const Table: React.FC = () => {

  return (
    <div className="excel__table">
      <div className="row">
        <div className="info">

        </div>
        <div className="column">
          A
        </div>
        <div className="column">
          B
        </div>
      </div>
      <div className="row">
        <div className="info">
          1
        </div>
        <div className="cell">
          some text A1
        </div>
        <div className="cell">
          some text B1
        </div>
      </div>
    </div>
  )
}

export default Table
