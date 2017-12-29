// EventEmitter is included in JS so Node has access to it without
// installing anything!
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class ListStore extends EventEmitter {
  constructor() {
    super()
    this.lists = []
    }

    getLists(data) {
      this.lists = data
      console.log('changed data', this.lists)
      this.emit('change')
    }

    getAll() {
      return this.lists
      console.log('getAll called')
    }

    handleActions(action) {
    if (action.type === 'GET_LISTS') {
      this.getLists(action.data)
    }
    }
}

const listStore = new ListStore()

// registers this file as a listener on the dispatcher
// binds 'this' within the handleActions function to todoStore
dispatcher.register(listStore.handleActions.bind(listStore))
export default listStore
