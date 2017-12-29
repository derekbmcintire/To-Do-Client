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
    this.getLists()
      .then(this.getListsSuccess)
      .catch(this.getListsFailure)
      ListStore.on('change', this.getUserLists)
  }

  componentWillUnmount() {
    ListStore.removeListener('change', this.getUserLists)
  }

  getUserLists() {
    console.log('detected change')

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
      url: 'http://localhost:4741/lists',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  render() {
    const {myLists} = this.state
    const ListComponents = myLists.map((list) => {
      console.log('in render ', list)
      return <List key={list.id} {...list} />
    })
    return(
      <div>
      <h2>My Lists</h2>
      <ul>{ ListComponents }</ul>
      </div>
    )
  }
}

export default Home
