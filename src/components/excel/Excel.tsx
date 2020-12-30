import React, { memo } from 'react'
import { TABLE_HEIGHT, TABLE_WIDTH } from '../../core/constants'
import StateSaver from '../../core/redux/StateSaver'
import Formula from './formula/Formula'
import Header from './header/Header'
import { Table } from './table/Table'
import Toolbar from './toolbar/Toolbar'

interface ExcelProps {
  excelName: string
}

const Excel: React.FC<ExcelProps> = ({excelName}) => {


  return (
    <>
      <StateSaver name={excelName} />
      <div className="excel" spellCheck={false} >
        <Header />
        <Toolbar />
        <Formula />
        <Table
          rowCount={TABLE_HEIGHT}
          colCount={TABLE_WIDTH}
        />
      </div>
    </>
  )
}

export default memo(Excel)
