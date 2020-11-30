import React, { memo } from 'react'
import { TABLE_HEIGHT, TABLE_WIDTH } from '../../core/constants'
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
        rowCount={TABLE_HEIGHT}
        colCount={TABLE_WIDTH}
      />
    </div>
  )
}

export default memo(Excel)
