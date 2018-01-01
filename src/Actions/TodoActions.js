import dispatcher from '../dispatcher'

// tells the dispatcher to dispatch a 'CREATE_TODO' action
// passes text to any store that listens
export function createToDo(text) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    text
  })
}

// tells the dispatcher to dispatch a 'DELETE_ITEM' action
// passes the id and sends dispatch to any store that listens
export function deleteItem(id) {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    id
  })
}

// tells the dispatcher to dispatch a 'COMPLETE_LISTS' action
// passes the id and sends dispatch to any store that listens
export function completeItem(id) {
  dispatcher.dispatch({
    type: 'COMPLETE_ITEM',
    id
  })
}

// tells the dispatcher to dispatch a 'DELETE_LISTS' action
// sends dispatch to any store that listens
export function clearList() {
  dispatcher.dispatch({
    type: 'CLEAR_LIST'
  })
}

// tells the dispatcher to dispatch a 'MOVE_UP' action
// passes an item and index and sends dispatch to any store that listens
export function moveUp(item, index) {
  dispatcher.dispatch({
    type: 'MOVE_UP',
    item,
    index
  })
}
