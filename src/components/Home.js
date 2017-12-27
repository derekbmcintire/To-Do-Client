import React, { Component } from 'react'
import Todo from './Todo'
// using * as creates an object with all exports
import * as TodoActions from '../Actions/TodoActions'
import TodoStore from '../stores/todostores'

class Home extends Component {
  // sets initial state of Home
  constructor() {
    super()
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
    TodoStore.on('change', () => {
      this.setState({
        todos: TodoStore.getAll()
      })
    })
  }

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
        <div>
        <form onSubmit={this.createToDo.bind(this)}>
        <input id='new-do' />
        <button type='submit'>Create!</button>
        </form>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
        </div>
      )
  }
}



export default Home
