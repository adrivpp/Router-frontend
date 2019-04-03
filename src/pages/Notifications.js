import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';
import { withNotifications } from '../providers/NotificationsProvider';
import Navbar from '../components/Navbar';
import Error from '../components/Error';

class Notifications extends Component {

  state = {    
    status: '',    
  } 
  
  handleDeny = (id, request) => {
    travelService.denyRequest(id, request)
    .then(() => {      
      this.props.value.find()
      this.setState({
        status:'loaded'
      })
    })
    .catch(() => {
      this.setState({
        status: 'hasError'
      })       
    })    
  }    

  handleAgree = (id, request) => {    
    travelService.agreeRequest(id, request)
    .then(() => {      
      this.props.value.find()
      this.setState({
        status:'loaded'
      })
    })
    .catch((err) => {
      this.setState({
        status: 'hasError'
      })
    })    
  }      

  handleDelete =(notification, travelId) => {   
    travelService.deletNotifications(notification, travelId)
    .then(() => {
      this.props.value.find()
      this.setState({
        status: 'loaded'
      })
    })
    .catch(() => {
      this.setState({
        status: 'hasError'
      })
    })
  }

  renderOwned = () => {
    const { owned } = this.props.value   
    return owned.map((travel) => {
      return travel.notifications.map((notification, index) => {        
        return (                    
          notification.status === 'Pending' ? 
          <div className="notifications-card" key={`id-${index}`}>
            <div className="not-img">
              <img src={travel.imageUrl} alt={travel.name}></img>
            </div>
            <div className="notification-info">
              <h2>{notification.request.username} quiere viajar contigo</h2>                             
              <div className="notification-buttons">                      
                <button className="request agree" onClick={() => this.handleAgree(travel._id, notification.request._id)}><i class="fas fa-check"></i></button>
                <button className="request deny" onClick={() => this.handleDeny(travel._id, notification.request._id)}><i class="fas fa-times"></i></button>
              </div>  
            </div>
          </div> : null          
        )
      })
    })
  }

  renderRequested = () => {
    const { requested } = this.props.value
    return requested.map((travel) => {
      return travel.notifications.map((notification, index) => {
        return (
          notification.status !== 'Pending' ? 
          <div className="notificationCard" key={`id-${index}`}>          
            <h3>{travel.owner.username} has {notification.status} your request</h3>
            <button onClick={() => this.handleDelete(notification._id, travel._id)}>Ok</button>
          </div> : null
        )
      })
    })
  }  
  
  render() {        
    const { status } = this.state  
    const { owned, requested } =this.props.value
    console.log(owned.length, requested.length)
    switch (status) {      
      case 'hasError':
      return <Error/>       
      default:
      return (       
        <>
        <section className="notifications">  
          <h2>Notifications</h2>          
          {this.renderOwned()}  
          {this.renderRequested()}             
        </section>
        <Navbar/>         
        </>                      
      )
    }
  }
}

export default withAuth(withNotifications((Notifications)));