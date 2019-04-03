import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';
import { withNotifications } from '../providers/NotificationsProvider';
import Navbar from '../components/Navbar';

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
    .catch(err => {
      console.log(err)       
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
    .catch(err => {
      console.log(err)       
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
    .catch((err) => {
      console.log(err)      
    })
  }

  renderOwned = () => {
    const { owned } = this.props.value   
    return owned.map((travel) => {
      return travel.notifications.map((notification, index) => {        
        return (                    
          notification.status === 'Pending' ? 
          <div className="notificationCard" key={`id-${index}`}>
            <h2>{notification.request.username} quiere viajar contigo</h2>            
            <p>{travel.name}</p>            
            <button onClick={() => this.handleDeny(travel._id, notification.request._id)}>deny</button>
            <button onClick={() => this.handleAgree(travel._id, notification.request._id)}>Agree</button>
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
            <h2>{travel.owner.username} has {notification.status} your request</h2>
            <button onClick={() => this.handleDelete(notification._id, travel._id)}>Ok</button>
          </div> : null
        )
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
        <>
          <section className="notifications">    
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