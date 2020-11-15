import React, { useEffect, useState } from 'react'
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
      <Table />
    </div>
  )
}

export default React.memo(Excel)
