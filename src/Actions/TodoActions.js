import dispatcher from '../dispatcher'

export function createToDo(text) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    text
  })
}

export function deleteItem(id) {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    id
  })
}

export function completeItem(id) {
  dispatcher.dispatch({
    type: 'COMPLETE_ITEM',
    id
  })
}

export function clearList() {
  dispatcher.dispatch({
    type: 'CLEAR_LIST'
  })
}

export function moveUp(item, index) {
  dispatcher.dispatch({
    type: 'MOVE_UP',
    item,
    index
  })
}
