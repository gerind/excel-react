import React from 'react'
import emitter from '../../../core/emitter'
import { selectCell } from '../../../core/redux/actions'
import { styleObject } from '../../../core/scriptTypes'
import { cellToId, getInnerText, replaceCaret } from '../../../core/utils'
import keyboardSelectionHandler from './selection/keyboardSelectionHandler'
import { TableContext } from './TableContext'

interface CellProps {
  rowIndex: number
  colIndex: number
}

class Cell extends React.PureComponent<CellProps> {

  private readonly thisCellRef = React.createRef<HTMLDivElement>()
  private readonly handler = keyboardSelectionHandler(this.props.rowIndex, this.props.colIndex, this.context.dispatch)
  
  public state = {
    selected: this.context.initial.nowSelected === cellToId(this.props.rowIndex, this.props.colIndex) ? 'selected' : '',
    currentText: '',
    styles: {
      width: this.context.initial.columnResize[this.props.colIndex] + 'px'
    }
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
    this.setState({
      currentText: newText
    })
  }

  changeStyle(styles: styleObject) {
    this.setState((state: any) => ({
      styles: {
        ...state.styles, ...styles
      }
    }))
  }

  focus() {
    this.thisCellRef.current.focus()
  }

  componentDidMount() {
    const cellsRef = this.context.cellsRef
    const {rowIndex, colIndex} = this.props
    cellsRef[rowIndex] = cellsRef[rowIndex] ?? {}
    cellsRef[rowIndex][colIndex] = this
  }

  render() {

    return (
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={this.thisCellRef}
        className={`cell ${this.state.selected}`}
        style={this.state.styles}
        onMouseDown={() => {
          this.context.dispatch(selectCell({
            id: cellToId(this.props.rowIndex, this.props.colIndex)
          }))
        }}
        onKeyDown={this.handler}
        onInput={e => {
          emitter.emit('table:input', { target: e.target })
        }}
        onBlur={e => {
          this.setState({
            currentText: getInnerText(e.target)
          })
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

Cell.contextType = TableContext

export default Cell
