import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Owner extends Component {
  render() {
    const { user, travel } = this.props
    return (
      <div>
        {user._id === travel.owner && this.props.children}
      </div>
      );
  }
}

export default withAuth(Owner);