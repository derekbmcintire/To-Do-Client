// EventEmitter is included in JS so Node has access to it without
// installing anything!
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.user = {
      email: '',
      token: ''
    }
    }

    signIn(data) {
      this.user = {
        email: data.user.email,
        token: data.user.token
      }
      console.log('store signIn ', this.user[0])
      this.emit('change')
    }

    getAll() {
      return this.user
    }

    handleActions(action) {
    if (action.type === 'SIGN_IN') {
      this.signIn(action.data)
    }
    }
}

const userStore = new UserStore()

// registers this file as a listener on the dispatcher
// binds 'this' within the handleActions function to todoStore
dispatcher.register(userStore.handleActions.bind(userStore))
window.userStore = userStore
export default userStore
