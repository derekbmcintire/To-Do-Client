import dispatcher from '../dispatcher'

// tells the dispatcher to dispatch a 'GET_LISTS' action
// passes data to any store that listens
export function getLists(data) {
  dispatcher.dispatch({
    type: 'GET_LISTS',
    data
  })
}

// tells the dispatcher to dispatch a 'POPULATE_LISTS' action
// passes data, title of list and list id to any store that listens
export function showThisList(data, title, id) {
  dispatcher.dispatch({
    type: 'POPULATE_LIST',
    title,
    id,
    data
  })
}
