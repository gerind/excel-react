import React from 'react'
import Formula from './formula/Formula'
import Header from './header/Header'
import Table from './table/Table'
import Toolbar from './toolbar/Toolbar'

const Excel: React.FC = () => {

  return (
    <div className="excel">
      <Header />
      <Toolbar />
      <Formula />
      <Table
        rowCount={53}
        colCount={53}
      />
    </div>
  )
}

export default Excel
