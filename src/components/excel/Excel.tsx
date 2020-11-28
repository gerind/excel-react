import React, { memo } from 'react'
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
        rowCount={52}
        colCount={52}
      />
    </div>
  )
}

export default memo(Excel)
