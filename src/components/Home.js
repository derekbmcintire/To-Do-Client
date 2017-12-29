import React, { Component } from 'react'
import Todo from './Todo'
// using * as creates an object with all exports
import * as TodoActions from '../Actions/TodoActions'
import TodoStore from '../stores/todostores'
import UserStore from '../stores/userstores'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const $ = require('jquery')

class Home extends Component {
  // sets initial state of Home
  constructor() {
    super()
    // prevents memory leak by binding getTodos function to current
    // instance of this component
    this.getTodos = this.getTodos.bind(this)
    this.state = {
      // sets todos to the getAll function in TodoStore, which returns all
      // current todos
      todos: TodoStore.getAll()
    }
  }

  // this happens once on page load and not again, so it's the best place to add
  // event listeners
  componentWillMount() {
    // listens for a change event to be emitted and sets state
    TodoStore.on('change', this.getTodos)
    this.user = UserStore.user
    console.log(this.user)
  }

  componentDidMount() {
    if (this.user.username === null) {
      $('#welcome').hide()
    } else {
      $('#welcome').show()
    }
  }

  // removes event listener to prevent memory leak
  componentWillUnmount() {
    TodoStore.removeListener('change', this.getTodos)
  }

  // gets all current list items
  getTodos() {
      this.setState({
        todos: TodoStore.getAll()
      })
  }

  // sendNewItem(data) {
  //     return $.ajax({
  //       url: 'localhost:4741/todos',
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Token token=' + this.user.token
  //       },
  //       data
  //     })
  // }

  createToDo(e) {
    e.preventDefault()
    const item = document.getElementById('new-do').value
    TodoActions.createToDo(item)
    document.getElementById('new-do').value = ''
  }

  render() {
    // sets this object to the current state
    // ?I am not sure why todos needs to be wrapped in braces
    // since this.state is already an object
    const {todos} = this.state

      // map through all the current todos and return a new
      // Todo component
      // set the key to the current todo id
      // ?use the ES6 spread operator to pass an object of props
      const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo} />
      })
      return (
        <div className='todo'>
          <form className='add-form' onSubmit={this.createToDo.bind(this)}>
            <input className='form-control form-control-lg add' id='new-do' />
            <button type='submit' className='btn btn-outline-success add-item add'>Add item</button>
          </form>
          <input className='list-title form-control form-control-lg' placeholder='To Do List' />
          <ul className='todos'>
          {TodoComponents}
          <br />
          <button className='save-list btn'>Save</button>
          </ul>
        </div>
      )
  }
}



export default Home
