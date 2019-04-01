import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';
import Loader from './Loader';
import Owner from './Owner';


class NotificationsCard extends Component {

  state = {
    travelsWithNotifications: [],
    status: 'loading',
    deny: false,
    agree: false
  }

  handleDeny =(id, request) => {      
    travelService.denyRequest(id, request)
    .then(() => {      
      this.props.update()      
      .then(() => {
        this.findNotifications()    
      })
      this.setState({
        deny: true
      })
    })
    .catch(err => console.log(err))
  }

  handleAgree =(id, request) => {       
    travelService.agreeRequest(id, request)
    .then(() => {          
      this.props.update()      
      .then(() => {        
        this.findNotifications()    
      })
      this.setState({
        agree: true
      })
    })
    .catch(err => console.log(err))
  }

  findNotifications = () => {    
    travelService.findNotifications(this.props.user.notifications)
    .then((travels) => {
      this.setState({
        travelsWithNotifications: travels,
        status: 'loaded'
      })   
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {   
    this.findNotifications()
  }

  renderNotifications = () => {    
    const { travelsWithNotifications } = this.state    
    return travelsWithNotifications.map((travel, index) => {
      return (
        <div key={`id-${index}`} className="notification-card">                    
          <h2>{travel.name}</h2>
          {travel.request.map((request) => {
            return (
              <>
              <Owner id={travel.owner._id}>
                <button onClick={() => this.handleDeny( travel._id, request._id)}>deny</button>
                <button onClick={() => this.handleAgree( travel._id, request._id)}>Agree</button>
              </Owner>
              </>
            )
          })}
        </div>
      )
    })
  }
  
  render() {    
    const { status } = this.state
    switch (status) {
      case 'loading':
      return <Loader/>       
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