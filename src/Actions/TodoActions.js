import dispatcher from '../dispatcher'

export function createToDo(text) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    text
  })
}

export function deleteToDo(id) {
  dispatcher.dispatch({
    type: 'DELETE_TODO',
    id
  })
}

export function completeItem(id) {
  dispatcher.dispatch({
    type: 'COMPLETE_ITEM',
    id
  })
}
