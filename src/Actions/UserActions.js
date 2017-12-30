import dispatcher from '../dispatcher'

export function signIn(data) {
  dispatcher.dispatch({
    type: 'SIGN_IN',
    data
  })
}

export function signOut() {
  dispatcher.dispatch({
    type: 'SIGN_OUT'
  })
}
