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
    const { complete, edit, text } = this.props

    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      )
    }

    return (
      <li className='item' >
        <h3 className='list-item' onClick={this.completeItem.bind(this)}><span className={String(this.props.complete)}>{icon}</span> {text} <span><button className='delete' onClick={this.deleteItem.bind(this)}>delete</button></span></h3>

      </li>
    )
  }
}

export default Todo
