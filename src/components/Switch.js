import React, { Component } from 'react';

class Switch extends Component {
  render() {
    switch(this.props.status){
      case 'loaded': 
      return this.props.clidren 
      case 'hasError':
      return <p>error</p>
      default:
      return <p>Loading....</p>
    }
  }
}

export default Switch;