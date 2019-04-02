import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';
import Loader from './Loader';
import Owner from './Owner';


class NotificationsCard extends Component {

  state = {
    travelsWithNotifications: [],
    status: 'loading',    
  } 
  
  handleDeny =(id, request) => {
    travelService.denyRequest(id, request)
    .then(() => {      
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
    this.findTravels()
  }

  findTravels =() => {
    travelService.findOwned()
    .then((travels) => {
      const requestedTravels = travels.filter((travel) => {
        return travel.notifications.length > 0
      })
      this.setState({
        travelsWithNotifications: requestedTravels,
        status: 'loaded'
      })
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        status: 'hasError'
      })
    })
  }

  componentDidMount() {
    this.findTravels()
  }
  

  renderNotifications = () => {    
    const { travelsWithNotifications } = this.state    
    return travelsWithNotifications.map((travel, index) => {
      return travel.notifications.map((notification) => {  
        if (!notification.read) {
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
        }  else {
          return null 
        } 
      })
    })
  }
  
  render() {    
    const { status } = this.state
    switch (status) {
      case 'loading':
      return <Loader/>
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