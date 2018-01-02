import React, { Component } from 'react'
import Todo from './Todo'
// using * as creates an object with all exports
import * as TodoActions from '../Actions/TodoActions'
import TodoStore from '../stores/todostores'
import UserStore from '../stores/userstores'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const $ = require('jquery')
const config = require('../config')

// Home component is the main view
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

  // clearList callback function
  // calls TodoActions.clearList to reset todostores state
  // resets list title
  // hides update button and shows save button
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

  // after component renders
  componentDidMount() {
    // check if user is signed in if there is a user, display the
    // username in the nav
    if (this.user.username === null) {
      $('#welcome').hide()
    } else {
      $('#welcome').show()
    }
    // set current title to todostore state title
    this.title = TodoStore.title
    // convert state object to string
    $('#list-title').val(String(this.title))
    // set update status (true or false based on whether or not the current
    // list has previously been saved)
    this.update = TodoStore.update
    // if update is true show update button, else show save button
    if (this.update) {
      $('#update-list').show()
      $('#save-list').hide()
    } else {
      $('#update-list').hide()
      $('#save-list').show()
    }

  }

  // removes event listener to prevent memory leak
  // default to show save button
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

  // save current list ajax request
  saveList(data) {
      return $.ajax({
        url: config.production + '/lists',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + this.user.token
        },
        data
      })
  }

  // on save success, display message
  saveListSuccess() {
    $('#list-message').text('List Saved!')
  }

  // on save failure, display message
  saveListFailure() {
    $('#list-message').text('List Not Saved')
  }

  // save list event handler
  onSaveList() {
    // build data object to send to API
    const data = {
      list: {
        title: document.getElementById('list-title').value,
        items: this.state.todos
      }
    }
    // call the ajax request and pass above object
    this.saveList(data)
      .then(this.saveListSuccess)
      .catch(this.saveListFailure)
  }

  // update a list ajax request
  updateList(data) {
    console.log('in updatelist ', this.props.key)
      return $.ajax({
        url: config.production + '/lists/' + TodoStore.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + this.user.token
        },
        data
      })
  }

  // display message on update success
  updateListSuccess() {
    $('#list-message').text('List Updated')
  }

  // display message on update failure
  updateListFailure() {
    $('#list-message').text('List Not Updated')
  }

  // update list event handler
  onUpdateList() {
    // build data object to send to API
    const data = {
      list: {
        title: document.getElementById('list-title').value,
        items: this.state.todos
      }
    }
    // call ajax request and pass above object
    this.updateList(data)
      .then(this.updateListSuccess)
      .catch(this.updateListFailure)
  }

  // add an item to a list
  createToDo(e) {
    e.preventDefault()
    // check the input for a value, if nothing has been entered
    // display a message and do not add the item
    if (!document.getElementById('new-do').value) {
      $('#list-message').text('Please enter a list item')
    } else {
      // take the value from the input field and pass it
      // to the TodoActions.createToDo function
      const item = document.getElementById('new-do').value
      TodoActions.createToDo(item)
      // clear the input field
      document.getElementById('new-do').value = ''
    }
  }

  // component render function
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
          <input type='text' id='list-title' className='list-title form-control form-control-lg' placeholder='To Do List' autoFocus='autofocus' />
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
