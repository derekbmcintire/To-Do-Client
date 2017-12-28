import React, { Component } from 'react'
import * as TodoActions from '../Actions/TodoActions'

class Todo extends Component {
  constructor(props) {
    super()
  }

  completeItem() {
    TodoActions.completeItem(this.props.id)
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
      <li className='item' onClick={this.completeItem.bind(this)}>
        <h3><span className='icon'>{icon}</span> {text}</h3>
      </li>
    )
  }
}

export default Todo
