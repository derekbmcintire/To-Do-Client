// EventEmitter is included in JS so Node has access to it without
// installing anything!
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.user = {
      id: null,
      email: null,
      token: null
    }
    }

    signIn(data) {
      this.user = {
        id: data.user.id,
        email: data.user.email,
        token: data.user.token
      }
      this.emit('change')
    }

    signOut() {
      this.user = {
        id: null,
        email: null,
        token: null
      }
    }

    getAll() {
      return this.user
    }

    handleActions(action) {
    if (action.type === 'SIGN_IN') {
      this.signIn(action.data)
    } else if (action.type === 'SIGN_OUT') {
      this.signOut()
    }
    }
}

const userStore = new UserStore()

// registers this file as a listener on the dispatcher
// binds 'this' within the handleActions function to todoStore
dispatcher.register(userStore.handleActions.bind(userStore))
window.userStore = userStore
export default userStore
