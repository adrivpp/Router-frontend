import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';
import Owner from './Owner';


class NotificationsCard extends Component {

  state = {    
    status: '',    
  } 
  
  handleDeny = (id, request) => {
    travelService.denyRequest(id, request)
    .then(() => {      
      this.props.find()
      this.setState({
        status:'loaded'
      })
    })
    .catch(err => {
      console.log(err) 
      this.setState({
        status: 'hasError'
      })
    })    
  }    

  handleAgree = (id, request) => {
    travelService.agreeRequest(id, request)
    .then(() => {      
      this.props.find()
      this.setState({
        status:'loaded'
      })
    })
    .catch(err => {
      console.log(err) 
      this.setState({
        status: 'hasError'
      })
    })    
  }    

  renderOwned = () => {
    
  }

  renderNotifications = () => {        
    const { travels } = this.props 
    return travels.map((travel) => {
      return travel.notifications.map((notification, index) => {         
        if(notification.status === 'Pending') {
          return (
            <div key={`id-${index}`} className="notification-card">                    
              <h2>{travel.name}</h2>                  
                <>
                <Owner id={travel.owner}>
                  <button onClick={() => this.handleDeny(travel._id, notification.request)}>deny</button>
                  <button onClick={() => this.handleAgree(travel._id, notification.request)}>Agree</button>
                </Owner>
                </>                         
            </div>
          )
        } else {
          return null
        }
    })
  })
}
  
  
  render() {    
    const { status } = this.state
    switch (status) {      
      case 'hasError':
      return <p>error</p>       
      default:
      return (
        <div>    
          {this.renderNotifications()}               
        </div>
      )
    }
  }
}

export default withAuth(NotificationsCard);