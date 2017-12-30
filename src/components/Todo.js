import React, { Component } from 'react'
import * as TodoActions from '../Actions/TodoActions'
import TodoStore from '../stores/todostores'

class Todo extends Component {
  constructor(props) {
    super()
    this.arr = [1, 2, 3, 4, 5]
  }

  completeItem() {
    TodoActions.completeItem(this.props.id)
  }

  deleteItem() {
    TodoActions.deleteItem(this.props.id)
  }

  moveUp(item, index) {
    TodoActions.moveUp(item, index)
  }

  onMoveUp() {
    let item
    let index
    for (let i = 0; i < TodoStore.todos.length; i++) {
      if (TodoStore.todos[i].id === this.props.id) {
        item = TodoStore.todos[i]
        index = i
      }
    }
    this.moveUp(item, index)
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
      <div className='col-xs-10'>
        <h3 className='list-item' onClick={this.completeItem.bind(this)}><span className={String(this.props.complete)}>{icon}</span> {text} </h3>
        </div>
        <div className='col-xs-1'>
          <button className='up' onClick={this.onMoveUp.bind(this)}>^</button>
        </div>
        <div className='col-xs-1'>
          <button className='delete' onClick={this.deleteItem.bind(this)}>{deleteIcon}</button>
        </div>
      </li>
    )
  }
}

export default Todo
