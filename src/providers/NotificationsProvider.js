import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withRouter } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
export const NotificationContext = React.createContext();

const { Provider, Consumer }  = NotificationContext;

export const withNotifications = (Comp) => {
  return class WithNotifications extends Component {
    render() {
      return (
        <Consumer>
          { notificationStore => 
             <Comp 
              value={notificationStore}
              {...this.props} /> 
          }
        </Consumer>
      )
    }    
  }
}

class NotificationsProvider extends Component {

  state = {
    owned: [],
    requested: [],
    state: 'loading'  
  }

  findTravels =() => {        
    travelService.findOwned()
    .then((travels) => {      
      const requestedTravels = travels.filter((travel) => {
        return travel.notifications.length > 0
      })
      travelService.findNotifications()
      .then((travelsRequested) => {
        this.setState({
          owned: requestedTravels,
          requested: travelsRequested,
          status: 'loaded'
        })
      })
      .catch(() =>  {        
        this.setState({
          status: 'hasError'
        })
      })
    })
    .catch(() => {      
      this.setState({
        status: 'hasError'
      })
    })    
  }

  componentDidMount() {        
    this.findTravels()
    this.setState({
      status: 'loaded'
    })
  }     

  render() {
    const { status, owned, requested } = this.state    
    switch (status) {
      case 'loading':
        return <Loader />
      case 'hasError':
        return <Error/>
      default:        
      return (
        <Provider value={
          { owned,
            requested,
            find: this.findTravels
          }
        }>
        {this.props.children}           
        </Provider>
      );
    }
  }
}

export default withRouter(NotificationsProvider);