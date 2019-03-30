import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Badge from './Badge';
import NotificationsCard from './NotificationsCard';

class Navbar extends Component { 
  
  state = {
    notifications: this.props.user.notifications
  } 

  render() {    
    return (    
      <>  
        <nav className="nav-bar">
          <i className="far fa-bell"><Badge>{this.state.notifications.length}</Badge></i>
          <Link to='/travels'><i className="fas fa-search"></i></Link>
          <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
          <Link to='/profile'><i className="far fa-user"></i></Link>
          <i className="far fa-envelope-open"></i>
        </nav>
      <NotificationsCard/>
     </>
    )
  }
}

export default withAuth(Navbar);