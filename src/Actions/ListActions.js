import dispatcher from '../dispatcher'

export function getLists(data) {
  dispatcher.dispatch({
    type: 'GET_LISTS',
    data
  })
}

export function showThisList(data, title, id) {
  dispatcher.dispatch({
    type: 'POPULATE_LIST',
    title,
    id,
    data
  })
}

export function deleteList() {
  dispatcher.dispatch({
    type: 'DELTE_LIST'
  })
}
