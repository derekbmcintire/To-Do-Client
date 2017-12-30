import React, { Component } from 'react'
import * as ListActions from '../Actions/ListActions'
import {Link} from 'react-router-dom'
const $ = require('jquery')

class List extends Component {
  constructor(props) {
    super()
  }
  changeTitle() {
    $('#list-title').val('hi')
  }

  render() {
    const { title, items } = this.props
    return (
      <Link to="/"><li className='item row' onClick={() => {
        ListActions.showThisList(this.props.list.items)
      }}>
        <div className='col-xs-8'>
          <h4 className='list'>{title}</h4>
        </div>
        <div className='col-xs-4'>
        <h5>Items: {items.length}</h5>
        </div>
      </li></Link>
    )
  }
}

export default List
