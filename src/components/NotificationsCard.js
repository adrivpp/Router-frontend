import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';

class NotificationsCard extends Component {

  // state = {
  //   travels: []
  // }

  componentDidMount() {   
    const arrayIds = this.props.user.notifications      
    travelService.findNotifications(arrayIds)
    .then((travels) =>{
      console.log(travels)
      })   
    .catch(err => console.log(err))
  }
  
  render() {
    return (
      <div>
        hola
      </div>
    );
  }
}

export default withAuth(NotificationsCard);