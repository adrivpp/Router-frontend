import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withRouter } from 'react-router-dom';
import Loader from '../components/Loader';
export const NotificationContext = React.createContext();
// import Error from '../components/Error';

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
      .catch((err) =>  {
        console.log(err)
        this.setState({
          status: 'hasError'
        })
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
        return <p>error</p>
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