import React, { Component } from 'react'
import {Link} from 'react-router-dom'
const $ = require('jquery')

class Header extends Component {

  componentDidMount() {
    $('.sign-out').hide()
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
          <Link className="nav-link sign-out" to="/sign-in">Sign Out</Link>
        </li>
      </ul>
    )
  }
}

export default Header
