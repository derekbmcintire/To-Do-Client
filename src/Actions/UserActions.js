import dispatcher from '../dispatcher'

// tells the dispatcher to dispatch a 'SIGN_IN' action
// passes data and sends dispatch to any store that listens
export function signIn(data) {
  dispatcher.dispatch({
    type: 'SIGN_IN',
    data
  })
}

// tells the dispatcher to dispatch a 'SIGN_OUT' action
// sends dispatch to any store that listens
export function signOut() {
  dispatcher.dispatch({
    type: 'SIGN_OUT'
  })
}
