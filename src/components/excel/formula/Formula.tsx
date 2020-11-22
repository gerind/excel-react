import React from 'react'

const Formula: React.FC = () => {

  return (
    <div className="excel__formula">
      <div className="fx">fx</div>
      <div className="formula" contentEditable={true}></div>
    </div>
  )
}

export default Formula
