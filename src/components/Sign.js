import React, { Component } from 'react'
import * as UserActions from '../Actions/UserActions'
import UserStore from '../stores/userstores'
const $ = require('jquery')


class Sign extends Component {
  // sets initial state of Home
  constructor() {
    super()
    this.getUser = this.getUser.bind(this)
    this.state = {
      user: UserStore.getAll()
    }
  }

  // this happens once on page load and not again, so it's the best place to add
  // event listeners
  componentWillMount() {
    // listens for a change event to be emitted and sets state
    console.log('willMount')
    UserStore.on('change', this.getUser)
  }

  // removes event listener to prevent memory leak
  componentWillUnmount() {
    UserStore.removeListener('change', this.getUser)
  }

  getUser() {
    console.log('change')
  }

  signIn(data) {
    return $.ajax({
    url: 'http://localhost:4741/sign-in',
    method: 'POST',
    data
  })
  }

  signInSuccess(data) {
    $('.sign-out').show()
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
          this.props.history.push('/')
        })
        .catch(this.signInFailure)

  }

  signUp(data) {
    return $.ajax({
      url: 'http://localhost:4741/sign-up',
      method: 'POST',
      data
    })
  }

  signUpSuccess() {
    console.log('success!')
  }

  signUpFailure() {
    console.log('try again')
  }

  onSignUp(event) {
    event.preventDefault()
    const currentVals = {
      credentials: {
        email: document.getElementById('up-email').value,
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
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" id='in-email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id='in-password' className="form-control"  placeholder="Password" />
        </div>
        <button type="submit" onClick={this.onSignIn.bind(this)} className="btn btn-primary">Submit</button>
      </form>
    </div>
    <div className='sign-up'>
      <form id='sign-up-form'>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" id='up-email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id='up-password' className="form-control"  placeholder="Password" />
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input type="password" id='up-password-confirmation' className="form-control"  placeholder="Password Confirmation" />
        </div>
        <button type="submit" onClick={this.onSignUp.bind(this)} className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
  )
}
}

export default Sign
