import React from 'react'
import { changeText, selectCell } from '../../../core/redux/excel/excelActions'
import { StyleObject } from '../../../core/scriptTypes'
import { cellToId, getInnerText, replaceCaret } from '../../../core/utils'
import keyboardSelectionHandler from './selection/keyboardSelectionHandler'
import { TableContext } from './TableContext'

interface CellProps {
  rowIndex: number
  colIndex: number
}

class Cell extends React.PureComponent<CellProps> {
  public static readonly contextType = TableContext
  public readonly context: React.ContextType<typeof TableContext>

  private readonly thisCellRef = React.createRef<HTMLDivElement>()
  private readonly handler = keyboardSelectionHandler(this.props.rowIndex, this.props.colIndex, this.context.dispatch)
  private readonly cellId = cellToId(this.props.rowIndex, this.props.colIndex)

  public readonly state = {
    selected: this.context.initial.nowSelected === this.cellId ? 'selected' : '',
    currentText: this.context.initial.stateText[this.cellId] ?? '',
    styles: this.context.initial.stateStyle[this.cellId] ?? {},
    width: this.context.initial.columnResize[this.props.colIndex]
  }

  constructor(props: CellProps, context: typeof TableContext) {
    super(props, context)

    const cellsRef = this.context.cellsRef
    const {rowIndex, colIndex} = this.props
    cellsRef[rowIndex] = cellsRef[rowIndex] ?? {}
    cellsRef[rowIndex][colIndex] = this
  }

  unselect() {
    this.setState({
      selected: ''
    })
  }

  select() {
    this.thisCellRef.current.focus()
    this.setState({
      selected: 'selected'
    })
  }

  changeText(newText: string) {
    if (document.activeElement !== this.thisCellRef.current
      && this.state.currentText !== newText) {
      this.setState({
        currentText: newText
      })
    }
  }

  changeStyle(styles: StyleObject) {
    if (styles !== this.state.styles) {
      this.setState({styles})
    }
  }

  changeWidth(newWidth: number) {
    this.setState((state: any) => ({
      width: newWidth
    }))
  }

  focus() {
    this.thisCellRef.current.focus()
  }

  render() {

    return (
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={this.thisCellRef}
        className={`cell ${this.state.selected}`}
        style={{...this.state.styles, width: this.state.width + 'px'}}
        onMouseDown={() => {
          this.context.dispatch(selectCell(cellToId(this.props.rowIndex, this.props.colIndex)))
        }}
        onKeyDown={ e => this.handler(e) }
        onInput={e => {
          this.context.dispatch(changeText(getInnerText(e.target)))
        }}
        onFocus={() => {
          replaceCaret(this.thisCellRef.current)
        }}
      >
        {this.state.currentText}
      </div>
    )
  }
}

export default Cell
