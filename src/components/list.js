import React, { Component } from 'react'
import * as ListActions from '../Actions/ListActions'
import {Link} from 'react-router-dom'
import UserStore from '../stores/userstores'
const $ = require('jquery')
const config = require('../config')

// List component displays the title and number of items in
// a users saved list
class List extends Component {
  constructor(props) {
    super()
  }

  funky() {
    console.log('funky')
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
    console.log('gets to this.getLists')
    return $.ajax({
      url: config.development + '/lists',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  // event handler for getting lists
  onGetLists() {
    this.getLists()
      .then(this.getListsSuccess)
      .catch(this.getListsFailure)
  }

  // deletes a users list
  onDeleteList() {
    this.deleteList()
      .then(this.onGetLists.bind(this))
      .then(this.deleteSuccess)
      .catch(console.error)
  }

  // ajax request to delete a list from the database
  deleteList() {
    return $.ajax({
      url: config.development + '/lists/' + this.props.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  // if delete is successful console.log a message
  // need to refactor to re-render page and display message
  deleteSuccess() {
    console.log('success')
  }

  // component render method
  render() {
    // use ES6 destructuring to create new variables for title, items and id
    const { title, items } = this.props
    // set delete icon to unicode X character
    const deleteIcon = "\u2716"
    // component return statement
    return (
    <li className='item row' >
        <div className='col-xs-8'>
        {/* pass an anonymous function as a click handler and invoke ListActions.showThisList passing the items, title and id of the list that was clicked on - this will set the current state to the saved list and the Link tag around the h4 tag will push the view back to the Home component*/}
          <Link to="/"><h4 onClick={() => {
            ListActions.showThisList(this.props.list.items, this.props.list.title, this.props.id)
          } } className='list' key={this.props.id}>{title}</h4></Link>
        </div>
        <div className='col-xs-2'>
        <h5>Items: {items.length}</h5>
        </div>
        <div className='col-xs-2'>
        <button className='delete' onClick={this.onDeleteList.bind(this)}>{deleteIcon}</button>
        </div>
      </li>
    )
  }
}

export default List
