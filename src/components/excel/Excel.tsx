import React, { memo, useMemo } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { TABLE_HEIGHT, TABLE_WIDTH } from '../../core/constants'
import excelReducer from '../../core/redux/excel/excelReducer'
import { initialExcelState, saveExcelState } from '../../core/redux/excel/initialExcelState'
import StateSaver from '../../core/redux/StateSaver'
import Formula from './formula/Formula'
import Header from './header/Header'
import { Table } from './table/Table'
import Toolbar from './toolbar/Toolbar'

interface ExcelProps {
  excelName: string
}

const Excel: React.FC<ExcelProps> = ({excelName}) => {

  const store = useMemo(() => {
    return createStore(excelReducer, initialExcelState(excelName))
  }, [])

  return (
    <Provider store={store}>
      <StateSaver name={excelName} fn={saveExcelState} />
      <div className="excel" spellCheck={false} >
        <Header />
        <Toolbar />
        <Formula />
        <Table
          rowCount={TABLE_HEIGHT}
          colCount={TABLE_WIDTH}
        />
      </div>
    </Provider>
  )
}

export default memo(Excel)
