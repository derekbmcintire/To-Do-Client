// EventEmitter is included in JS so Node has access to it without
// installing anything!
import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'

// this is storing data for the todo list
class TodoStore extends EventEmitter {
  // set initial state
  constructor() {
    super()
    this.todos = []
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
    }
}

// creates a new instance of the TodoStore
const todoStore = new TodoStore()

// registers this file as a listener on the dispatcher
// binds 'this' within the handleActions function to todoStore
dispatcher.register(todoStore.handleActions.bind(todoStore))

window.dispatcher = dispatcher
window.todoStore = todoStore
export default todoStore
