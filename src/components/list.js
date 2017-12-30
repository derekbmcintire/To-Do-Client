import React, { Component } from 'react'
import * as ListActions from '../Actions/ListActions'
import {Link} from 'react-router-dom'
import UserStore from '../stores/userstores'
const $ = require('jquery')

class List extends Component {
  constructor(props) {
    super()
  }

  onDeleteList() {
    this.deleteList()
      .then(this.deleteSuccess)
      .catch(console.error)
  }

  deleteList() {
    return $.ajax({
      url: 'http://localhost:4741/lists/' + this.props.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + UserStore.user.token
      }
    })
  }

deleteSuccess() {
  console.log('success')
}

  render() {
    const { title, items, id } = this.props
    const deleteIcon = "\u2716"
    return (
    <li className='item row'>
      <Link to="/">
        <div className='col-xs-8'>
          <h4 className='list' key={this.props.id} onClick={() => {
            console.log(this.props.id)
            ListActions.showThisList(this.props.list.items, this.props.list.title, this.props.id)
          }}>{title}</h4>
        </div>
        <div className='col-xs-2'>
        <h5>Items: {items.length}</h5>
        </div>
        </Link>
        <div className='col-xs-2'>
        <button className='delete' onClick={this.onDeleteList.bind(this)}>{deleteIcon}</button>
        </div>
      </li>
    )
  }
}

export default List
