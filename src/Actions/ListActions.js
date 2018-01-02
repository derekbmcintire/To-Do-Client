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

// tells dispatcher to dispatch a 'DELETE_LIST action
// which will clear the current list, incase the deleted list
// was open prior to deleting
export function deleteList() {
  dispatcher.dispatch({
    type: 'DELETE_LIST'
  })
}
