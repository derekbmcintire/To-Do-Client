import React, { Component } from 'react'
import * as UserActions from '../Actions/UserActions'
import UserStore from '../stores/userstores'
const $ = require('jquery')


class Sign extends Component {
  // sets initial state of Home
  constructor() {
    super()
    this.state = {
      user: UserStore.getAll()
    }
  }

  signIn(data) {
    return $.ajax({
    url: 'https://boiling-chamber-26539.herokuapp.com/sign-in',
    method: 'POST',
    data
  })
  }

  signInSuccess(data) {
    $('.sign-out').show()
    $('.my-lists').show()
    $('#signed-in-as').show()
    $('.sign-link').hide()
    UserActions.signIn(data)
  }

  signInFailure() {
    console.log('sign-in failure')
  }

  onSignIn(event) {
    event.preventDefault()
    const currentVals = {
      credentials: {
        email: document.getElementById('in-email').value,
        password: document.getElementById('in-password').value
      }
    }
      this.signIn(currentVals)
        .then(this.signInSuccess)
        .then(() => {
          this.props.history.push('/todo-front/')
        })
        .catch(this.signInFailure)

  }

  signUp(data) {
    return $.ajax({
      url: 'https://boiling-chamber-26539.herokuapp.com/sign-up',
      method: 'POST',
      data
    })
  }

  signUpSuccess() {
    $('.form-control').val('')
    $('.up-check').text(" \u2714")
  }

  signUpFailure() {
    console.log('try again')
  }

  onSignUp(event) {
    event.preventDefault()
    const currentVals = {
      credentials: {
        email: document.getElementById('up-email').value,
        username: document.getElementById('up-user').value,
        password: document.getElementById('up-password').value,
        password_confirmation: document.getElementById('up-password-confirmation').value
      }
    }
    this.signUp(currentVals)
      .then(this.signUpSuccess)
      .catch(this.signUpFailure)
  }

  render() {
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
