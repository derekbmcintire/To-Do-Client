import React, { Component } from 'react'
import * as UserActions from '../Actions/UserActions'
import UserStore from '../stores/userstores'
const $ = require('jquery')
const config = require('../config')

// Sign component displays auth fields
class Sign extends Component {
  // sets initial state of Sign
  constructor() {
    super()
    this.state = {
      user: UserStore.getAll()
    }
  }

  // ajax request to sign a user in
  signIn(data) {
    return $.ajax({
    url: config.production + '/sign-in',
    method: 'POST',
    data
  })
  }

  // on sign in success, display correct buttons and view
  signInSuccess(data) {
    $('.sign-out').show()
    $('.my-lists').show()
    $('#signed-in-as').show()
    $('.sign-link').hide()
    UserActions.signIn(data)
  }

  // sign in failure should display a message
  // refactor and remove console.log
  signInFailure() {
    console.log('sign-in failure')
  }

  // on submission of sign in form event handler
  onSignIn(event) {
    event.preventDefault()
    // builds an object matching what the API expects
    const currentVals = {
      credentials: {
        email: document.getElementById('in-email').value,
        password: document.getElementById('in-password').value
      }
    }
      // invokes sign in ajax request, passing above object
      this.signIn(currentVals)
        .then(this.signInSuccess)
        .then(() => {
          // after sign in success, programmatically push the user to
          // the home view
          this.props.history.push('/todo-front/')
        })
        .catch(this.signInFailure)

  }

  // sign up ajax request
  signUp(data) {
    return $.ajax({
      url: config.production + '/sign-up',
      method: 'POST',
      data
    })
  }

  // sign up success clears sign up form and
  // displays a green check to let user know
  // sign up was successful
  signUpSuccess() {
    $('.form-control').val('')
    $('.up-check').text(" \u2714")
  }

  // sign up failure console.logs a message
  // refactor to remove console.log
  // display an X and/or error message on failure
  signUpFailure() {
    console.log('try again')
  }

  // sign up event handler
  onSignUp(event) {
    event.preventDefault()
    // creates object that API expects
    const currentVals = {
      credentials: {
        email: document.getElementById('up-email').value,
        username: document.getElementById('up-user').value,
        password: document.getElementById('up-password').value,
        password_confirmation: document.getElementById('up-password-confirmation').value
      }
    }
    // check to see if password and password confirmation match
    if (currentVals.credentials.password !== currentVals.credentials.password_confirmation) {
      // if they don't match, console.log
      // refactor to display a message
      console.log('passwords do not match')
    } else {
      // invoke sign up ajax request and success/failure
      this.signUp(currentVals)
        .then(this.signUpSuccess)
        .catch(this.signUpFailure)
    }
  }

  // component render method
  render() {
    // component return statement
    return(
      <div className='sign'>
      <div className='sign-in'>
        <h3>Sign In</h3>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" id='in-email' className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" id='in-password' className="form-control"  placeholder="Password" />
          </div>
          <button type="submit" onClick={this.onSignIn.bind(this)} className="btn btn-primary">Sign In</button><span className='in-check'></span>
        </form>
      </div>
      <br />
      <div className='sign-up'>
        <h3>Sign Up</h3>
        <form id='sign-up-form'>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" id='up-email' className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input type="email" id='up-user' className="form-control" placeholder="Enter user name" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" id='up-password' className="form-control"  placeholder="Password" />
          </div>
          <div className="form-group">
            <label>Password Confirmation</label>
            <input type="password" id='up-password-confirmation' className="form-control"  placeholder="Password Confirmation" />
          </div>
          <button type="submit" onClick={this.onSignUp.bind(this)} className="btn btn-primary">Sign Up</button><span className='up-check'></span>
        </form>
      </div>
    </div>
    )
  }
}

export default Sign
