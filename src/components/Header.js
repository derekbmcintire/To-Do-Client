import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import UserStore from '../stores/userstores'
import * as UserActions from '../Actions/UserActions'
const $ = require('jquery')

class Header extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentWillMount() {
    this.setState({
      user: UserStore.getAll()
    })
    // this.user = UserStore.user
    // UserStore.on('change', () => {
    //   this.user = UserStore.user
    // })
  }

  componentDidMount() {
    $('#signed-in-as').hide()
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
    return $.ajax({
      url: 'http://localhost:4741/sign-out/' + UserStore.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

  onSignOut(id) {
    this.signOut()
      .then(this.signOutSuccess)
      .catch(this.signOutFailure)
  }



  render() {
    return (
      <div>
        <h5 id='signed-in-as'>Signed in as: {UserStore.user.username}</h5>
        <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/my-lists">My Lists</Link>
        </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">New List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link sign-link" to="/sign-in">Sign-In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link sign-out" to="/sign-in" onClick={this.onSignOut.bind(this)}>Sign Out</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
