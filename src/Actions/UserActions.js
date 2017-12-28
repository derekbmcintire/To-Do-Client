import dispatcher from '../dispatcher'

export function signIn(data) {
  dispatcher.dispatch({
    type: 'SIGN_IN',
    data
  })
  console.log('data in useractions', data)
}
