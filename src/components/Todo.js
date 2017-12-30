import React, { Component } from 'react'
import * as TodoActions from '../Actions/TodoActions'

class Todo extends Component {
  constructor(props) {
    super()
  }

  completeItem() {
    TodoActions.completeItem(this.props.id)
  }

  deleteItem() {
    TodoActions.deleteItem(this.props.id)
  }

  render() {
    const { complete, text } = this.props
    const icon = String(complete) === 'true' ? "\u2714" : "\u2610"
    const deleteIcon = "\u2716"

    //
    // if (edit) {
    //   return (
    //     <li>
    //       <input value={text} focus="focused"/>
    //     </li>
    //   )
    // }

    return (
      <li className='item row' >
      <div className='col-xs-11'>
        <h3 className='list-item' onClick={this.completeItem.bind(this)}><span className={String(this.props.complete)}>{icon}</span> {text} </h3>
        </div>
        <div className='col-xs-1'>
          <button className='delete' onClick={this.deleteItem.bind(this)}>{deleteIcon}</button>
        </div>
      </li>
    )
  }
}

export default Todo
