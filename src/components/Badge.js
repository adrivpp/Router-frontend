import React from 'react';
import { withNotifications } from '../providers/NotificationsProvider';

const Badge = (props) => {       
    const { owned, requested } = props.value  
    let counter = 0;
    owned.forEach((travel) => {
      travel.notifications.forEach((notification) => {
        if (notification.status === 'Pending') {
          counter +=1
        }
      })
    })
    requested.forEach((travel) => {
      travel.notifications.forEach((notification) => {
        if (notification.status !== 'Pending') {
          counter += 1
        }
      })
    })
    return (      
      counter > 0 ? 
      <p className="badge">{counter}</p> : null
    );    
  } 

export default withNotifications(Badge);