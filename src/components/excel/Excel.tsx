import React from 'react'
import Formula from './formula/Formula'
import Header from './header/Header'
import Table from './table/Table'
import Toolbar from './toolbar/Toolbar'

const Excel: React.FC = () => {

  return (
    <div className="excel" spellCheck={false} >
      <Header />
      <Toolbar />
      <Formula />
      <Table
        rowCount={40}
        colCount={32}
      />
    </div>
  )
}

export default Excel
