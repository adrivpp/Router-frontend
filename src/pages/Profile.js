import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import travelService from '../lib/travel-service';
import DetailCard from '../components/DetailCard';
import NotificationsCard from '../components/NotificationsCard';

class Private extends Component {

  state = {
    travelsOwned: [],
    travels: []
  }

  componentDidMount() {
    travelService.findOwned()
      .then((owned) => {        
        travelService.findTravelsBooked()
          .then((booked) =>{
            this.setState({
              travels: booked,
              travelsOwned: owned
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  renderTravelsOwned = () => {
    return this.state.travelsOwned.map((travel, index) => {
      return <DetailCard key={`id-${index}`} travel={travel}/>
    })
  }

  renderTravels =() => {
    return this.state.travels.map((travel, index) => {
      return <DetailCard key={`id-${index}`} travel={travel}/>
    })
  }

  render() {    
    const {  logout, user } = this.props;
    const { username } = user;          
      return (
        <div>
          <h2>Welcome { username }</h2>
          <p onClick={logout}>Logout</p>
          <h2>My travels</h2>
          {this.renderTravelsOwned()}
          <h2>travels im in</h2>
          {this.renderTravels()}
          <NotificationsCard/>
          <Navbar/>
        </div>
      )
    }       
  
}

export default withAuth(Private);