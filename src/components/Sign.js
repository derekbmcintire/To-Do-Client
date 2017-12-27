import React, { Component } from 'react'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
const $ = require('jquery')

class Sign extends Component {

  onSignIn(event) {
    event.preventDefault()
    $('.user').show()
    this.props.history.push('/')
  }

  render() {
  return(
    <div className='sign-in'>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" onClick={this.onSignIn.bind(this)} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
}

export default Sign
