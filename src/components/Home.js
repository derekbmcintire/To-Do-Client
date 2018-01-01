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
      todos: TodoStore.getAll(),
      update: false
    }
  }

  clearList() {
    TodoActions.clearList()
    $('#list-title').val('To Do List')
    $('#update-list').hide()
    $('#save-list').show()
  }

  // this happens once on page load and not again, so it's the best place to add
  // event listeners
  componentWillMount() {
    // listens for a change event to be emitted and sets state
    TodoStore.on('change', this.getTodos)
    this.user = UserStore.user
  }

  componentDidMount() {
    if (this.user.username === null) {
      $('#welcome').hide()
    } else {
      $('#welcome').show()
    }
    this.title = TodoStore.title
    $('#list-title').val(String(this.title))
    console.log(TodoStore.update)
    this.update = TodoStore.update
    if (this.update) {
      $('#update-list').show()
      $('#save-list').hide()
    } else {
      $('#update-list').hide()
      $('#save-list').show()
    }

  }

  // removes event listener to prevent memory leak
  componentWillUnmount() {
    TodoStore.removeListener('change', this.getTodos)
    $('#update-list').hide()
    $('#save-list').show()
  }

  // gets all current list items
  getTodos() {
      this.setState({
        todos: TodoStore.getAll()
      })
  }

  saveList(data) {
      return $.ajax({
        url: 'https://dbm-todo-api.herokuapp.com/lists',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + this.user.token
        },
        data
      })
  }

  saveListSuccess() {
    $('#list-message').text('List Saved!')
  }

  saveListFailure() {
    $('#list-message').text('List Not Saved')
  }

  onSaveList() {
    const data = {
      list: {
        title: document.getElementById('list-title').value,
        items: this.state.todos
      }
    }
    this.saveList(data)
      .then(this.saveListSuccess)
      .catch(this.saveListFailure)
  }

  updateList(data) {
    console.log('in updatelist ', this.props.key)
      return $.ajax({
        url: 'https://dbm-todo-api.herokuapp.com/lists/' + TodoStore.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + this.user.token
        },
        data
      })
  }

  updateListSuccess() {
    $('#list-message').text('List Updated')
  }

  updateListFailure() {
    $('#list-message').text('List Not Updated')
  }

  onUpdateList() {
    const data = {
      list: {
        title: document.getElementById('list-title').value,
        items: this.state.todos
      }
    }
    console.log('in onUpdateList ', TodoStore.id)
    this.updateList(data)
      .then(this.updateListSuccess)
      .catch(this.updateListFailure)
  }

  createToDo(e) {
    e.preventDefault()
    if (!document.getElementById('new-do').value) {
      $('#list-message').text('Please enter a list item')
    } else {
      const item = document.getElementById('new-do').value
      TodoActions.createToDo(item)
      document.getElementById('new-do').value = ''
    }
  }

  render() {
    // this is using ES6 destructuring to make the variable todos = whatever
    // this.state.todos is
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
            <input className='form-control form-control-lg add' id='new-do' placeholder='Add a new item'/>
            <button type='submit' className='btn btn-outline-success add-item add'>Add item</button>
          </form>
          <input type='text' id='list-title' className='list-title form-control form-control-lg' placeholder='To Do List' autofocus='autofocus' />
          <ul className='todos'>
          <h4 id='list-message'> </h4>
          {TodoComponents}
          <br />
          <button id='clear-list' className='btn list-btn' onClick={this.clearList.bind(this)}>Clear</button>
          <button id='save-list' className='btn list-btn' onClick={this.onSaveList.bind(this)}>Save</button>
          <button id='update-list' className='btn list-btn' onClick={this.onUpdateList.bind(this)}>Update</button>
          </ul>
        </div>
      )
  }
}



export default Home
