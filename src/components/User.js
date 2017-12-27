import React, { Component } from 'react'

class User extends Component {

  render() {
    console.log(this.props)
    const search = this.props.location.search
    return(
      <div>
        <h2>User</h2>
        <p>current search: {search.substr(1)}</p>
      </div>
    )
  }
}

export default User
