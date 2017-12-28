import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" to="/">To Do List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link user" to="/user">User</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sign-in">Sign-In</Link>
        </li>
      </ul>
    )
}

export default Header
