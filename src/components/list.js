import React, { Component } from 'react'

class List extends Component {
  constructor(props) {
    super()
  }

  render() {
    const { title, items } = this.props
    return (
      <li className='item row' >
        <div className='col-xs-8'>
          <h4 className='list' >{title}</h4>
        </div>
        <div className='col-xs-4'>
        <h5>Items: {items.length}</h5>
        </div>
      </li>
    )
  }
}

export default List
