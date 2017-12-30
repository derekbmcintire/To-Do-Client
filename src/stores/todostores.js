// EventEmitter is included in JS so Node has access to it without
// installing anything!
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
const $ = require('jquery')

// this is storing data for the todo list
class TodoStore extends EventEmitter {
  // set initial state
  constructor() {
    super()
    this.todos = []
    this.title = 'To Do List'
    }

    completeItem(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          if (todo.complete === true) {
            todo.complete = false
          } else {
            todo.complete = true
          }
        }
      })
      this.emit('change')
    }

    deleteItem(id) {
      this.todos = this.todos.filter((todo) => {
        return (todo.id !== id)
      })
      this.emit('change')
    }

    // create a new todo
    createToDo(text) {
      // creates a timestamp to use as an id
      const id = Date.now()

      // pushes the current todo into this.todos
      this.todos.push({
        id,
        text,
        complete: false
      })

      // sends a change notice to the event listener
      this.emit('change')
    }

    populateList(list) {
      this.todos = list
      this.emit('change')
    }

    clearList() {
      this.todos = []
      this.emit('change')
    }

    // returns all todos
    getAll() {
      return this.todos
    }

    // dispatcher will send EVERY action that happens in the app to
    // EVERY listener, so this will handle the events and only
    // react to the ones I want it to
    handleActions(action) {
    if (action.type === 'CREATE_TODO') {
      this.createToDo(action.text)
    }
    if (action.type === 'COMPLETE_ITEM') {
      this.completeItem(action.id)
    }
    if (action.type === 'DELETE_ITEM') {
      this.deleteItem(action.id)
    }
    if (action.type === 'SIGN_OUT') {
      this.clearList()
    }
    if (action.type === 'CLEAR_LIST') {
      this.clearList()
    }
    if (action.type === 'POPULATE_LIST') {
      this.populateList(action.data)
      this.title = action.title
    }
    }
}

// creates a new instance of the TodoStore
const todoStore = new TodoStore()

// registers this file as a listener on the dispatcher
// binds 'this' within the handleActions function to todoStore
dispatcher.register(todoStore.handleActions.bind(todoStore))
window.todoStore = todoStore
export default todoStore
