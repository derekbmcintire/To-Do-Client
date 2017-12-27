import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link user" href="/user">User</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/sign-in">Sign-In</a>
        </li>
      </ul>
    )
}

export default Header
