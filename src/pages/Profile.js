import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import travelService from '../lib/travel-service';
import { Link } from 'react-router-dom'
import blankUser from '../images/blank-user.png';
import UserTravels from '../components/UserTravels';
import { withTravel } from '../providers/TravelsProvider';
import TravelDetails from './TravelDetails';
import ShowDetails from '../components/ShowDetails';
import Error from '../components/Error';
import  Loader  from '../components/Loader';

class Profile extends Component {

  state = {
    travelsOwned: [],
    travels: [],
    status: 'loading'
  }

  componentDidMount() {    
    travelService.findOwned()
      .then((owned) => {               
        travelService.findTravelsBooked()
          .then((booked) =>{
            this.setState({
              travels: booked.sort(() => -1),
              travelsOwned: owned.sort(() => -1),
              status: 'loaded'
            })
          })
          .catch((err) => {
            this.setState({
              status: 'hasError'
            })
          })
      })
      .catch((err) => {
        this.setState({
          status: 'hasError'
        })
      })
  }

  renderTravelsOwned = () => {
    const { travelsOwned } = this.state
    if ( travelsOwned.length ) {
      return this.state.travelsOwned.map((travel, index) => {
        return <UserTravels key={`id-${index}`} travel={travel}/>
      })
    } else {
      return <Link to={'/travels/new'} className="button">Create</Link>
    }
  }

  renderTravels =() => {
    const { travels } = this.state
    if(travels.length) {
      return this.state.travels.map((travel, index) => {
        return <UserTravels key={`id-${index}`} travel={travel}/>
      })
    } else {
      return <Link to={'/travels'} className="button">Search</Link>
    }
  }

  render() {       
    const { status } = this.state;
    const { user } = this.props;
    const { hasClick } = this.props.value;
    const { username } = user;   
    switch (status) {
      case 'loading':
        return <Loader/>          
      case 'hasError':
        return <Error/>
      default:
        return (
          <>
            <section className="profile">
              <div className="user-banner">
                <h2>Welcome { username }</h2>
                <img src={ blankUser } alt="user"/>
              </div> <hr/>          
                <h2 className="my-travels-tittle">My travels</h2>  
              <div className="owned-travels">    
                {this.renderTravelsOwned()}       
              </div>    
              <h2 className="my-travels-tittle">Travels I'm in</h2>
              <div className="owned-travels"> 
                {this.renderTravels()}
              </div>              
            </section>
              <ShowDetails hasClick={hasClick}>
                <TravelDetails/>
              </ShowDetails>
            <Navbar/>
          </>
        )              
      }       
    }       
  
}

export default withTravel(withAuth(Profile));