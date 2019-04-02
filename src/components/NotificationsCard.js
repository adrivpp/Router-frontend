import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import travelService from '../lib/travel-service';

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
    console.log(id)
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

  handleDelete =(notification, travelId) => {   
    travelService.deletNotifications(notification, travelId)
    .then(() => {
      this.props.find()
      this.setState({
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

  renderOwned = () => {
    const { owned } = this.props    
    return owned.map((travel) => {
      return travel.notifications.map((notification, index) => {        
        return (                    
          notification.status === 'Pending' ? 
          <div className="notificationCard">
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
    const { requested } = this.props
    return requested.map((travel) => {
      return travel.notifications.map((notification) => {
        return (
          notification.status !== 'Pending' ? 
          <div className="notificationCard">
            <h2>{travel.owner.username} has {notification.status} your request</h2>
            <button onClick={() => this.handleDelete(notification._id, travel._id)}>Ok</button>
          </div> : null
        )
      })
    })
  }

//   renderNotifications = () => {        
//     const { owned } = this.props 
//     return owned.map((travel) => {
//       return owned.notifications.map((notification, index) => {         
//         if(notification.status === 'Pending') {
//           return (
//             <div key={`id-${index}`} className="notification-card">                    
//               <h2>{owned.name}</h2>                  
//                 <>
//                 <Owner id={owned.owner}>
//                   <button onClick={() => this.handleDeny(owned._id, notification.request)}>deny</button>
//                   <button onClick={() => this.handleAgree(owned._id, notification.request)}>Agree</button>
//                 </Owner>
//                 </>                         
//             </div>
//           )
//         } else {
//           return null
//         }
//     })
//   })
// }
  
  
  render() {        
    const { status } = this.state
    switch (status) {      
      case 'hasError':
      return <p>error</p>       
      default:
      return (
        <div>    
          {this.renderOwned()}  
          {this.renderRequested()}             
        </div>
      )
    }
  }
}

export default withAuth(NotificationsCard);