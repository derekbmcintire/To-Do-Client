import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import UserStore from '../stores/userstores'
import * as UserActions from '../Actions/UserActions'
import TodoStore from '../stores/todostores'
const $ = require('jquery')
const config = require('../config')

// Header component holds the nav
class Header extends Component {
  // set initial state
  constructor() {
    super()
    this.state = {
    }
  }

  // set state equal to UserStore
  componentWillMount() {
    this.setState({
      user: UserStore.getAll()
    })
  }

  // hide inappropriate buttons on load
  componentDidMount() {
    $('#signed-in-as').hide()
    $('.sign-out').hide()
    $('.my-lists').hide()
  }

  // hide/show buttons, reset title and reset user state
  signOutSuccess() {
    $('.sign-out').hide()
    $('.sign-link').show()
    $('.my-lists').hide()
    $('#signed-in-as').hide()
    UserActions.signOut()
    TodoStore.title = 'To Do List'
  }

  // failure on sign out
  // reconfigure to display message and remove console.log
  signOutFailure(error) {
    console.error(error)
  }

  // sign out ajax request
  signOut() {
    return $.ajax({
      url: config.development + '/sign-out/' + UserStore.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  // sign out callback function
  onSignOut(id) {
    this.signOut()
      .then(this.signOutSuccess)
      .catch(this.signOutFailure)
  }

  // component render function
  render() {

    // component return statement
    return (
      <div className="row header">
        <div className="col-xs-4">
        { /* display username */ }
          <h5 id='signed-in-as'>Signed in as: {UserStore.user.username}</h5>
        </div>
        <div className="col-xs-8">
          <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link my-lists" to="/my-lists">My Lists</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Current List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link sign-link" to="/sign-in">Sign-In</Link>
            </li>
            <li className="nav-item">
            { /* add onClick function to Link element */ }
              <Link className="nav-link sign-out" to="/sign-in" onClick={this.onSignOut.bind(this)}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
