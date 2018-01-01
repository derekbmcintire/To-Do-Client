import React, { Component } from 'react'
import UserStore from '../stores/userstores'
import ListStore from '../stores/liststores'
import * as ListActions from '../Actions/ListActions'
import List from './list'
const $ = require('jquery')

class Home extends Component {
  constructor() {
    super()
    this.getUserLists = this.getUserLists.bind(this)
    this.state = {
      lists: ListStore.getAll(),
      myLists: []
    }
  }

  componentWillMount() {
    ListStore.on('change', this.getUserLists)
  }

  componentDidMount() {
    this.onGetLists()
  }

  componentWillUnmount() {
    ListStore.removeListener('change', this.getUserLists)
  }

  onGetLists() {
    this.getLists()
      .then(this.getListsSuccess)
      .catch(this.getListsFailure)
  }

  getUserLists() {
      this.setState({
        lists: ListStore.getAll()
      })

      const myLists = this.state.lists.lists
      this.setState({
        myLists: myLists.map((list) => {
        return list
      })
    })
  }

  getListsSuccess(data) {
    ListActions.getLists(data)
  }

  getListsFailure(error) {
    console.error(error)
  }

  getLists() {
    return $.ajax({
      url: 'https://dbm-todo-api.herokuapp.com/lists',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }



  render() {
    const {myLists} = this.state
    const ListComponents = myLists.map((list) => {
      return <List key={list.id} list={list} {...list} />
    })
    return(
      <div className='lists-div'>
      <h2>My Lists</h2>
      <ul>{ ListComponents }</ul>
      </div>
    )
  }
}

export default Home
