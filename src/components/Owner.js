import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Owner extends Component {
  render() {  
    const { user, id } = this.props       
    return (
      <div >
        {user._id === id && this.props.children}
      </div>
      );
  }
}

export default withAuth(Owner);