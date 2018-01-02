import React, { Component } from 'react'
import UserStore from '../stores/userstores'
import ListStore from '../stores/liststores'
import * as ListActions from '../Actions/ListActions'
import List from './list'
const $ = require('jquery')
const config = require('../config')

// Lists component
class Lists extends Component {
  // sets initial state
  constructor() {
    super()
    this.getUserLists = this.getUserLists.bind(this)
    this.state = {
      lists: ListStore.getAll(),
      myLists: []
    }
  }

  // listens for changes to the list store
  componentWillMount() {
    ListStore.on('change', this.getUserLists)
  }

  // when component renders, it runs onGetLists
  componentDidMount() {
    this.onGetLists()
    console.log(List.params)
  }

  // removes change listener so when component re-renders multiple listeners
  // don't get added
  componentWillUnmount() {
    ListStore.removeListener('change', this.getUserLists)
  }

  // event handler for getting lists
  onGetLists() {
    this.getLists()
      .then(this.getListsSuccess)
      .catch(this.getListsFailure)
  }

  // not totally sure why I had to do this, but I tried a lot of different
  // things to get state to update and for some reason this worked
  // should probably inspect and refactor
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

  // sends data from get lists ajax request to the ListActions.getLists
  getListsSuccess(data) {
    ListActions.getLists(data)
  }

  // logs an error if getLists fails
  // need to refactor to display message and remove console.log
  getListsFailure(error) {
    console.error(error)
  }

  // ajax request to get all user lists
  getLists() {
    return $.ajax({
      url: config.development + '/lists',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  // component render function
  render() {
    // use ES6 destructuring to get myLists variable
    const {myLists} = this.state

    // map through myLists and return new list component
    // for each list
    const ListComponents = myLists.map((list) => {
      return <List key={list.id} list={list} {...list} />
    })

    // component return statement
    return(
      <div className='lists-div'>
      <h2>My Lists</h2>
      <ul>{ ListComponents }</ul>
      </div>
    )
  }
}

export default Lists
