import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import Loader from '../components/Loader';
import NotificationsCard from '../components/NotificationsCard';
import Navbar from '../components/Navbar';

class Notifications extends Component {

  state = {
    ownedTravelsWithNotifications: [],
    requestedTravels: [],
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
          ownedTravelsWithNotifications: requestedTravels,
          requestedTravels: travelsRequested,
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
    const { status, ownedTravelsWithNotifications, requestedTravels } = this.state    
    switch (status) {
      case 'loading':
        return <Loader />
      case 'hasError':
        return <p>error</p>   
      default:        
      return (
        <>
          <section className="notifications">
            <NotificationsCard find={this.findTravels} owned={ownedTravelsWithNotifications} requested={requestedTravels}/>
          </section>       
          <Navbar/> 
        </>
      );
    }
  }
}

export default Notifications;