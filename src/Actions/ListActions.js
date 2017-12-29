import dispatcher from '../dispatcher'

export function getLists(data) {
  dispatcher.dispatch({
    type: 'GET_LISTS',
    data
  })
}
