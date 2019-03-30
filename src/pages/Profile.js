import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';

class Private extends Component {
  render() {
    const { user } = this.props
    return (
      <>
        <div>
          <h1>Welcome {user.username}</h1>
        </div>
        
        <Navbar/>
      </>
    )
  }
}

export default withAuth(Private);