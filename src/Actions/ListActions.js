import dispatcher from '../dispatcher'

export function getLists(data) {
  dispatcher.dispatch({
    type: 'GET_LISTS',
    data
  })
}

export function showThisList(data, title) {
  dispatcher.dispatch({
    type: 'POPULATE_LIST',
    title,
    data
  })
}
