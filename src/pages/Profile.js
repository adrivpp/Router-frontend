import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import travelService from '../lib/travel-service';
import NotificationsCard from '../components/NotificationsCard';
import blankUser from '../images/blank-user.png';
import UserTravels from '../components/UserTravels';
import { withTravel } from '../providers/TravelsProvider';
import TravelDetails from './TravelDetails';
import ShowDetails from '../components/ShowDetails';

class Profile extends Component {

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
      return <UserTravels key={`id-${index}`} travel={travel}/>
    })
  }

  renderTravels =() => {
    return this.state.travels.map((travel, index) => {
      return <UserTravels key={`id-${index}`} travel={travel}/>
    })
  }

  render() {       
    const { user } = this.props;
    const { hasClick } = this.props.value;
    const { username } = user;          
      return (
        <>
          <section className="profile">
            <div className="user-banner">
              <h2>Welcome { username }</h2>
              <img src={blankUser} alt="user"/>
            </div> <hr/>          
            <h2 className="my-travels-tittle">My travels</h2>  
            <div className="owned-travels">    
              {this.renderTravelsOwned()}       
            </div>    
            <h2>travels im in</h2>
            <div className="owned-travels"> 
              {this.renderTravels()}
            </div>  
            <NotificationsCard/>
          </section>
            <ShowDetails hasClick={hasClick}>
              <TravelDetails/>
            </ShowDetails>
          <Navbar/>
        </>
      )
    }       
  
}

export default withTravel(withAuth(Profile));