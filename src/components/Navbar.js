import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Badge from './Badge';
import NotificationsCard from './NotificationsCard';
import ShowDetails from './ShowDetails';
import travelService from '../lib/travel-service';
import Loader from './Loader';

class Navbar extends Component { 

  state = {
    hasClick: false,  
    ownedTravelsWithNotifications: [],
    requestedTravels: [],
    state: 'loading'     
  }

  handleClick =() => {    
    this.setState({
      hasClick: !this.state.hasClick
    })
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
  }   
    

  render() { 
                  
    const { logout, isLogged, status } = this.props;    
    const { ownedTravelsWithNotifications, requestedTravels } = this.state;   
    console.log(requestedTravels)
    switch (status) {
      case 'loading':
        return <Loader/>
      case 'hasError':
        return <p>error</p>    
      default:
        return (    
          <section className="nav-bar-section">  
            <nav className="nav-bar">       
              {
              isLogged ? 
              <i className="far fa-bell" onClick={this.handleClick}>
              <Badge>{ownedTravelsWithNotifications.length}</Badge></i> : null      
              } 
              <Link to='/travels'><i className="fas fa-search"></i></Link>
              <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
              <Link to='/profile'><i className="far fa-user"></i></Link>
              { isLogged ? <i onClick={logout} className="fas fa-sign-out-alt"></i> : null }
            </nav>
            <ShowDetails hasClick={this.state.hasClick}>
              {
              ownedTravelsWithNotifications.length ? 
              <div className="notifications">
                <NotificationsCard owned={ownedTravelsWithNotifications} requested={requestedTravels} find={this.findTravels}/>
              </div> : null
              }
            </ShowDetails>
        </section>
        )               
      }
    }
  }


export default withAuth(Navbar);