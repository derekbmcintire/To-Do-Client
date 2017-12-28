import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import UserStore from '../stores/userstores'
import * as UserActions from '../Actions/UserActions'
const $ = require('jquery')

class Header extends Component {
  constructor() {
    super()
    // prevents memory leak by binding getTodos function to current
    // instance of this component

    this.state = {
      // sets todos to the getAll function in TodoStore, which returns all
      // current todos
      user: UserStore.user
    }
  }

  componentWillMount() {
    UserStore.on('change', () => {
      this.user = UserStore.user
    })
  }

  componentDidMount() {
    $('.sign-out').hide()
  }

  signOutSuccess() {
    $('.sign-out').show()
    $('.sign-link').hide()
    UserActions.signOut()
    console.log('signed out')
  }

  signOutFailure(error) {
    console.error(error)
  }

  signOut() {
    console.log('passing id ', this.user.id)
    return $.ajax({
      url: 'http://localhost:4741/sign-out/' + this.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + this.user.token
      }
    })
  }

  onSignOut(id) {
    console.log('triggered')
    this.signOut()
      .then(this.signOutSuccess)
      .catch(this.signOutFailure)
  }



  render() {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" to="/">To Do List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sign-link" to="/sign-in">Sign-In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sign-out" to="/sign-in" onClick={this.onSignOut.bind(this)}>Sign Out</Link>
        </li>
      </ul>
    )
  }
}

export default Header
