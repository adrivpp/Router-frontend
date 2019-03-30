import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';

class NotificationsCard extends Component {

  state = {
    travels: [],
    status: 'loading'
  }

  handleClick =(request) => {
    console.log('hola', request)
    travelService.denyRequest(this.state.travels[0]._id, request)
    .then(() => {
      this.findNotifications()
    })
    .catch(err => console.log(err))
  }

  findNotifications = () => {    
    travelService.findNotifications(this.props.user.notifications)
    .then((travels) =>{
      this.setState({
        travels,
        status: 'loaded'
      })   
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {   
    this.findNotifications()
  }
  
  render() {
    
    const { travels, status } = this.state
    switch (status) {
      case 'loading':
      return <p>Loading...</p>       
      default:
      return (
        <div>
          <h1>{travels[0].request[0].username}</h1>
          <button onClick={() => this.handleClick(travels[0].request[0]._id)}>deny</button>
        </div>
      )
    }
  }
}

export default withAuth(NotificationsCard);